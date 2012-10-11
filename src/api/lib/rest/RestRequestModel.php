<?php

class RestRequestModel {

    /**
     * Object of the MVC architecture.
     */
    private $object;

    /**
     * Action of the MVC architecture.
     */
    private $action;

    /**
     * Combined GET and POST data.
     */
	private $data;

    /**
     * HTTP method i.e. POST/GET.
     */
	private $method;

	public function __construct($object, $action, $method, $data){
        $this->object  = $object;
        $this->action  = $action;
        $this->method  = $method;
        $this->data    = $data;
	}

    /**
     * Checks to see if all the parameter names are included in the parameter list.
     * This method is useful for specifing requirement parameterss for an API call.
     * If one of the specified keys is not in the specified data, a new APIException
     * will be thrown.
     *
     * @param array $param_list A list of keys that have to be in the specified
     *                          associative array.
     */
    public function paramCheck(){
        foreach(func_get_args() as $param){
            if(!isset($this->data[$param]))
                throw new Exception("Parameter [$param] is not set.");
        }
    }

    public function __get($name){
        return isset($this->data[$name])? $this->data[$name] : null;
    }

    public function getObject(){
        return $this->object;
    }

    public function getAction(){
        return $this->action;
    }

    public function getMethod(){
            return $this->method;
	}

    public function getData(){
        return $this->data;
    }

    public static function getCurrentRequest(){

        //Object is a required parameter.
        if(isset($_GET['object'])){
           $object = $_GET['object'];
        }else{
            throw new Exception("[object] not set.");
        }

        //If no action is specified, the object name becomes the action name.
        $action = (isset($_GET['action'])) ? $_GET['action'] : $object;

        $method = strtolower($_SERVER['REQUEST_METHOD']);

        unset($_GET['object']);
        unset($_GET['action']);

        //A merge of $_GET and $_POST.
        $data = array_merge($_GET, $_POST);;

        return new RestRequestModel($object, $action, $method, $data);
    }

}
?>
