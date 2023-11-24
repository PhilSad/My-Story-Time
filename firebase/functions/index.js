// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const functions = require("firebase-functions");

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
