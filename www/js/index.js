$('#camera-control').click(function capturePhoto() {
    if (navigator.camera) {
    	navigator.camera.getPicture(savePhoto, null, {sourceType:1,quality:60});
    }
    else {
    	$('#error-output').html('CameraAPI not supported');
    }
});

function savePhoto(data) {
    $('#cameraPic').attr('src', "data:image/jpeg;base64," + data);
}
