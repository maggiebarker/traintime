//Initialize firebase
  var config = {
    apiKey: "AIzaSyAN1hURw7UYWY0wCucJM8gjHKpMoeG6NFQ",
    authDomain: "traintime-e14f7.firebaseapp.com",
    databaseURL: "https://traintime-e14f7.firebaseio.com",
    projectId: "traintime-e14f7",
    storageBucket: "",
    messagingSenderId: "360980975407"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //dynamically populate table data from arrays

  //add data to arrays with .on('click') events

  //store new data in firebase? how exactly does firebase figure into this assignment?  
  //are we wanting to keep added trains in the table?  on that note, who is "administrator" from assignment criteria?

  //establish arrival-time countdown for each train based on frequency updating every minute, 
  //restart count when time is reached?  using moment.js for this?  

  //