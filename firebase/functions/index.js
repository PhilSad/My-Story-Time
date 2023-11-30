// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const functions = require("firebase-functions");
const express = require("express");
const app = express();
// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
app.get("/", (req, res) => {
  res.send("This is a function");
});

exports.app = functions.https.onRequest(app);
exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName } = user;
  await getFirestore()
    .collection("Users")
    .doc(uid)
    .set({
      uid,
      email,
      displayName,
    });
});

// http function that takes a user id and story id, copy the story to the public shared stories collection and return the id of the new document
exports.shareStory = functions.https.onRequest(async (req, res) => {
  const { userId, storyId } = req.query;
  const db = getFirestore();
  const storyRef = db.collection("Users").doc(userId).collection("Stories").doc(storyId);
  const story = await storyRef.get();
  if (!story.exists) {
    res.status(404).send("Story not found");
    return;
  }
  const newStory = story.data();
  const newStoryRef = await db.collection("SharedStories").add(newStory);
  return { sharedStoryId: newStoryRef.id };
});