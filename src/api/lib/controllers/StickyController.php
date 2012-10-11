<?php

error_reporting(E_ALL);
ini_set('display_errors','On');


require_once(dirname(dirname(__FILE__))."/db/DB.class.php");

require_once(dirname(dirname(__FILE__))."/AuthSession.php");

require_once(dirname(dirname(__FILE__))."/models/Sticky.php");

require_once(dirname(dirname(__FILE__))."/rest/RestResponseModel.php");


require_once(dirname(dirname(dirname(__FILE__)))."/config/ConfigFactory.php");


class StickyController {
    
    
    /*
     * Create a sticky based on the recipient is. The content will also be passed 
     * in along with recipient as a required parameter while the owner_id can be
     * found trivially by getFacebook()->
     * 
     */
    public static function create($request){

        $request->paramCheck('recipient_key', 'content');

        $recipient_key = $request->recipient_key;
        $content = $request->content;
        
        AuthSession::checkpoint();
        $user = AuthSession::user();
        $config = new ConfigFactory();
        $config->getFacebook();
        
        
        $owner_id = $user->getID();
        
        $var = array('owner_id'=>$owner_id, 'recipient_key'=> $recipient_key, 'content'=>$content);
        
        $sticky = new Sticky();
        $sticky->create($owner_id, $recipient_key, $content);
        
        return new RestResponseModel($var);
        
        

    }

    /*
     * Controller function that calls the model function to retrieve any attribute from the database.
     */
    
    public static function getValue($request)
    {
        $request->paramCheck("sticky_id", "type");
        
        $sticky_id = $request->sticky_id;
        $type = $request->type;
        
        $sticky = new Sticky($sticky_id);
        return new RestResponseModel($sticky->getValue($type));
    }

    /*
     * This functions returns all stickies on recipient's wall by owner.
     * 
     */
    public static function getAllStickies($request)
    {
        
        AuthSession::checkpoint();
        
        $user = AuthSession::user();
        $owner_key = $user->getID();
        
        //Filter according to the provided recipient key.
        if($request->recipient_key !== null){
            
            $recipient_key = $request->recipient_key;
            return new RestResponseModel(Sticky::getAllStickies($owner_key, $recipient_key));
            
        //Get all the sticky notes that was created by the owner.
        }else{
            return new RestResponseModel(Sticky::getAll($owner_key));
        }
        
        
        
    }
}

?>
