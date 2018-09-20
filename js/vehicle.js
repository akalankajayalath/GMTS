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

//vehicle assignment page

//adding data to dropdowns
//depot values
  var rootref1 = firebase.database().ref().child("Depot");

  rootref1.on("child_added",snap =>{
    
    var depot = snap.child("name").val();
   

    $("#depot").append('<option>'+depot+'</option>');
  });
//vehicle values
  var rootref2 = firebase.database().ref().child("Vehicles");

  rootref2.on( "child_added",snap =>{

    var vehicle = snap.child("number").val();
    $("#vehicle").append('<option>'+vehicle+'</option>');
  });
//driver values
  var rootref3 = firebase.database().ref().child("users").child("driver");

  rootref3.on("child_added",snap =>{
    
    var driver = snap.child("fname").val();
   
   

    $("#driver").append('<option>'+driver+'</option>');
  });
//helper values
  var rootref4 = firebase.database().ref().child("users").child("worker");

  rootref4.on("child_added",snap =>{
    
    var helper = snap.child("fname").val();
    
   

$("#helper1").append('<option>'+helper+'</option>');
$("#helper2").append('<option>'+helper+'</option>');
$("#helper3").append('<option>'+helper+'</option>');
  });

//Route values
var rootref5 = firebase.database().ref().child("Route");

  rootref5.on("child_added",snap =>{
    
    var route = snap.child("name").val();

$("#route").append('<option>'+route+'</option>');

  });
//add selected value to the textboxes

var mytextbox1 = document.getElementById("txtDriver");
var mytextbox2 = document.getElementById("txthelper1");
var mytextbox3 = document.getElementById("txthelper2");
var mytextbox4 = document.getElementById("txthelper3");

var mysumbox1 = document.getElementById("sumvehicle");
var mysumbox2 = document.getElementById("sumdepot");
var mysumbox7 = document.getElementById("sumroute");
var mysumbox3 = document.getElementById("sumdriver");
var mysumbox4 = document.getElementById("sumhelper1");
var mysumbox5 = document.getElementById("sumhelper2");
var mysumbox6 = document.getElementById("sumhelper3");

var mydropdown1 = document.getElementById('driver');
var mydropdown2 = document.getElementById('helper1');
var mydropdown3 = document.getElementById('helper2');
var mydropdown4 = document.getElementById('helper3');
var mydropdown5 = document.getElementById('vehicle');
var mydropdown6 = document.getElementById('depot');
var mydropdown7 = document.getElementById('route');

mydropdown1.onchange = function(){
  mytextbox1.value =  this.value;
  mysumbox3.value = this.value;
}
mydropdown2.onchange = function(){
  mytextbox2.value =  this.value;
  mysumbox4.value = this.value;
}
mydropdown3.onchange = function(){
  mytextbox3.value =  this.value;
  mysumbox5.value = this.value;
}
mydropdown4.onchange = function(){
  mytextbox4.value =  this.value;
  mysumbox6.value = this.value;
}

//add selected value to summary box

mydropdown5.onchange = function(){
  mysumbox1.value =  this.value;
}
mydropdown6.onchange = function(){
  mysumbox2.value =  this.value;
}
mydropdown7.onchange = function(){
  mysumbox7.value =  this.value;
}

//submitting form

function submitSummaryForm(){

  var vehicleNum = document.getElementById("sumvehicle").value;
  var depot = document.getElementById("sumdepot").value;
  var route = document.getElementById("sumroute").value;
  var driver = document.getElementById("sumdriver").value;
  var helperOne = document.getElementById("sumhelper1").value;
  var helperTwo = document.getElementById("sumhelper2").value;
  var helperThree = document.getElementById("sumhelper3").value; 
  var d = new Date();
  var time = d.toLocaleTimeString();
  var date = d.toLocaleDateString();
  


  const usersRef = firebase.database().ref().child('Assignments');
  usersRef.push({

      "vehicleNum" : vehicleNum,
      "Depot" : depot,
      "Route" : route,
      "Driver" : driver,
      "HelperOne" : helperOne,
      "HelperTwo" : helperTwo,
      "HelperThree" : helperThree,
      "SysTime" : time,
      "SysDate" : date
    
  });

  alert("Vehicle Assigned Successfully..!!!");
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function saveVehicleForm(){
  var vname = document.getElementById("vname").value;
  var vtype = document.getElementById("vtype").value;
  var vdepot = document.getElementById("vdepot").value;

  const vehicleRef = firebase.database().ref().child('Vehicles');

  vehicleRef.push({
    "number" : vname,
    "type" : vtype,
    "depot" : vdepot 
  });

alert("New Vehicle Added..!!");
}

function saveDepotForm(){
  var dname = document.getElementById("dname").value;
  var dphn = document.getElementById("dphn").value;

  const DepotRef = firebase.database().ref().child('Depot');

  DepotRef.push({
    "name" : dname,
    "phone" : dphn
  });

alert("New Depot Added..!!");
}

function saveRouteForm(){
  var rname = document.getElementById("rname").value;
  var rarea = document.getElementById("rarea").value;

  const RouteRef = firebase.database().ref().child('Route');

  RouteRef.push({
    "name" : rname,
    "phone" : rarea
  });

alert("New Route Added..!!");
}

var table = document.querySelector('#table1 tbody');

function refreshData()
{
	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
	dbRefObject = firebase.database().ref().child('Assignments');
	dbRefObject.on('value', snap => {
		data = snap.val();
		for(var r in data) {
      var row = table.insertRow(-1);
      var btn = document.createElement('input');
      btn.type = "button";
      btn.className = "btndelete";
      btn.onclick = (function() {})();
      row.appendChild(btn);
			for(var c in data[r]) {
				cell = row.insertCell(-1);
				cell.innerHTML = data[r][c];
			}
		}
	});
}

//search function

$(document).ready(function(){
  $("#vehicleInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

