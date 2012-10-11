<?php

error_reporting(E_ALL);
ini_set('display_errors','On');

require_once(dirname(dirname(__FILE__))."/models/User.php");

define("MAX_BATCH_REQUESTS", "20");

/**
 * Description of FeedProcessor
 *
 * @author Zorayr Khalapyan
 */
class FeedPostProcessor {

    /**
     * Facebook instance for this feed processor.
     *
     * @var Facebook
     */
    private $_facebook;

    /**
     * Post model.
     *
     * @var FeedPostModel
     */
    private $_feedPostModel;

    /**
     * Represents an array of users.
     *
     * @var array
     */
    private $_users;

    public function __construct($facebook = null, $feedPostModel = null, $users = array()){
        $this->_facebook      = $facebook;
        $this->_feedPostModel = $feedPostModel;
        $this->_users         = $users;
    }


    public function setFeedPost($feedModel){
        $this->_feedModel = $feedModel;
    }

    public function setUsers($users){
        $this->_users = $users;
    }

    function post($access_token = null){

        //This array holds the next batch of API calls.
        $batch_requests = array();

        //Store the batch users' IDs to later store the responses.
        $batch_user_ids = array();

        //Iterate through each retrieved user and create a batch request.
        //If the numbe of batch request exceeds maximum number of allowed
        //batch requests then proceed to make the API call.
        for($i = 0; $i < count($this->_users); $i++){

            $user = $this->_users[$i];

            $attachment = $this->_feedPostModel->getAttachment(($access_token != null)? $access_token : $user->getAccessToken());

            $batch_requests[] = array(
                                    'method'       => 'POST',
                                    'relative_url' => $user->getID()."/feed",
                                    'body'         => urlencode(http_build_query($attachment))
                                     );

            $batch_user_ids[] = $user->getID();

            //Process the batch either if the batch maximum size has been exceeded or there
            //are no more users to process.
            if(count($batch_requests) == MAX_BATCH_REQUESTS || $i == count($this->_users) - 1){


                $this->process_batch_post_request($batch_user_ids,
                                                  $batch_requests);

                //Reset the batch arrays.
                $batch_requests = array();
                $batch_user_ids = array();
            }
        }


    }

   /**
    *
    * @param type $batch_user_ids
    * @param type $batch_requests
    * @param type $repeat_on_error
    *
    * @return int The number of succesful wall posts.
    */
    private function process_batch_post_request($batch_user_ids, $batch_requests, $repeat_on_error = false){

        try {

            $ret_code = $result = $this->_facebook->api('/?batch='.json_encode($batch_requests), 'POST');

        } catch(Exception $ex) {

            var_dump($ex);
            if($repeat_on_error){
                $result = $this->process_batch_post_request($batch_user_ids, $batch_requests, false);
            }
            return 0;
        }

        //Counts the number of successful wall posts.
        $post_counter = 0;

        for($i = 0; $i < count($ret_code); $i++)
        {

            $decoded_body = json_decode($ret_code[$i]["body"]);

            $user_id = $batch_user_ids[$i];
            $post_id = isset($decoded_body->id)? $decoded_body->id : NULL;


            $success = isset($decoded_body->error) ? false : true;


            //Handle successful wall post.
            if($success){

                //Increment the number of successful wall posts.
                $post_counter++;

            //Handle error wall post.
            } else {
                $error_msg = ($success)? "" : $decoded_body->error->type."-".$decoded_body->error->message;
            }

        }


        return $post_counter;


    }

}

?>
