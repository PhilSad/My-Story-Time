/* eslint-disable @typescript-eslint/no-explicit-any */
import { flow, types } from "mobx-state-tree";
import { StoryModel } from '@/app/modules/models/story.model';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { db, storage } from '@/app/config/firebase.config';
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { create } from "mobx-persist";

export const StoryStore = types
  .model("Story", {
    story: StoryModel,
    stories: types.maybe(types.array(StoryModel)),
    unsubscribe: types.optional(types.frozen(), undefined),
    
  })
  .actions((self) => ({
    stopListening() {
      if (self.unsubscribe) {
        self.unsubscribe();
      }
    },
    getStoryById: flow(function* (id: string, uidUser: string) {
      const docRef = doc(db, "Users", uidUser, "Stories", id);
      const docSnap = yield getDoc(docRef);
      if (docSnap.exists()) {
        const newStory = {
          ...self.story,
          heroName: docSnap.data().hero_name,
          language: docSnap.data().language,
          prompt: docSnap.data().story_idea,
          story: docSnap.data().story,
        }

        self.story = newStory;
        console.log("self.story", self.story);
      } else {
        // docSnap.data() sera undefined dans ce cas
        console.log("No such document!");
      }
    }),
    updateStory: flow(function* (data: any) {
      const newStory = {
        ...self.story,
        heroName: data.hero_name,
        language: data.language,
        prompt: data.story_idea,
        story: data.story,
        status: data.status,
      }
      self.story = newStory;
    }),
    setPromptStory(prompt: string) {
      const newStory = {
        ...self.story,
        prompt
      }
      self.story = newStory;
    },
    setUrlImageStory(urlImage: string) {
      const newStory = {
        ...self.story,
        urlImage
      }
      self.story = newStory;
    },
    uploadProfilImage: flow(function* (file: any, userId: string) {
      //Send to storage

      const storageRef = ref(storage, `images/${userId}/userImages/${file.name}`);
      const result = yield uploadBytes(storageRef, file).then((snapshot) => {
        return snapshot;
      });
      //Get DownloadUrl
      const downloadURL = yield getDownloadURL(result.ref);
      return downloadURL;
      
    }),
    createNewStory: flow(function* () {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const uidUser = user.uid;
          const docRef = doc(db, "Users", uidUser);
          const writeResult = yield addDoc(collection(docRef, "Stories"), {
            story_idea: self.story.prompt,
            urlImage: self.story.urlImage,
            hero_name: self.story.heroName,
            language: self.story.language,
          });
          self.story.storyId = writeResult.id;
          return writeResult.id;
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    })

  })).actions((self) => ({
    startListening(uidUser: string) {
      if (storyStore.story.storyId !== "") {
        const storyId = storyStore.story.storyId;
        const docRef = doc(db, "Users", uidUser, "Stories", storyId);

        onSnapshot(docRef, (doc) => {
          if (doc.exists() && doc.data().status == "done") {
            console.log("Current data: ", doc.data());
            self.updateStory(doc.data());
          } else {
            console.log("No such document!");
          }
        });

      } else {
        console.log("No Id!");
        return;
      }

    },

  }));

export const storyStore = StoryStore.create({
  story: {
    storyId: '',
    prompt: '',
    urlImage: '',
    heroName: 'Emilie',
    language: 'en',
    story: [],
    status: ''
  },
  stories: []
});

let hydrate;

if (typeof window !== 'undefined') {
  hydrate = create({
    storage: localStorage,
    jsonify: false, // Laisser le JSON.stringify à l'utilisateur
  });
}

// Indiquer quelles parties du store vous souhaitez persister
if (hydrate) {
  hydrate("StoryStore", storyStore)
    .then(() => {
      // Après la persistance, faire d'autres choses si nécessaire
    })
    .catch((error) => {
      console.error("Error hydrating store:", error);
    });
}
