<?php

class RestResponseModel {

    const SUCCESS_STATUS = 'success';
    const FAILURE_STATUS = 'failure';

    private $status;

    private $data;

    private $message;

    public function __construct($response = null, $status = RestResponseModel::SUCCESS_STATUS, $message = null){
        $this->status = $status;
        $this->data = $response;
        $this->message = $message;
    }

    public function sendResponse(){

        header('Content-type: application/json');

        $response = array();

        $response['status'] = $this->status;

        if(isset($this->data)){
            $response['data'] = $this->data;
        }

        if(isset($this->message)){
            $response['message'] = $this->message;
        }

        echo json_encode($response);

    }

    public function setResponseData($data){
        $this->data = $data;
    }

    public function setStatus($status){
        $this->status = $status;
    }

    public function setMessage($message){
        $this->message = $message;
    }
}

?>
