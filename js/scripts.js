
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



 // Details management page

 // --------------------------
// READ
// --------------------------
const dbRef = firebase.database().ref();
readUserData(); 

function readUserData() {

  const userListUI = document.getElementById("user-list");

  const usersRef = dbRef.child('users').child('driver');
 
  usersRef.on("value", snap => {

    userListUI.innerHTML = ""

    snap.forEach(childSnap => {

      let key = childSnap.key,
        value = childSnap.val();
  

        
      let $li = document.createElement("li");

      // edit icon
      let editIconUI = document.createElement("span");
      editIconUI.class = "edit-user";
      editIconUI.innerHTML = " ✎";
      editIconUI.setAttribute("userid", key);
      editIconUI.addEventListener("click", editButtonClicked)

      // delete icon
      let deleteIconUI = document.createElement("span");
      deleteIconUI.class = "delete-user";
      deleteIconUI.innerHTML = " ☓";
      deleteIconUI.setAttribute("userid", key);
      deleteIconUI.addEventListener("click", deleteButtonClicked)
      
      $li.innerHTML = value.fname;
      $li.append(editIconUI);
      $li.append(deleteIconUI);

      $li.setAttribute("user-key", key);
      $li.addEventListener("click", userClicked)
      userListUI.append($li);

    });

  })

}

function userClicked(e) {


    var userID = e.target.getAttribute("user-key");

    const dbRef = firebase.database().ref();
    const userRef = dbRef.child('users').child('driver/' + userID);
    const userDetailUI = document.getElementById("user-detail");

    userRef.on("value", snap => {

      userDetailUI.innerHTML = ""

      snap.forEach(childSnap => {
        var $p = document.createElement("p");
        $p.innerHTML = childSnap.key  + " - " +  childSnap.val();
        userDetailUI.append($p);
      })

    });
  

}


 //Add user

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked);

function addUserBtnClicked() {

  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child('users').child('driver');
  const workersRef = dbRef.child('users').child('worker');
  const addUserInputsUI = document.getElementsByClassName("user-input");

  // this object will hold the new user information
  let newUser = {};

  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

    let key = addUserInputsUI[i].getAttribute('data-key');
    let value = addUserInputsUI[i].value;
    newUser[key] = value;
  }
  if(document.getElementById("user-input").value == "driver"){
        usersRef.push(newUser, function(){
        alert("New driver has been inserted");
  })
  }

  else if(document.getElementById("user-input").value == "worker"){
        workersRef.push(newUser, function(){
        alert("New user has been inserted");
})
}

}

// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

    e.stopPropagation();

    var userID = e.target.getAttribute("userid");

    const userRef = dbRef.child('users').child('driver/' + userID);
    
    userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {
  
  document.getElementById('edit-user-module').style.display = "block";

  //set user id to the hidden input field
  document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

  const userRef = dbRef.child('users').child('driver/' + e.target.getAttribute("userid"));

  // set data to the user field
  const editUserInputsUI = document.querySelectorAll(".edit-user-input");


  userRef.on("value", snap => {

    for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

      var key = editUserInputsUI[i].getAttribute("data-key");
          editUserInputsUI[i].value = snap.val()[key];

    }

  });




  const saveBtn = document.querySelector("#edit-user-btn");
  saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {
 
  const userID = document.querySelector(".edit-userid").value;
  const userRef = dbRef.child('users').child('driver/' + userID);

  var editedUserObject = {}

  const editUserInputsUI = document.querySelectorAll(".edit-user-input");

  editUserInputsUI.forEach(function(textField) {
    let key = textField.getAttribute("data-key");
    let value = textField.value;
      editedUserObject[textField.getAttribute("data-key")] = textField.value
  });



  userRef.update(editedUserObject);

  document.getElementById('edit-user-module').style.display = "none";


}



