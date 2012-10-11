

/* * * * * * * * * * * * * * * * * * * * *
 * FACEBOOK APPLICATION FUNCTIONS BELOW  *
 * * * * * * * * * * * * * * * * * * * * */

function initSDK(id, channel){
      FB.init({
          appId      : id,      // App ID
          channelUrl : channel, // Channel File
          status     : true,    // Check login status.
          cookie     : true,    // Enable cookies to allow the server
                                // to access the session.
          xfbml      : true,    // Parse XFBML
          oauth      : true,    // Enable OAuth 2.0 (required).

          frictionlessRequests : true
    });
}

function inviteFriends(message){

    message = message || "Will You Kiss me?";

    FB.ui({
            method: 'apprequests',
            display: 'popup',
            message: message
    });
    
    console.log(FB);
}

function postToWall(app, message, post_img){

    var post = {
        method: 'feed',
        show_error: true,
        display: 'iframe',
        name: message,
        link: app.getAPI().App.getFacebookAppURL(),
        picture: "https:" + post_img,
        caption: app.getAPI().App.getName(),
        description: app.getAPI().App.getDescription()
    };

    FB.ui(post);
}

function deleteRequest(requestId, callback) {
    FB.api(requestId, 'delete', callback);
}

function deleteAllRequests(app){

    var requestList = getParameterByName('request_ids');

    if(requestList == ""){
        return;
    }

    var requests = requestList.split(',');

    var callback = function(){};

    for(var i = 0; i < requests.length; i++){
        deleteRequest(requests[i] + "_" + app.getUser(), callback);
    }


}

function getParameterByName(name){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    return (results == null)? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}