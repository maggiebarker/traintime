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

  //set up some global variables
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;
  
  //var nextArrival = "";
  //var eta = "";

  //send data to database with .on("click")

  $("#submit").on("click", function() {
    event.preventDefault();
    $("#tableData").empty();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
    });
  })

  //view database data in browser

  database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
  })

  //append database data to table display  
  //are we wanting to keep added trains in the table?  on that note, who is "administrator" from assignment criteria?

  database.ref().on("child_added", function(snapshot){

    var table = document.getElementById("tableData");
    var row = table.insertRow(0);

    var trainCell = row.insertCell(0);
    var destCell = row.insertCell(1);
    var freqCell = row.insertCell(2);
    var nextCell = row.insertCell(3);
    var etaCell = row.insertCell(4);

    trainCell.innerHTML = (snapshot.val().trainName); 
    destCell.innerHTML = (snapshot.val().destination); 
    freqCell.innerHTML = (snapshot.val().frequency); 
    nextCell.innerHTML = ("Next Train"); 
    etaCell.innerHTML = ("ETA"); 
  })

//establish nextArrival by doing some math. with jQuery.  firstTrain time + frequency gives us the 2nd train arrival.  
//so if a train starts at 6 and the frequency is 20mins, then the second train will come at 6:20.  we need a formula
//should this be moment(snapshot.val().firsttrain, "hh:mm")?
   var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
   console.log(firstTrainConverted);

//establish the current time, will be necessary for determining eta
  var now = moment();
  console.log("Current Time: " +(moment(now).format("hh:mm")));

//what is the difference between now and the next train?
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("Time Difference: " + diffTime);

  var remainder = diffTime % frequency;
  console.log(remainder);

// get the eta by comparing the current time to the next arrival time and counting down by minutes

  var eta = frequency - remainder;
  console.log("ETA: " + eta)

var next = moment().add(eta, "minutes");
console.log("Arrival Time: " + moment(next).format("hh:mm"));

//add the next and eta to the table by setting nextCell and etaCell = to next and eta

