<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

error_reporting(E_ALL);
ini_set('display_errors','On');

require_once(dirname(dirname(__FILE__)).'/db/DB.class.php');
require_once(dirname(dirname(__FILE__)).'/db/ActiveRecord.class.php');


class Sticky extends ActiveRecord
{
    public function __construct($id = 0) 
    {
        //Call ActiveRecord's constructor.
        parent::__construct('stickies',$id, 'id');
        
       
    }
    
    public function create($owner_id, $recipient_key, $message, $color = 'yellow', $remind_time = '0000-00-00 00:00:00')
    {
        $this->recipient_key = $recipient_key;
        $this->content = $message;
        $this->owner_id = $owner_id;
        $this->create_time = date('Y-m-d H:i:s');
        $this->active = 1;
        $this->color = $color;
        $this->remind_time = $remind_time;
        
        
        return parent::create();
        
    }
    
    public static function getAll($owner_key){
        $query = "SELECT *
                  FROM stickies
                  WHERE owner_id = '$owner_key'";
        
        
        $result = DB::mysqli()->query($query);
        
        $stickies = array();

        while($row = mysqli_fetch_assoc($result)){
            $stickies[] = $row;
        }

        return $stickies;
    }
    
    public static function getAllStickies($owner_key = 0, $recipient_key = 0)
    {
        $query = "SELECT *
                  FROM stickies
                  WHERE owner_id = '$owner_key' AND recipient_key = '$recipient_key'";
                
        
        $result = DB::mysqli()->query($query);
        
        $stickies = array();

        while($row = mysqli_fetch_assoc($result))
        {
            $stickies[] = $row;
        }

        return $stickies;
        
    }
    
    /*
     * Retrieves the current ID
     */
    public function getID()
    {
        return $this->getKey();
    }
    
    /*
     * This function retrieves any value specified from the stickies table
     * 
     * @return String User specified attirbute 
     */
    public function getValue($attribute = 'id')
    {
        
        $sticky_id = $this->getID();

        $query = "SELECT *
                  FROM stickies
                  WHERE id = $sticky_id";

        $result = DB::mysqli()->query($query);

        $content = mysqli_fetch_assoc($result);

        
        return $content[$attribute];
    }
    
    
    
    
}















?>
