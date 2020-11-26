import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCaLqpl-6HU0gn3i-q9NqodfVqmU_tOhk0",
    authDomain: "gift-picker-app-1b88e.firebaseapp.com",
    databaseURL: "https://gift-picker-app-1b88e.firebaseio.com",
    projectId: "gift-picker-app-1b88e",
    storageBucket: "gift-picker-app-1b88e.appspot.com",
    messagingSenderId: "941913951573",
    appId: "1:941913951573:web:aff491993e718ad1aff3dc"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;

  // Followed this guide to add Firebase to React app: https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364
  // Link to Firebase project page: https://console.firebase.google.com/u/0/project/gift-picker-app-1b88e/overview