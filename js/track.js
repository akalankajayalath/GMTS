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


function initMap() {
   
    // The location of Uluru
    var uluru = {lat: 6.916131, lng: 79.863743};

    var options = {
        zoom: 13, 
        center:{lat: 6.9271,lng:79.8612}
    }
    // The map, centered at Uluru

    var map = new google.maps.Map(
        document.getElementById('map'),
        options 
        );
/*
   addMarker({
       coords:{lat: 6.916131, lng: 79.863743},
       iconImage:'http://maps.google.com/mapfiles/ms/icons/truck.png',
       content : '<h1>Akalanka Jayalath</h1>'
    });
   addMarker({coords:{lat: 6.8980, lng: 79.9223}});
*/
    //add marker function
    function addMarker(props){
        var marker = new google.maps.Marker({
            position: props.coords, 
            map: map,
            icon:props.iconImage,
            label : "Akalanka"
        });

        //check content
        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content : props.content 
            });
            marker.addListener('click',function(){
                infoWindow.open(map,marker);
            }); 
        }
    }

    loadPointsFromFirebase(map);
    function loadPointsFromFirebase (map) {  // pass the initialised map to the function
    var marker= {};
    var db = firebase.database();
    db.ref('Locations').once('value', points => {
        points.forEach(point=>{
            
            addMarker({coords:{lat:point.val().lat, lng:point.val().lng},
                       iconImage:'http://maps.google.com/mapfiles/ms/icons/truck.png',
                       content : point.val().number
        });
             
         });
    });
}
}
