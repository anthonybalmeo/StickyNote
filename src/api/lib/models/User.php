<?php

error_reporting(E_ALL);
ini_set('display_errors','On');

require_once(dirname(dirname(__FILE__)).'/db/DB.class.php');
require_once(dirname(dirname(__FILE__)).'/db/ActiveRecord.class.php');

class User extends ActiveRecord
{
    private $_profile = null;

    public function __construct($user_id = 0, $access_token = null)
    {
        //Call ActiveRecord's constructor.
        parent::__construct('users', $user_id, 'id');

        if(!is_null($access_token)){
            $this->access_token = $access_token;
        }
    }

    /**
     * Returns current user's ID.
     * @return int Current user's ID.
     */
    public function getID(){
        return $this->getKey();
    }

    /**
     * Returns the current user's access token.
     * @return string Current user's access token.
     */
    public function getAccessToken(){
        return $this->access_token;
    }

    /**
     *
     * @return String Returns the first name of the current user.
     */
    public function getFirstName(){
        return (is_null($this->full_name))? "" : substr($this->full_name, 0, strpos($this->full_name, " "));
    }

    /**
     * Returns true if user's basic information can be retreived via the current
     * user ID and access token from Facebook.
     *
     * @return boolean Returns true if user's basic information can be retreived
     *                 via the current user ID and access token.
     */
    public function isValid(){
        return $this->getID() != 0 && !is_null($this->getAccessToken()) && $this->getProfile() != false;
    }

    public function create(){

        if(!$this->exists() && $this->sync())
        {
            $this->create_time = date('Y-m-d H:i:s');

            //Commit to the database.
            return parent::create();
        }

        return false;

    }

    public function save(){
        parent::update();
    }

   /**
     * Syncrhonizes current user's profile with Facebook's content. This method
     * saves updates on the database.
     *
     * @return boolean True/False depending on synchronization success.
     */
    public function update(){

        if($this->sync()){

            //Commit to the database.
            return parent::update();
        }

        return false;
    }

    /**
     * Syncrhonizes current user's profile with Facebook's content. This method
     * does not commit changes to the database.
     *
     * @return boolean True/False depending on synchronization success.
     */
    private function sync(){

        if($this->isValid() === false){
            return false;
        }

        $profile = $this->getProfile();
        $friends = $this->getFriends();

        //Save the user's information.
        $this->full_name    = $profile["name"];
        $this->gender       = $profile["gender"];
        $this->locale       = $profile["locale"];
        $this->email        = (isset($profile["email"]))? $profile["email"]:"";
        $this->active       = true;

        //create_time should be set only if the main operation is create. Sync
        //doesn't really worry about that.
        $this->access_time  = date('Y-m-d H:i:s');

        //Save the number of friends the user has.
        $this->friends_count =  ($friends != false)? count($friends) : 0;

        return true;

    }

    /**
     * Returns an array of user's friends. In case of an error, the method
     * will return false.
     */
    public function getFriends()
    {
        $user_id = $this->getID();

        if($user_id == 0 || $this->getKey() == null){
            return false;
        }

        $facebook = ConfigFactory::getFacebook();

        try
        {
            $friends = $facebook->api("/$user_id/friends");

            if(isset($friends['data'])){
                return $friends['data'];

            } else {
                return false;
            }
        }
        catch(FacebookApiException $ex)
        {
            return false;
        }


    }


    /**
     * Contacts Facebook and retrieves user profile information. Requires a
     * valid user ID and access token. Returns false on any error.
     */
    public function getProfile()
    {
        if($this->_profile != null){
            return $this->_profile;
        }

        $facebook = ConfigFactory::getFacebook();

        $facebook->setAccessToken($this->getAccessToken());

        try{

            $profile = $facebook->api("/" + $this->getID());

            if(isset ($profile['id'])){
                $this->_profile = $profile;
                return $profile;
            }
            else
            {
                return false;
            }

        } catch(FacebookApiException $ex) {

            return false;
        }

    }

    /**
     * Deauthenticates a user - this successful set the user in an
     * inactive state.
     */
    public function deauth(){

        if($this->exists()){
            $this->active = false;

            //Updates the current user without synchronizing with Facebook.
            parent::update();
        }
    }

    /**
     * Returns the number of coins accumulated by the user.
     * @return int The number of coins accumulated by the user.
     */
    public function getCoins()
    {
        $user_id = $this->getID();

        $query = "SELECT coins
                  FROM users
                  WHERE id = $user_id";

        $result = DB::mysqli()->query($query);

        $coins = mysqli_fetch_assoc($result);

        return $coins['coins'];
    }

    public function setCoins($coins){

        $user_id = $this->getID();

        $query = "UPDATE users
                  SET coins = $coins
                  WHERE id = $user_id";

        DB::mysqli()->query($query);
    }

    public function getScores()
    {
        $user_id = $this->getID();

        $query =
            "SELECT categories.score_label label,

                IFNULL((SELECT count(i.id)
                  FROM categories c
                  INNER JOIN item_categories i_c ON i_c.categories_id =  c.id
                  INNER JOIN items i ON i.id = i_c.items_id
                  INNER JOIN sent_items s_i ON s_i.items_id = i.id
                  INNER JOIN users u ON u.id = s_i.sender_id
                  WHERE u.id = $user_id AND c.id =  categories.id
                GROUP BY c.score_label) , 0) as score

            FROM categories";

        $result = DB::mysqli()->query($query);

        $scores = array();

        while($row = mysqli_fetch_assoc($result))
        {
            $scores[] = $row;
        }

        return $scores;
    }

    /**
     * Returns items received by the current user.
     */
    public function getReceivedItems($limit = 30)
    {
        $user_id = $this->getID();

        $query = "SELECT
                         sent_items.items_id as item_id,
                         sent_items.sender_id,
                         sender.full_name as sender_name,
                         sent_items.recepient_id,
                         recepient.full_name as recepient_name,
                         sent_items.publish_date,
                         items.name,
                         items.img_url
                  FROM sent_items

                  INNER JOIN items ON items.id = sent_items.items_id
                  INNER JOIN users as sender ON sender.id = sent_items.sender_id
                  INNER JOIN users as recepient ON recepient.id = sent_items.recepient_id
                  WHERE sent_items.recepient_id = $user_id
                  ORDER BY sent_items.publish_date DESC
                  LIMIT $limit";

        $result = DB::mysqli()->query($query);

        //Stores sent and received items.
        $items = array();

        while($row = mysqli_fetch_assoc($result)) {
            $items[] = $row;
        }

        return $items;

    }

}

?>
