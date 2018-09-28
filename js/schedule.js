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
   
	dbRefObject = firebase.database().ref().child('/Schedule/District1/'+roadName+'/');
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

function SaveNewSchedule(){

    var selected = document.getElementById("district").value;

    const SaveDbRef = firebase.database().ref().child('/Schedule/'+selected+'/');

    console.log(selected);

    var name1 = document.getElementById("field1").value;
    var collection1 = document.getElementById("field2").value;
    var name2 = document.getElementById("field3").value;
    var collection2 = document.getElementById("field4").value;
    var name3 = document.getElementById("field5").value;
    var collection3 = document.getElementById("field6").value;
    var name4 = document.getElementById("field7").value;
    var collection4 = document.getElementById("field8").value;
    var name5 = document.getElementById("field9").value;
    var collection5 = document.getElementById("field10").value;
    var block = document.getElementById("block").value;

    if (selected == "District 1"){
        SaveDbRef.child(block).child(name1).set({
            "time":collection1
        });
        SaveDbRef.child(block).child(name2).set({
            "time":collection2
        });
        SaveDbRef.child(block).child(name3).set({
            "time":collection3
        });
        SaveDbRef.child(block).child(name4).set({
            "time":collection4
        });
        SaveDbRef.child(block).child(name5).set({
            "time":collection5
        });
        alert("Schedule Saved Successfully");

        var divId  = document.getElementById("district1");
        var button = document.createElement("button");
        button.value = block;
        $(button).addClass('tablinks');
        button.innerHTML = block;
        button.onclick = function () { 
            document.getElementById('London').style.display='block';
            refreshData(block);
        };

        divId.appendChild(button);
        alert("button added");
    }

}



function onchangefunction(){
    var variable = document.getElementById('updateDistrict').value;
    var blockvalue = document.getElementById('blockname').value;
    const rootref5 = firebase.database().ref().child('/Schedule/'+variable+'/');
    $("#blockname").empty();
  rootref5.on("child_added",snap =>{
    var block = snap.key;
    
    $("#blockname").append('<option>'+block+'</option>');
  });

 
  const rootref6 = firebase.database().ref().child('/Schedule/'+variable+'/'+blockvalue+'/');
  rootref6.once("value",snap =>{
    data = snap.val();
    console.log(data);
    console.log(data.key);
    //$("#updatefield1").append(+data[0].key);
    //$("#updatefield2").append(+data[0].time);
  });
  
}

function UpdateSchedule(){

}
