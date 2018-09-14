var config = {
    apiKey: "AIzaSyAntw6caDUi5fd_TNT4UzurY0OTFEWfjec",
    authDomain: "cmcproject-123.firebaseapp.com",
    databaseURL: "https://cmcproject-123.firebaseio.com",
    projectId: "cmcproject-123",
    storageBucket: "",
    messagingSenderId: "740713841242"
  };
  firebase.initializeApp(config);

  var table = document.querySelector('#table1 tbody');

  function refreshData(roadName)
{
	//while(table.hasChildNodes()) {
	//	table.removeChild(table.firstChild);
    //}
   
	dbRefObject = firebase.database().ref().child('/Schedule/'+roadName+'/');
	dbRefObject.on('child_added', snap => {
        var Rname = snap.key;
        var Ctime = snap.child("time").val();
        console.log(Rname);	
        console.log(Ctime);
        var $row = $('<tr></tr>').appendTo('#table1 tbody');
        $('<td></td>').appendTo($row).text(Rname);
        $('<td></td>').appendTo($row).text(Ctime);
        
	});
}

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}