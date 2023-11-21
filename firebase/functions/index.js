// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const functions = require("firebase-functions");
const {onCall} = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const {uid, email, displayName} = user;
  await getFirestore()
      .collection("Users")
      .add({
        uid,
        email,
        displayName,
      });
});

exports.createNewStroy = onCall(async (request) => {
  const uidUser = request.auth.uid;
  const prompt = request.data.prompt;
  const urlImage = request.data.urlImage || null;

  const writeResult = await getFirestore()
      .collection("Users")
      .doc(uidUser)
      .collection("Stories")
      .add({
        prompt: prompt,
        urlImage: urlImage,
      });

  console.log(`Document written with ID: ${writeResult.id} added.`);
});
