import db from "../config/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export default async function createNewStroy(data) {
  const functions = getFunctions();
  const createNewStroy = httpsCallable(functions, 'createNewStroy');
  createNewStroy({ prompt: "Un pirate qui a perdu son peroquet", urlImage: null });
}

// export default async function updateData(collectionName, data) {
//   try {
//     const docRef = await updateDoc(collection(db, collectionName), data);
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
//   return { result, error };
// }

// const uid = resp.user.uid;
// const userRef = addDoc(db, 'Users', uid);
// await updateDoc(userRef, {
//   newsletter: newsletterChecked
// });
