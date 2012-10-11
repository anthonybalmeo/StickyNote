
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name){
            return unescape(y);
        }
    }
    
    return null;
}


var hash = window.location.hash;

var user_id = getCookie("c_user");
var access_token = hash.substring(14, hash.indexOf('&'));

var session = {user_id:user_id, access_token:access_token};

chrome.extension.sendRequest({message: "setSession", session: session}, function() {
    window.close();
});