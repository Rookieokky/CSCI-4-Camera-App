var photos = [];

/* execute immediately on load */
reloadPhotos();
displayPhotos();

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
    if (navigator.camera) {
    	var options = {
    		quality: 60, 
    		destinationType: Camera.DestinationType.DATA_URL,
    		sourceType: 1,
    		encodingType: 0
    	};
    	navigator.camera.getPicture(getPhoto, getPhotoError, options);
        navigator.geolocation.getCurrentPosition(getPosition, getPositionError, 
            {enableHighAccuracy: true});
    }
});

$('button.save').click(function () {
    photos.append(makePhoto());
    savePhotos();
});

function makePhoto () {
    var currentPhoto = $('#camera-photo').attr('src');
    var currentGisLocation = $('#gis-location').html();
    var currentDescription = $('#description').val();

    var photo = {
        "photo" : currentPhoto,
        "gisLocation" : currentGisLocation, 
        "description" : currentDescription
    };
    return photo;
}

function displayPhotos () {
    for (var i=0; i<photos.length; i++) {
        $('#photo-list').append('<img src="' + photos[i] + '" />');
    }
}

function reloadPhotos () {
    if (Modernizr.localstorage) {
        if (localStorage["photos"] != null) {
            entries = JSON.parse(localStorage["photos"]);
        }
    }
}

function savePhotos () {
    if (Modernizr.localstorage) {
        localStorage.clear();
            localStorage["photos"] = JSON.stringify(photos);
    }
}
