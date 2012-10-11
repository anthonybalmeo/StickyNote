
var Application = function(){

    var me = this;

    var api = new API();

    /**
     * Stores the current user's ID and associated access token. Acts as a
     * buffer to decrease the number of requests.
     */
    var session = {
        user: null,
        accessToken: null
    };

    this.getUser = function(){
        return session.user;
    }

    this.getAccessToken = function(){
        return session.accessToken;
    }

    /**
     * Returns a reference to the API.
     */
    this.getAPI = function(){
        return api;
    }


    this.showLoginError = function(callback){
        $("#login-error").fadeIn(Application.ANIMATION_DURATION, callback);
    }

    this.hideLoginError = function(callback){
        $("#login-error").fadeOut(Application.ANIMATION_DURATION, callback);
    }

    this.initLoginError = function(){
        $("#install-app-button").click(function(){
           me.init(function(successful){
               if(successful){
                   me.hideLoginError();
                   me.refreshTab();
               }
           }, true);
        });

        $("#cancel-install-button").click(function(){
            me.hideLoginError(function(){
                me.loadTab('home');
            });

        });

        $("#close-login-error").click(function(){
            me.hideLoginError(function(){
                me.loadTab('home');
            });

        });

    }


    /**
     * Tries to initialze the user as valid application user from both Facebook's
     * and the current application's perspective.
     *
     * @param callback The function that will be invoked with single boolean
     *        paramter indicating success or failure of user initialization.
     *
     * @param force A boolean value that determines if the user will be forced
     *        to login via Facebook authentication system if he or she is not
     *        currently logged in. A false value allows already installed users to
     *        be silently 'logged-in'.
     */
    this.init = function(callback, force)
    {
        //Be default force is set to true - if not installed, the user will be
        //directed to the Facebook's authentication dialog.
        force = (typeof force == 'undefined') ? true : force;

        //Shortcut for invoking the provided callback if defined.
        function invoke(callback, data){
            if(callback)
                callback(data);
        }


        //First check the current user's login status - if the user is already
        //installed on this application, then proceed with initializing the API.
        //Otherwise, try to authenticate via Facebook's authentication mechanism.
        FB.getLoginStatus(function(response) {

            //If the user has already installed the application, then proceed to
            //initialize the API.
            if (response.status === 'connected'){
                processAuthResponse(response);

            //Otherwise, if the user is not authorized and force flag is set to true
            //try to authenticate the user via Facebook's authentication dialog.
            } else if ((response.status === 'not_authorized' || response.status === 'unknown') && force === true) {

                //Display the authentication dialog with the scope required by the
                //application.
                FB.login(function(response) {
                    processAuthResponse(response);
                }, {scope: me.getAPI().App.getScope()});
            }
            else {
                invoke(callback, false)

            }

        });



        //This method is responsible for further processing Facebook's
        //authentication response - either after displaying the authentication
        //dialog or after retrieving current user's login/connection status.
        function processAuthResponse(response)
        {
            //Proceed with initializing the API if the Facebook's authentication was
            //successful - either by displaying the dialog or if the user has
            //already installed the application.
            if(response.authResponse) {

                //Extract user ID and access token from the response.
                var userID      = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;


                //If the currently authenticated user has already been initialized,
                //then invoke the callback  without contacting the server.
                if(session.user && userID == session.user.id) {
                    invoke(callback, true);

                } else {

                    //Try to initialize the application with the extracted user ID and
                    //access token.
                    api.User.init(userID, accessToken, function(response){


                       //In case the API initialization was successful, store
                       //the user's ID and access token in the temporary session
                       //variable.

                       if(response.status === 'success'){
                           session.user        = userID;
                           session.accessToken = accessToken;


                       }

                       invoke(callback, response.status === 'success');

                    });
                }



            //In case the user rejects the authentication, return a false value to
            //the callback.
            }else {
                invoke(callback, false);
            }


        }

    }


};

/**
 * An average estimation on how long animations last. For example, if you
 * decrease this value, then all the loaders, fade ins/outs will be much
 * quicker.
 */
Application.ANIMATION_DURATION = 100;

/**
 * This method is invoked as soon as Facebook JDK is completely loaded.
 */

    


/**
 * This method is invoked as soon as Facebook JDK is completely loaded.
 */
window.fbAsyncInit = function()
{
    app = new Application();

    initSDK(app.getAPI().App.getID(), app.getAPI().App.getChannel());

    $(document).ready(function(){
        
        
       app.init(function(successful){
           if(successful)
               app.getAPI().Sticky.getAllStickies(null, function(response){
                   console.log(response);
                   
                   
                   //Anthony: This is where you would iterate through the 
                   //received data and dynamically create sticky notes.
               });
       }); 
        
        
        
        
        
        $("#button-init").click(function(){
            app.init();
        });

        $("#button-get-all-stickies").click(function(){
            app.getAPI().Sticky.getAllStickies();
        });

        $("#button-create-sticky").click(function(){
            app.getAPI().Sticky.create("message", "661936566");
        });
    });
    

};

