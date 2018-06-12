 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAntw6caDUi5fd_TNT4UzurY0OTFEWfjec",
    authDomain: "cmcproject-123.firebaseapp.com",
    databaseURL: "https://cmcproject-123.firebaseio.com",
    projectId: "cmcproject-123",
    storageBucket: "",
    messagingSenderId: "740713841242"
  };
  if (!firebase.apps.length) {
  firebase.initializeApp(config);
  }
  //vehicle values
  var rootref1 = firebase.database().ref().child("Vehicles");
  var rootref2 = firebase.database().ref().child("Assignments");
  const rootref3 = firebase.database().ref().child("Returns");


  rootref1.on("child_added",snap =>{
    var number = snap.child("number").val();
    $("#vehicle").append('<option>'+number+'</option>');
  });

  function setData(){
      var dropdown = document.getElementById("vehicle").value;
    
    rootref2.orderByChild('vehicleNum').equalTo(dropdown.toString()).on("value", function(snapshot) { 
    snapshot.forEach(function(data) {
      document.getElementById("Assroute").value=data.val().Route;
      document.getElementById("Drivername").value=data.val().Driver;
      document.getElementById("Helperone").value=data.val().HelperOne;
      document.getElementById("Helpertwo").value=data.val().HelperTwo;
      document.getElementById("Helperthree").value=data.val().HelperThree;
      document.getElementById("Drivertime").value=data.val().SysTime;
      document.getElementById("Helperonetime").value=data.val().SysTime;
      document.getElementById("Helpertwotime").value=data.val().SysTime;
      document.getElementById("Helperthreetime").value=data.val().SysTime;
})
})
  }

function showSysTime(){
  var d = new Date();
  var time = d.toLocaleTimeString();
  
  document.getElementById("Driverendtime").value=time;
  document.getElementById("Helperoneendtime").value=time;
  document.getElementById("Helpertwoendtime").value=time;
  document.getElementById("Helperthreeendtime").value=time;
}




function saveData(){
  vNum = document.getElementById("vehicle").value;
  asRoute=document.getElementById("Assroute").value;
  dName=document.getElementById("Drivername").value;
  hOneName=document.getElementById("Helperone").value;
  hTwoName=document.getElementById("Helpertwo").value;
  hThreeName=document.getElementById("Helperthree").value;
  dTime=document.getElementById("Drivertime").value;
  hOneTime=document.getElementById("Helperonetime").value;
  hTwoTime=document.getElementById("Helpertwotime").value;
  hThreeTime=document.getElementById("Helperthreetime").value;
  dEndTime=document.getElementById("Driverendtime").value;
  hOneEndTime=document.getElementById("Helperoneendtime").value;
  hTwoEndTime=document.getElementById("Helpertwoendtime").value;
  hThreeEndTime=document.getElementById("Helperthreeendtime").value;
  var objectKey;
  
  rootref2.orderByChild('vehicleNum').equalTo(vNum).on("value",function(snapshot){
    snapshot.forEach(function(data) {
      objectKey = data.key;
    })
  });

  rootref3.push({
    "AssignmentKey" : objectKey,
    "VehicleNum" : vNum,
    "DriverName" : dName ,
    "HelperOneName" : hOneName ,
    "HelperTwoName" : hTwoName ,
    "HelperThreeName" : hThreeName ,
    "DriverStartTime" : dTime ,
    "HelperOneStartTime" : hOneTime ,
    "HelperTwoStartTime" : hTwoTime ,
    "HelperThreeStartTime" : hThreeTime ,
    "DriverTime" : dEndTime ,
    "HelperOneTime" : hOneEndTime ,
    "HelperTwoTime" : hTwoEndTime ,
    "HelperThreeTime" : hThreeEndTime 
  });

  alert("Return Time Saved Successfully...!!!");
}



var table = document.querySelector('#table1 tbody');

function refreshData()
{
	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
	
  
  rootref3.once('value', function(snapshot){
      if(snapshot.exists()){
          var content = '';
          snapshot.forEach(function(data){
              var val = data.val();
              content +='<tr>';
              content += '<td>' + val.DriverName + '</td>';
              content += '<td>' + val.DriverStartTime + '</td>';
              content += '<td>' + val.DriverTime + '</td>';
              content += '<td>' + val.HelperOneName + '</td>';
              content += '<td>' + val.HelperOneStartTime + '</td>';
              content += '<td>' + val.HelperOneTime + '</td>';
              content += '<td>' + val.HelperTwoName + '</td>';
              content += '<td>' + val.HelperTwoStartTime + '</td>';
              content += '<td>' + val.HelperTwoTime + '</td>';
              content += '<td>' + val.HelperThreeName + '</td>';
              content += '<td>' + val.HelperThreeStartTime + '</td>';
              content += '<td>' + val.HelperThreeTime + '</td>';
              content += '<td>' + val.VehicleNum + '</td>';
              content += '</tr>';
          });
          $('#table1').append(content);
      }
  });
}

$(document).ready(function(){
  $("#vehicleInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
