<?php

class AuthSession {

    public static function init($user_id, $access_token){
        @session_start();
        $_SESSION["user_id"]      = $user_id;
        $_SESSION["access_token"] = $access_token;
    }

    public static function user(){
        @session_start();
        return (isset($_SESSION["user_id"]))? new User($_SESSION['user_id']) : null;
    }

    /**
     * Throws an Exception in case if the user has not been initialized. Use
     * this method as an authentication checkpoint.
     */
    public static function checkpoint(){
        @session_start();
        if(AuthSession::user() == null){
            throw new Exception("Authentication Error: User not initalized.");
        }
    }
}

?>
