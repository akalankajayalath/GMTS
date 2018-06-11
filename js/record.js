 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAntw6caDUi5fd_TNT4UzurY0OTFEWfjec",
    authDomain: "cmcproject-123.firebaseapp.com",
    databaseURL: "https://cmcproject-123.firebaseio.com",
    projectId: "cmcproject-123",
    storageBucket: "",
    messagingSenderId: "740713841242"
  };
  firebase.initializeApp(config);

  //vehicle values
  var rootref1 = firebase.database().ref().child("Vehicles");
  var rootref2 = firebase.database().ref().child("Assignments");


  rootref1.on("child_added",snap =>{
    var number = snap.child("number").val();
    $("#vehicle").append('<option>'+number+'</option>');
  });

  function setData(){
      var dropdown = document.getElementById("vehicle").value;
     // var vehicleRef = firebase.database().ref().child("Assignments");
      
      rootref2.orderByChild('vehicleNum').equalTo(dropdown.toString()).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
      
   //alert(data);
})
})
  }