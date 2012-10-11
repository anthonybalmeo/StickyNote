
(function(){
    
    console.log("Content script running.");
    
    function getKey(callback){
        
        var regex1 = /^https?:\/\/www.facebook.com\/profile.php\?id=(\d*)$/;
        var regex2 = /^https?:\/\/www.facebook.com\/([a-zA-Z\.]*)$/;

        var match1, match2, key = null;

        match1 = window.location.href.match(regex1);
        match2 = window.location.href.match(regex2);

        if(match1 && match1.length){
            key = match1[1];
            
            callback(key);
            
        }else if(match2 && match2.length){
            key = key || match2[1];
            
            console.log("About to convert.")
            
            chrome.extension.sendRequest({message   : "convert", key:key}, function(response) {
                console.log("received message back");
                callback(response.id);
            });
    
        }
    }
    
    
    var hideBar = function(){
        $("#blueBar").fadeToggle(1000); 
    };
    
    var barrelRoll = function(){
        $('body').addClass('barrel_roll');
        setTimeout("$('body').removeClass('barrel_roll')", 4000);
    }
    
    

    $(window).bind("keydown", function(e){
            
        var value = String.fromCharCode(e.keyCode);
        
        if(e.shiftKey){
            switch(value){
            case 'H':
                hideBar();
                break;
            case 'B':
                barrelRoll();
                break;
            default:
                break;
            }
        }
        
        
    });
    
 
    var processPage = function(key){
        
        var app = new Application();
        
        app.getAPI().Sticky.getAllStickies(key, function(response){
            
            if(response.status == 'success'){
                var data = response.data;
                
                var startX = 400;
                var startY = 100;
                
                for(var i = 0; i < data.length; i++){
                    new Stick(data[i].content, data[i].id, data[i].recipient_key, startX + 200 * i, startY);
                    
                }
            }
        });
    
        if(!sessionStorage.init){

            chrome.extension.sendRequest({message: "getSession"}, function(response) {

                app.setSession(response.session);

                app.init(function(successful){
                    sessionStorage.init = successful;
                });

            }); 
        }
        
        $(window).bind("mousedown", function(e){

           if(e.shiftKey){
               
               new Stick("", 123 , 1234 , e.pageX , e.pageY, function(message){
                   app.getAPI().Sticky.create(message, key, function(){
                       console.log('Sticky saved!');
                   });
               });
               
           }

        });
    };
    
    getKey(function(key){
        
        if(!key){
            console.log("No key found!");
            return;
        }else{
            processPage(key);
        }
        
        
    });
    


    

    
})();