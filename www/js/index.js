var picsTaken = 0;
var entries = [];

/* execute immediately on load */
reloadEntries();

function getPhoto(data) {
    $('#camera-photo').attr('src', "data:image/jpeg;base64," + data);
}

function getPhotoError () {
    $('#error-output').append('<li>error capturing photo</li>');
}

function getPosition (position) {
    var longitude = position.coords.latitude;
    var latitude = position.coords.longitude;
    $('#gis-location').html("GIS coordinates: " + longitude + ", " + latitude);
}

function getPositionError (error) {
    $('#error-output').append('<li>' + error.message + '</li>');
}

$('button.camera-control').click(function () {
	++picsTaken;
   	$('#pics-taken').html(picsTaken + " pictures have been taken");
    if (navigator.camera) {
    	var options = {
    		quality: 60, 
    		destinationType: Camera.DestinationType.DATA_URL,
    		sourceType: 1,
    		encodingType: 0
    	};
    	navigator.camera.getPicture(getPhoto, getPhotoError, options);
        navigator.geolocation.getCurrentPosition(getPosition, getPositionError);
    }
});

$('button.save').click(function () {
    entries.append(makeEntry());
    saveEntries();
});

function makeEntry () {
    var currentPhoto = $('#camera-photo').attr('src');
    var currentGisLocation = $('#gis-location').html();
    var currentDescription = $('#description').val();

    var entry = {
        "photo" : currentPhoto,
        "gisLocation" : currentGisLocation, 
        "description" : currentDescription
    };
    return entry;
}

function reloadEntries () {
    if (Modernizr.localstorage) {
        if (localStorage["entries"] != null) {
            entries = JSON.parse(localStorage["entries"]);
        }
    }
}

function saveEntries () {
    if (Modernizr.localstorage) {
        localStorage.clear();
            localStorage["entries"] = JSON.stringify(entries);
    }
}
