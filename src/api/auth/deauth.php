<?php

require_once dirname(dirname(__FILE__)).'/config/ConfigFactory.php';
require_once dirname(dirname(__FILE__)).'/lib/models/User.php';

//Create an application instance.
$facebook = ConfigFactory::getFacebook();

//Get the user ID from the signed request.
$signed_request = $facebook->getSignedRequest();
$user_id = $signed_request['user_id'];

//Set the user to inactive.
$user = new User($user_id);

$user->deauth();

?>