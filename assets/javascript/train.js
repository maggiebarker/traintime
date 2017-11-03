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


//establish nextCell data by doing some math. with jQuery.  firstTrain time + frequency gives us the 2nd train arrival.  
//so if a train starts at 6 and the frequency is 20mins, then the second train will come at 6:20.  we need a formula
//should this be moment(snapshot.val().firsttrain, "hh:mm")?
//should all this be global?
//do we need to look at how frequency is formatted?  

//establish the current time, will be necessary for determining eta
  var now = moment();
  console.log("Current Time: " +(moment(now).format("hh:mm")));

//figure out when the next train will be.  
//how do we make this go all day?  nextTrain = firstTrain + frequency 
//then the train after that would be nextNextTrain = nextTrain + frequency, right?  
//if it's much later in the day, if we take (now - firstTrain)/frequency, we get how many trains there have been all day

var convertedTime = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(convertedTime);


var nextTrain = moment(firstTrain, "hh:mm").add(frequency, "minutes"); 
console.log(nextTrain);

//what is the difference between now and the next train?
  var diffTime = moment().diff(moment(convertedTime), "minutes");
  console.log("Time Difference: " + diffTime);

  var remainder = diffTime % frequency;
  console.log(remainder);

// get the eta by comparing the current time to the next arrival time and counting down by minutes
  var eta = frequency - remainder;
  console.log("ETA: " + eta)

var nextArrival = moment().add(eta, "minutes");
console.log("Arrival Time: " + moment(nextArrival).format("hh:mm"));

//add the next and eta to the table by setting nextCell and etaCell = to next and eta


//build a timer into the etaCell that decrements by the minute

//this is reading nextArrival as now, not what I want
console.log(moment(nextArrival).toNow());  


//Below is an adaptation of a vanilla js/jquery timer that I wrote for another project. This assignment needs moment.js.  
// var countDown = moment(nextArrival, "mm");
//       // Update the count down every minute
// var x = setInterval(function() {
//       // Get todays date and time (like above)
// var now = moment();
//       // Find the distance between now and the count down time
// var distance = countDown - now;
//      // Time calculations for minutes
// var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//      // Display the result in the etaCell
//   etaCell.innerHTML(minutes);
//     // If the count down is finished, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     etaCell.innerHTML("Boarding Now");


  })
},
 );
