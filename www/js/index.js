var picsTaken = 0;

function savePhoto(data) {
    $('#cameraPic').attr('src', "data:image/jpeg;base64," + data);
}

$('button.camera-control').click(function () {
	++picsTaken;
   	$('#pics-taken').html(picsTaken + " pictures have been taken.");
    if (navigator.camera) {
    	navigator.camera.getPicture(savePhoto, null, {sourceType:1,quality:60});
    }
    else {
    	$('#error-output').html('CameraAPI not supported');
    }
});
