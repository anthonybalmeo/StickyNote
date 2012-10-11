<?php

error_reporting(E_ALL);
ini_set('display_errors','On');


require_once(dirname(dirname(__FILE__))."/db/DB.class.php");

require_once(dirname(dirname(__FILE__))."/AuthSession.php");
require_once(dirname(dirname(__FILE__))."/models/User.php");

require_once(dirname(dirname(__FILE__))."/rest/RestResponseModel.php");


class UserController {

    public static function init($request){

        $request->paramCheck('user_id', 'access_token');

        $user_id      = $request->user_id;
        $access_token = $request->access_token;

        $user = new User($user_id, $access_token);

        try {

            if($user->isValid()){

                if($user->exists()){

                    $user->update();

                } else {
                    $user->create();
                }

            } else {
                throw new Exception("User [$user_id] with access token [$access_token] is not valid.");
            }

            AuthSession::init($request->user_id, $request->access_token);

            return new RestResponseModel();

        } catch(Exception $ex){
            throw new Exception("Unable to initalize user [$user_id] with access token [$access_token].");
        }

    }

}

?>
