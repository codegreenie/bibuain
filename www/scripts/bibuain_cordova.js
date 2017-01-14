var pictureSource;
var destinationType;

   

function openCamera(){
    
    destinationType = Camera.DestinationType;
    pictureSource = Camera.PictureSourceType;
    
    navigator.camera.getPicture(cameraGood, cameraBad, 
    {
        quality : 70, 
        destinationType : destinationType.FILE_URI,
        sourceType : pictureSource.CAMERA
    }
    );
    
}



function cameraGood(imgObj){
    
    var imgContainer = $("#img-container");
    imgContainer.attr("src", "data:image/jpeg;base64," + imgObj);
    uploadPhoto(imgObj);
}



function cameraBad(errorWhy){
    
    console.log("Unable to access camera " + errorWhy);
    var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Camera access denied!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
    $("#camera-access-error").html(error_msg);
    $("#clik_2_cam_error").trigger("click");
}


    
  function openGallery(){
    
    destinationType = Camera.DestinationType;
    pictureSource = Camera.PictureSourceType;
    
    navigator.camera.getPicture(cameraGood, cameraBad, 
    {
        quality : 70, 
        destinationType : destinationType.FILE_URI,
        sourceType : pictureSource.PHOTOLIBRARY
     }
    );
    
}  
    

    
    $("#open-cam-btn").on("click", function(){openCamera();});
    $("#open-gallery-btn").on("click", function(){openGallery();});







 function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";
            
           
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://codegreenie.com/Mobile_app_repo/php_hub/_BibuainSME/media_upload.php"), win, fail, options);
}



       
    function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }





        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            //console.log("upload error source " + error.source);
            //console.log("upload error target " + error.target);
        }









