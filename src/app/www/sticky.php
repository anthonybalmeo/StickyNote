<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<?php 

//require_once(dirname(dirname(__FILE__))."/lib/controllers/UserController.php");


?>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="../css/sticky.css" rel="stylesheet">
        <link href="../css/bootstrap.css" rel="stylesheet">
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <link href="../css/bootstrap-responsive.css" rel="stylesheet">
        <link href="../css/bootstrap-responsive.min.css" rel="stylesheet">
        
        <script type="text/javascript" src="../js/jquery.js"></script>
        <script type="text/javascript" src="../js/api.js"></script>
        <script type="text/javascript" src="../js/facebook.js"></script>
        <script type="text/javascript" src="../js/app.js"></script>
        <script type="text/javascript" src="../js/bootstrap.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../js/readSticky.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
        
       
    <input type="button" id="button-init" value="init">
        
    </head>
    
<?php

$url="https://rocking-apps.com/sticky/api/sticky/getAllStickies";

$json = file_get_contents($url); $jObj = json_decode($json, TRUE);

var_dump($jObj);
//die();

//echo $data[0]->weather->weatherIconUrl[0]->value;    

?>
    
    <body onload="load()">
    
        <div>
        <ul class="nav nav-tabs">
            <li class="active"><a href="sticky.html">Stickies</a></li>
        </ul>
        </div>
        
        <div class ="container">
            <div class="hero-unit">
              <h1>Sticky Notes</h1>
              <p>View your stickies.</p>


              <!--list of nodes-->
              
             <ul class="thumbnails" id ="sticky_nodes" >
              <li class="span2">
                  <div class="stickyTextArea">
                      <a href="#dialog2" name="modal"><textarea class ="readonly_text" readonly="true" style="background-color:transparent">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea></a>
                  </div>
              </li>
              <li class="span2">
                  <div class="stickyTextArea">
                      <a href="#dialog2" name="modal"><textarea class ="readonly_text" readonly="true" style="background-color:transparent">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea></a>
                  </div>
              </li>
              <li class="span2">
                  <div class="stickyTextArea">
                      <a href="#dialog2" name="modal"><textarea class ="readonly_text" readonly="true" style="background-color:transparent">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea></a>
                  </div>
              </li>                    
              <li class="span2">
                  <div class="stickyTextArea">
                      <a href="#dialog2" name="modal"><textarea class ="readonly_text" readonly="true" style="background-color:transparent">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea></a>
                  </div>
              </li>
              <li class="span2">
                  <div class="stickyTextArea">
                      <a href="#dialog2" name="modal"><textarea class ="readonly_text" readonly="true" style="background-color:transparent">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea></a>
                  </div>
              </li>
              <li class="span2">
                  <div class="stickyTextArea">
                      <a href="#dialog2" name="modal"><textarea class ="readonly_text" readonly="true" style="background-color:transparent">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea></a>
                  </div>
              </li>                   
            </div>                  
            
            <hr>
             <footer>
               <p>&copy; Sticky 2012</p>
             </footer>
        </div>
        


<div id="boxes">

<!-- Start of Sticky Note -->
<div id="dialog2" class="window">
    <header>
        <input type="button" value="x" class="close"/>
    </header>
    <textarea class ="sticky_area" id="txEdit" style="background-color:transparent" readonly="true">This is a sticky testing the fact I am posting a message. Hollah' at me!</textarea>

</div>

<!-- End of Sticky Note -->



<!-- Mask to cover the whole screen -->
  <div id="mask"></div>
</div>
        

        
    <div id="fb-root"></div>
    <script>
        // Load the SDK Asynchronously
        (function(d){
         var js, id = 'facebook-jssdk';
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "https://connect.facebook.net/en_US/all.js";
         d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
    </script>        
        
        
    </body>
    
</html>


