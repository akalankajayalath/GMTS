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
        document.getElementById("AssignmentSummary").style.display = "block";
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        const dbRefObject = firebase.database().ref().child('Assignments');
        dbRefObject.on('value', snap => {
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
        document.getElementById("FullWorkers").style.display = "block";
    }
    else if(element.value == 2){
        document.getElementById("Schedules").style.display = "block";
    }
    else if(element.value == 3){
        document.getElementById("fullVehicles").style.display = "block";
    }
    else if(element.value == 4){
        document.getElementById("Returns").style.display = "block";
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var table = document.querySelector('#table0 tbody');

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
  $("#AssignmentInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});