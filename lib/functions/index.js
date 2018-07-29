'use strict'

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = dialogflow({debug: true});

app.middleware(conv => {

});

const Contexts = {
    GET_TWEETS: 'get_tweets'
};

app.intent('quit_app', conv => {
    console.log('See you later.');
    conv.close('See you later.');
});

app.intent('start_app', conv => {
    console.log(`Hey, I'm liri-bot. I can help you find info on music and movies`); 
});

app.intent('get_tweets', conv => {
    console.log(`Here are your last 20 tweets`);
    // return getTweets;
});

exports.liriBot = functions.https.onRequest(app);