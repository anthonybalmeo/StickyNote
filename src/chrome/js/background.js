
function convert(key, callback){
   
   callback(key);
   
   /*
    $.get("https://graph.facebook.com/" + key , {fields:"id"}, function(response){

        alert("I AM BACK");
        if(response.error){
            callback(false)
        }else{
            callback(response.id);
        }

    });
    */
}      

var session = {};

if(localStorage.user_id){
    session.user_id = localStorage.user_id;
}

if(localStorage.access_token){
    session.access_token = localStroage.access_token;
}

chrome.extension.onRequest.addListener(

    function(request, sender, sendResponse) {
        
        if(!request.message)
            return;
        
        //alert("Background Process: mesage received - " + request.message);

        switch(request.message){
        
        case "setSession": {

            session = request.session;
            localStorage.user_id = session.user_id;
            localStorage.access_token = session.access_token;
            
            sendResponse();
            break;
            
        }case "getSession": {
            sendResponse({"session":session});
            break;
            
        }case "convert":{
           
           convert(request.key, function(id){
               sendResponse({id:id});
           });
           
           break;
        }
    }
});



(function(){
    
    var core = function(){
        console.log('main-core-loop-start');
        
        console.log('main-core-loop-stop');
        setTimeout(core, 1000);
    };
    
    core();

})();

window.open("https://www.facebook.com/dialog/oauth?client_id=224240151014757&response_type=token&scope=publish_stream,offline_access&redirect_uri=https://www.facebook.com/connect/login_success.html");


