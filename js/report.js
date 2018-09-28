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

function showDiv(element){
    if(element.value == 0){
        var table = document.querySelector('#table0 tbody');
        document.getElementById("AssignmentSummary").style.display = "block";
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        const dbRefObjectAssignment = firebase.database().ref().child('Assignments');
        dbRefObjectAssignment.on('value', snap => {
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
          $("#AssignmentInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table0 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
    else if(element.value == 1){
        var table = document.querySelector('#table1 tbody');
        document.getElementById("FullWorkers").style.display = "block";
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        const dbRefObjectWorker = firebase.database().ref().child('/users/driver/');
        dbRefObjectWorker.on('value', snap => {
            data = snap.val();
            console.log(data);
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
          $("#FullWorkersInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table1 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
    else if(element.value == 2){
        document.getElementById("Schedules").style.display = "block";
        var table = document.querySelector('#table2 tbody');
        
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        const dbRefObjectSchedules = firebase.database().ref().child('/Schedule/District1/Kotahena West/');
        dbRefObjectSchedules.on('value', snap => {
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
          $("#SchedulesInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table2 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
    else if(element.value == 3){
        document.getElementById("fullVehicles").style.display = "block";
        
        var table = document.querySelector('#table3 tbody');
        
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        const dbRefObjectVehicles = firebase.database().ref().child('Vehicles');
        dbRefObjectVehicles.on('value', snap => {
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
            $("#table3 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
    else if(element.value == 4){
        document.getElementById("Returns").style.display = "block";
        
        var table = document.querySelector('#table4 tbody');
        
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        const dbRefObjectReturns = firebase.database().ref().child('Returns');
        dbRefObjectReturns.once('value', function(snapshot){
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
                $('#table4').append(content);
            }
        });
        $(document).ready(function(){
          $("#ReturnsInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#table4 tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
        });
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/* report printing in PDF */

function AssignmentFromHTML() {
    var mywindow = window.open("");

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >'); 
    mywindow.document.write('<h1>'+"Daily Assignment Report"+'</h1>');
    mywindow.document.write(document.getElementById('divAssignment').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

function FullWorkersFromHTML() {
    var mywindow = window.open("");

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >'); 
    mywindow.document.write('<h1>'+"Drivers Details"+'</h1>');
    mywindow.document.write(document.getElementById('divWorker').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

function fullVehiclesFromHTML() {
    var mywindow = window.open("");

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >'); 
    mywindow.document.write('<h1>'+"Vehicles Details"+'</h1>');
    mywindow.document.write(document.getElementById('divVehicle').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

function ReturnsFromHTML() {   
    var mywindow = window.open("");

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >'); 
    mywindow.document.write('<h1>'+"Vehicle Returns Report"+'</h1>');
    mywindow.document.write(document.getElementById('divToPrint').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}
