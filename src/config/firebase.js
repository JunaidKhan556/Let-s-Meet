import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKnr3xAMlGxZlHQhDfl_BfGdYozaZCRvs",
    authDomain: "asgn9-f64c9.firebaseapp.com",
    databaseURL: "https://asgn9-f64c9.firebaseio.com",
    projectId: "asgn9-f64c9",
    storageBucket: "asgn9-f64c9.appspot.com",
    messagingSenderId: "363499022376"
  };
  firebase.initializeApp(config);

  export default firebase;
