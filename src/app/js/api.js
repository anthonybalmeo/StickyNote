
var API_PATH = "//rocking-apps.com/sticky/api/";


var API = function() {
    this.User = new User();
    this.App = new App();
    this.Sticky = new Sticky();
}


var User = function(){

    /**
     * Initalizes a user with the API. Both user ID and access_token must be
     * valid value issued by Facebook.
     *
     * Authentication: not required.
     *
     * @param user_id The ID of the user to initialize.
     * @param access_token A valid access_token issued by Facebook.
     * @param callback The function to be invoked on response.
     */
    this.init = function(user_id, access_token, callback){
        //The data required for user initilization - includes user ID and
        //access token.
        var data = {user_id:user_id, access_token:access_token};

        API.request('get', 'user', 'init', data, callback);
    }

}

var Sticky = function(){

    this.create = function(content, key, callback){
        var data = {content:content, recipient_key: key};
        API.request('get', 'sticky', 'create', data, callback);
        
    }
    
    this.getAllStickies = function(key, callback){
        
        var  data = {};
        
        if(key){
            data = {recipient_key:key}
        }
        
        API.request('get', 'sticky', 'getAllStickies', data , callback);
    }

}


var App = function(){

    /**
     * Returns application ID.
     */
    this.getID = function(){
        return '224240151014757';
    }

    /**
     * Returns the application name.
     */
    this.getName = function(){
        return "Sticky Notes";
    }

    /**
     * Returns the channel URL for Facebook request channeling.
     */
    this.getChannel = function(){
        return '//rocking-apps.com/sticky/channel.html';
    }

    /**
     * Returns the home URL of the desktop application. 
     */
    this.getHomeURL = function(){
        return '//rocking-apps.com/sticky/app/www/';
    }

    this.getFacebookAppURL = function(){
        return "https://apps.facebook.com/coolstickynotes";
    }

    /**
     * Returns the required permission scope for this application.
     */
    this.getScope = function(){
        return 'publish_stream,offline_access';
    }
}

var Report = function(){
    this.report = function(callback){
        API.request('get', 'report', 'report', {}, callback);
    }
}


/**
 * General request method - support both GET and POST request methods.
 */
API.request = function(method, object, action, data, callback){

    var requestURL = API_PATH + object + "/" + action + "/";

    var processResposne = function(response){

        console.log("Response received for request [%s]", requestURL, response);

        //If the callback value is specified, invoke it passing in the
        //response received from the API.
        if(callback){
            callback(response);
        }
    }

    //Handle GET requests.
    if(method == 'get'){
        console.log(requestURL + API.serialize(data));
        $.get(requestURL + API.serialize(data), processResposne);
    }

    //Handle POST requests.
    else if(method == 'post'){
        $.post(requestURL, data, processResposne, 'json');
    }

}



/**
 * Converts an object to GET query string prefixed with a '?'.
 */
API.serialize = function serialize(obj){

    var str = [];

    for(var p in obj){
        str.push(p + "=" + encodeURIComponent(obj[p]));
    }

    return (str.length == 0)? "" : "?" + str.join("&");
}


