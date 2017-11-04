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

  //send data to database with .on("click")
  $("#submit").on("click", function(event) {
    event.preventDefault();
    // $("#tableData").empty();

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
  // database.ref().on("value", function(snapshot) {
  //   console.log(snapshot.val());

//append database data to table display
//are we wanting to keep added trains in the table?  on that note, who is "administrator" from assignment criteria?
  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    var trainTime = snapshot.val().firstTrain;
    var frequency = parseInt(snapshot.val().frequency);

    var table = document.getElementById("tableData");
    var row = table.insertRow(0);

    var trainCell = row.insertCell(0);
    var destCell = row.insertCell(1);
    var freqCell = row.insertCell(2);
    var nextCell = row.insertCell(3);
    var etaCell = row.insertCell(4);

    var convertedTime = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(convertedTime, "This is our convertedTime");


    // var nextTrain = moment(firstTrain, "hh:mm").add(frequency, "minutes");
    // console.log(nextTrain);
      // var now = moment();
      // console.log("Current Time: " +(moment(now).format("HH:mm")));

    //what is the difference between now and the next train?
      var diffTime = moment().diff(moment(convertedTime), "minutes");
      console.log("Time Difference: " + diffTime);

      var remainder = diffTime % frequency;
      console.log(remainder, "this is our remainder");

    // get the eta by comparing the current time to the next arrival time and counting down by minutes
      var eta = frequency - remainder;
      console.log("ETA: " + eta);
      var x;
      var nextArrival = moment().add(eta, "minutes");
      console.log("Arrival Time: " + moment(nextArrival).format("hh:mm"));
      var nextTrain = moment(nextArrival).format("HH:mm")

      function boarding() {
        etaCell.innerHTML = "Boarding Now";
      }
      function trainCount() {
        var minutes = eta--
           // Display the result in the etaCell
        etaCell.innerHTML = minutes;
          // If the count down is finished, write some text
        if (eta == 0) {
          clearInterval(x);
          startCountdown();
          boarding();
        }
      }
      // Update the count down every minute
      function startCountdown(){
        convertedTime = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(convertedTime, "This is our convertedTime");

        diffTime = moment().diff(moment(convertedTime), "minutes");

        remainder = diffTime % frequency;
        console.log(remainder, "this is our remainder");
        eta = frequency - remainder;
        nextArrival = moment().add(eta, "minutes");
        nextTrain = moment(nextArrival).format("HH:mm");
        nextCell.innerHTML = (nextTrain);
        etaCell.innerHTML = (eta);
        x = setInterval(trainCount, 60000);
      }
      startCountdown();

    trainCell.innerHTML = (snapshot.val().trainName);
    destCell.innerHTML = (snapshot.val().destination);
    freqCell.innerHTML = (snapshot.val().frequency);
    nextCell.innerHTML = (nextTrain);
    etaCell.innerHTML = (eta);
  })