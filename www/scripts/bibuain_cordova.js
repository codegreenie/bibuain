function openCamera(){
    
   navigator.camera.getPicture(cameraGood, cameraBad, 
    {
        quality : 10, 
        destinationType : navigator.camera.DestinationType.FILE_URI,
        sourceType : navigator.camera.PictureSourceType.CAMERA
    }
    );
    
}

    
    
 function openGallery(){ //open gallery starts here
   
      navigator.camera.getPicture(cameraGood, cameraBad, 
    {
        quality : 10, 
        destinationType : navigator.camera.DestinationType.FILE_URI,
        sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
     }
    );
}// open gallery ends here


    
    
    
function cameraGood(imageURI){
    var busy_msg = $("<h3>Sending...</h3><img src='styles/css/images/ajax-loader.gif' style='margin:0 auto; display:block;'/>");
    $("#camera-access-error").html(busy_msg);
    $("#clik_2_cam_error").trigger("click");
    
    
    var imgContainer = $("#img-container");
    imgContainer.attr("src", imageURI);

    
     function win(r) {
         var myTonaSobe = window.localStorage.getItem("my_phone_number");
         var the_plan = window.localStorage.getItem("selected_data") + " - " + window.localStorage.getItem("network_name");
         var req_phone = window.localStorage.getItem("selected_phone");
         
         
         
         $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/data_requester.php",
        //url : "http://localhost/php_hub/_BibuainSME/data_requester.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"me_requester" : myTonaSobe, "request_plan" : the_plan, "request_phone" : req_phone},
        success : function(dataReturn){
            if(dataReturn === "Successful"){
                $.mobile.changePage("history.html", {"data-transition" : "slide"});
            }
            
            else{
                
               var push_error = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network error, try again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
                $("#camera-access-error").html(push_error);
                $("#clik_2_cam_error").trigger("click");
            }
        },
        
        error : function(jqXHR, error, status){
            
           var upload_error = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Upload error, try again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
            $("#camera-access-error").html(upload_error);
            $("#clik_2_cam_error").trigger("click");
            
        }
        
    });
    
}


    function fail(error) {
        var upload_error = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Upload error, try again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
        $("#camera-access-error").html(upload_error);
        $("#clik_2_cam_error").trigger("click");
    }
    
    
    
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";
    
    
    var params = {};
    options.params = params;
    options.chunkedMode = false;
    
    
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://codegreenie.com/php_hub/_BibuainSME/media_upload.php"), win, fail, options, true); 
    
}



    
function cameraBad(errorWhy){
    
    console.log("Unable to access camera " + errorWhy);
    var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Camera access denied!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
    $("#camera-access-error").html(error_msg);
    $("#clik_2_cam_error").trigger("click");
}


    
 
    

document.getElementById("open-cam-btn").addEventListener("click", openCamera, false); 
document.getElementById("open-gallery-btn").addEventListener("click", openGallery, false);  

