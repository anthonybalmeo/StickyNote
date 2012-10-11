
var Application = function(){
    
    var api = new API();
    
    var session = {
        user_id: null,
        access_token: null
    };

    this.getUser = function(){
        return session.user_id;
    }

    this.getAccessToken = function(){
        return session.access_token;
    }
    
    this.setSession = function(data){
        session.user_id = data.user_id;
        session.access_token = data.access_token;
    }
    
    this.init = function(callback){
        api.User.init(session.user_id, session.access_token, function(response){
            callback(response.status === 'success');
        });
    };

    /**
     * Returns a reference to the API.
     */
    this.getAPI = function(){
        return api;
    }
    
}
