//jQuery Document for Bibuain Data App

function processReg(){
    
    var realUiUpdate = $("<h3>Sending OTP</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#sending-otp").html(realUiUpdate);
    
    
    
    $("#clik_2_send_otp").trigger("click");
    var thePhoneNumber = $("#reg-phone").val();
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_Bibuain/process_signup.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"reg-phone" : thePhoneNumber},
        success : function(successReturn){
            
            if(successReturn === "Successful"){
            
            window.localStorage.setItem("my_phone_number", thePhoneNumber);
            console.log(successReturn);
            $.mobile.changePage("verify_otp.html", {"transition" : "slideup", "data-direction" : "reverse"});
            }
            
            else{
                window.alert(successReturn);
            }
            
        },
        
        error : function(jqXHR, error, status){
            
            console.log(error + " " + status);
            var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network Error, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
            $("#sending-otp").html(error_msg);
            
        }
        
        
    });
    
    
}




function processOTP(){
    
    var realUiUpdate = $("<h3>Verifying you</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#verifying-otp").html(realUiUpdate);
    
    
    $("#clik_2_verify_otp").trigger("click");
    phone_number = window.localStorage.getItem("my_phone_number");
    supplied_otp = $("#sent-otp").val();
    
    
    
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_Bibuain/verify_otp.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"otp-phone" : phone_number, "otp-code" : supplied_otp},
        success : function(successReturn){
         if(successReturn === "Correct OTP"){
            
            console.log(successReturn);
             window.localStorage.setItem("my_otp", supplied_otp);
            $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
            
         }
            
            else{
                
                var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>OTP is invalid!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
                $("#verifying-otp").html(error_msg);
            }
            
        },
        
        error : function(jqXHR, error, status){
            
            console.log(error + " " + status);
            var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network Error, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
            $("#verifying-otp").html(error_msg);
            
        }
        
        
    });
    
    
}







function pushSelectedPrice(thisPrice){
    
    var selectedPrice = $("#" + thisPrice).html();
    
    $("#data-select").html(selectedPrice);
    $("#close-data-popup").trigger("click");
    
}


function placeOrder(){ // Place Order
    
   $("#clik_2_process_order").trigger("click");
    
    
   var selected_phone = $("#recharge-phone").val();
   var selected_data = $("#data-select").html();
   
    window.localStorage.setItem("selected_phone", selected_phone);
    window.localStorage.setItem("selected_data", selected_data);
    
    var get_selected_phone = window.localStorage.getItem("selected_phone");
    var get_selected_data =  window.localStorage.getItem("selected_data");
    var get_selected_network = window.localStorage.getItem("network_name");
    
    console.log(get_selected_phone, get_selected_data);
    console.log(get_selected_network);
    
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_Bibuain/order_summary.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"picked_data" : get_selected_data, "picked_network" : get_selected_network},
        success : function(successReturn){
            
            window.localStorage.setItem("data_price", successReturn);
            console.log(successReturn);
            $.mobile.changePage("order_summary.html", {"transition" : "slideup", "data-direction" : "reverse"});
        },
        
        error : function(jqXHR, error, status){
            
            console.log(error + " " + status);
            var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network Error, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
            $("#processing-order").html(error_msg);
            
        }
        
        
    });
    
    
}// Place Order



function addRechargeCard(){
    
      var realUiUpdate = $("<h3>Sending...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#sending-card").html(realUiUpdate);
    
    
    $("#clik_2_send_card").trigger("click");
    
      $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_Bibuain/check_card.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        success : function(successReturn){
         
            $.mobile.changePage("history.html", {"transition" : "slide", "data-direction" : "reverse"});
            
        },
        
        error : function(jqXHR, error, status){
            
            console.log(error + " " + status);
            var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network Error, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
           $("#sending-card").html(error_msg);
            
        }
        
        
    });
    
}






$(document).on("pagecreate", function(){
    
   $("#start-app").on("click", function(){
       
       
      if(window.localStorage.getItem("my_phone_number") === null || window.localStorage.getItem("my_otp") === null){
        $.mobile.changePage("reg_zone.html", {"transition" : "slideup", "data-direction" : "reverse"});  
      }
       
       else{
       $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
       }
   });
    
    
    $("#phone-reg-form").on("submit", function(){
        
        processReg();
        
    });
    
    
    $("#verify-otp-form").on("submit", function(){
        
        processOTP();
        
    });
    
    
    
    $("#user_line").html("+234" + window.localStorage.getItem("my_phone_number"));
    $("#recharge-phone").val(window.localStorage.getItem("my_phone_number"));
    
    var mtnDataList = $("#mtn-data-list").children("li");
    $(mtnDataList).on("click", function(){
        
    var getID = $(this).attr("id");
    window.localStorage.setItem("network_name", "MTN");
    pushSelectedPrice(getID);
    
    });
    
    
    
    var etiDataList = $("#eti-data-list").children("li");
    $(etiDataList).on("click", function(){
        
    var getID = $(this).attr("id");
    window.localStorage.setItem("network_name", "Etisalat");
    pushSelectedPrice(getID);
    
    });
    
    
    
    $("#process-order-button").on("click", function(){
       
        placeOrder();
    });
    
    
    
    var get_selected_phone = window.localStorage.getItem("selected_phone");
    var get_selected_data =  window.localStorage.getItem("selected_data");
    var get_selected_network = window.localStorage.getItem("network_name");
    var get_data_price = window.localStorage.getItem("data_price");
    
    
    $("#phone_n_data").html("<span class='ui-icon-phone ui-icon-notext ui-btn-icon-left' style='position:relative;'></span>+234" + get_selected_phone + " | " + get_selected_data);
    $("#data_network").html("<span class='ui-icon-cloud ui-btn-icon-left' style='position:relative;'></span>" + get_selected_network);
    $("#data_price").html("<span class='ui-icon-tag ui-btn-icon-left' style='position:relative;'></span><del>N</del>" + get_data_price);
    
    
    
    $("#add-recharge-card").on("click", function(){
       
        $.mobile.changePage("add_recharge.html", {"transition" : "slideup", "data-direction" : "reverse"});
    });
    
    
    
    var pin_field_count = 2;
    
    $("#add-pin-field").on("click", function(){
       
        var pinField = $("<input type='tel' maxlength='16' style='margin-bottom: 12px; min-height: 2.2em; width: 100%; border-radius: 8px; border: soild 0.4px #bbbbbb; background-color: #ffffff;'" + "name= recharge_pin_" + pin_field_count + ">"); 
        pinField.appendTo($("#recharge-field"));
        
        
        pin_field_count++;
        
    });
    
    
    $("#recharge-card-form").on("submit", function(){
       
        addRechargeCard();
        
    });
    
    $("#goto-home").click(function(){
        
        $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
    });
    
});








  

    
  
    
