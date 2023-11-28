/* eslint-disable @typescript-eslint/no-explicit-any */
import { flow, types } from "mobx-state-tree";
import { StoryModel } from '@/app/modules/models/story.model';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { db, storage } from '@/app/config/firebase.config';
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UserModel } from '@/app/modules/models/user.model';

export const UserStore = types
  .model("User", {
    user: UserModel
  })
  .actions((self) => ({
    getUserImages: flow(function* (userId: string) {
      try {
        const docRef = doc(db, "Users", userId);

        const querySnapshot = yield getDocs(collection(docRef, "UserImages"));
        self.user.userImages = querySnapshot.docs.map((doc: any) => doc.data().urlImage);

      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }),
    
  })).actions((self) => ({
    setUserImages: flow(function* (downloadURL: string, userId: string) {
      try {
        const docRef = doc(db, "Users", userId);
        const writeResult = yield addDoc(collection(docRef, "UserImages"), {
          urlImage: downloadURL,
        });
        self.getUserImages(userId);
        return writeResult.id;
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    })
  }));

export const userStore = UserStore.create({
  user: {
    userId: '',
    userImages: [],
  }
});

