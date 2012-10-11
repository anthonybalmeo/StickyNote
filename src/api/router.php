<?PHP
error_reporting(E_ALL);
ini_set('display_errors','On');

require_once("./lib/rest/RestRequestModel.php");
require_once("./lib/rest/RestResponseModel.php");

require_once("./lib/controllers/UserController.php");
require_once("./lib/controllers/StickyController.php");

$objectMap = array(
                    "user"     => "UserController",
                    "sticky"   => "StickyController"
                   );

try {

    $request = RestRequestModel::getCurrentRequest();

    if(!isset($objectMap[$request->getObject()])){
        throw new Exception("Object [".$request->getObject()."] not supported.");
    }

    if(!method_exists($objectMap[$request->getObject()], $request->getAction())){
        throw new Exception("Action [".$request->getAction()."] not supported.");
    }

    $response = call_user_func(array($objectMap[$request->getObject()], $request->getAction()), $request);

    if($response === FALSE){
        throw new Exception("Unknown Exception: [".$request->getAction()."/".$request->getAction()."].");
    }else{
        $response->sendResponse();
    }

//Catch any exceptions thrown while processing the API call.
} catch(Exception $ex){

    $response = new RestResponseModel(null, RestResponseModel::FAILURE_STATUS, $ex->getMessage());
    $response->sendResponse();
}




?>