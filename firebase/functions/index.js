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
      .doc(uid)
      .set({
        uid,
        email,
        displayName,
      });
});

exports.createNewStroy = onCall(async (request) => {
  const uidUser = request.auth.uid;
  const {prompt, urlImage, heroName, language} = request.data;

  const writeResult = await getFirestore()
      .collection("Users")
      .doc(uidUser)
      .collection("Stories")
      .add({
        story_idea: prompt,
        urlImage: urlImage,
        hero_name: heroName,
        language: language,
      });

  console.log(`Document written with ID: ${writeResult.id} added.`);
});
