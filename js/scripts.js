  var nextkey =0;
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


 var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('users/driver');
  var rowIndex = 1;
  
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();
   
   var row = tblUsers.insertRow(rowIndex);
   var cellId = row.insertCell(0);
   var cellName = row.insertCell(1);
   var celllName = row.insertCell(2);
   var celltp = row.insertCell(3);
   var cellnic= row.insertCell(4);
   cellId.appendChild(document.createTextNode(childKey));
   cellName.appendChild(document.createTextNode(childData.fname));
   celllName.appendChild(document.createTextNode(childData.lname));
   celltp.appendChild(document.createTextNode(childData.tp));
   cellnic.appendChild(document.createTextNode(childData.nic));
   
   rowIndex = rowIndex + 1;
    });
  });
   
  function save_user(){
   var user_name = document.getElementById('user_name').value;
   var user_lname = document.getElementById('last_name').value;
   var user_tp = document.getElementById('tp').value;
   var user_nic = document.getElementById('nic').value;

  
   var uid = firebase.database().ref().child('users').child('driver').push().key;
   
   var data = {
    user_id: uid,
    fname: user_name,
    lname:user_lname,
    tp:user_tp,
    nic:user_nic
   }
   
   var updates = {};
   updates['/users/driver/' + uid] = data;
   firebase.database().ref().update(updates);
   
   alert('The user is created successfully!');
   reload_page();
  }
  
  function update_user(){
   var user_name = document.getElementById('user_name').value;
   var user_id = document.getElementById('user_id').value;
   var user_lname = document.getElementById('last_name').value;
   var user_tp = document.getElementById('tp').value;
   var user_nic = document.getElementById('nic').value;

   var data = {
    user_id: user_id,
    fname: user_name,
    lname:user_lname,
    tp:user_tp,
    nic:user_nic
   }
   
   var updates = {};
   updates['/users/driver/' + user_id] = data;
   firebase.database().ref().update(updates);
   
   alert('The user is updated successfully!');
   
   reload_page();
  }
  
  function delete_user(){
   var user_id = document.getElementById('user_id').value;
  
   firebase.database().ref().child('/users/driver/' + user_id).remove();
   alert('The user is deleted successfully!');
   reload_page();
  }
  
  function reload_page(){
   window.location.reload();
  }

  function LoadFunction(){
    var user_id = document.getElementById('user_id').value;
    
    ref = firebase.database().ref().child('/users/driver/' + user_id);
    ref.on("value", function(snapshot){
      document.getElementById('user_name').value= snapshot.child("fname").val();
      document.getElementById('last_name').value= snapshot.child("lname").val();
      document.getElementById('tp').value= snapshot.child("tp").val();
      document.getElementById('nic').value= snapshot.child("nic").val();
      });
  }


