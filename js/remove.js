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

  function ShowDiv(element){
    if(element.value == 0){
        var table = document.querySelector('#table0 tbody');
        document.getElementById("showDetails0").style.display = "block";
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
    
    const dbRefObjectRoute = firebase.database().ref().child('Route');
            dbRefObjectRoute.on('value', snap => {
            data = snap.val();
            for(var r in data) {
          var row = table.insertRow(-1);   
                for(var c in data[r]) {
                    cell = row.insertCell(-1);
                    cell.innerHTML = data[r][c];
                }
            }
        });
        //search function
        $(document).ready(function(){
          $("#routeInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table0 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
    else if(element.value == 1){
        var table = document.querySelector('#table2 tbody');
        document.getElementById("showDetails2").style.display = "block";
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
    
    const dbRefObjectRoute = firebase.database().ref().child('Vehicles');
            dbRefObjectRoute.on('value', snap => {
            data = snap.val();
            for(var r in data) {
          var row = table.insertRow(-1);   
                for(var c in data[r]) {
                    cell = row.insertCell(-1);
                    cell.innerHTML = data[r][c];
                }
            }
        });
        //search function
        $(document).ready(function(){
          $("#vehicleInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table2 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
    else if(element.value == 2){
        var table = document.querySelector('#table1 tbody');
        document.getElementById("showDetails1").style.display = "block";
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
    
    const dbRefObjectRoute = firebase.database().ref().child('Depot');
            dbRefObjectRoute.on('value', snap => {
            data = snap.val();
            for(var r in data) {
          var row = table.insertRow(-1);   
                for(var c in data[r]) {
                    cell = row.insertCell(-1);
                    cell.innerHTML = data[r][c];
                }
            }
        });
        //search function
        $(document).ready(function(){
          $("#depotInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table1 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
  }
  