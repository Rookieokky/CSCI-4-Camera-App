var picsTaken = 0;

function getPhoto(data) {
    $('#camera-photo').attr('src', "data:image/jpeg;base64," + data);
}

function photoError () {
	$('#error-output').html('Error capturing photo');
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
    	navigator.camera.getPicture(getPhoto, photoError, options);
    }
    else {
    	$('#error-output').html('CameraAPI not supported');
    }
});
