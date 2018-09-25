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
/* report printing in PDF */

function demoFromHTML() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#AssignmentSummary')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins);
}
