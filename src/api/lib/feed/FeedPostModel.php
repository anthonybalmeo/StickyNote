<?php

error_reporting(E_ALL);
ini_set('display_errors','On');

/**
 * Description of FeedModel
 *
 * @author Zorayr Khalapyan
 */
class FeedPostModel
{

    private $_message = null;
    private $_name = null;
    private $_link = null;
    private $_caption = null;
    private $_description = null;
    private $_picture = null;
    private $_actions = null;

    public function __construct($link){
        $this->setLink($link);
    }

    public function setMessage($message){
        $this->_message = $message;
    }

    public function setName($name){
        $this->_name = $name;
    }

    public function setLink($link){
        $this->_link = urldecode($link);
    }

    public function setCaption($caption){
        $this->_caption = $caption;
    }

    public function setDescription($description){
        $this->_description = $description;
    }

    public function setPicture($picture){
        $this->_picture = $picture;
    }

    public function setAction($name, $link){
        $this->_actions = array("name" => $name, "link" => urldecode($link));
    }

    public function getAttachment($access_token){

        if(!isset($this->_link)){
            return null;
        }

        $attachment = array();

        if($access_token){
            $attachment['access_token'] = $access_token;
        }

        $attachment['link'] = $this->_link;

        if($this->_message)
            $attachment['message'] = $this->_message;

        if($this->_name)
            $attachment['name'] = $this->_name;

        if($this->_caption)
            $attachment['caption'] = $this->_caption;

        if($this->_description)
            $attachment['description'] = $this->_description;

        if($this->_picture)
            $attachment['picture'] = $this->_picture;

        if($this->_actions)
            $attachment['actions'] = json_encode($this->_actions);


        return $attachment;



    }

}

?>
