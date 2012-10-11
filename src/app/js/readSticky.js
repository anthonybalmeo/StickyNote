/* 
 * JS FOR READ
 * 
 */

     var load =   function ()
    {         
        var stickyUL = document.getElementById("sticky_nodes");
        var stickyLI = document.createElement("li");
        stickyLI.setAttribute("class", "span2");
        var stickyDIV = document.createElement("div");
        stickyDIV.setAttribute("class", "stickyTextArea");

        var stickyA = document.createElement("a");
        stickyA.setAttribute("href", "#dialog2");
        stickyA.setAttribute("name", "modal");

        var stickytextArea1 = document.createElement("textarea");
        stickytextArea1.setAttribute("class", "readonly_text");
        stickytextArea1.setAttribute("readonly", "true");
        stickytextArea1.setAttribute("style", "background-color:transparent");
        var message = document.createTextNode("hello this is a sample");
        stickytextArea1.appendChild(message);

        stickyA.appendChild(stickytextArea1);
        stickyDIV.appendChild(stickyA);
        stickyLI.appendChild(stickyDIV);
        stickyUL.appendChild(stickyLI);
        
        $(document).ready(function() {	

                //select all the a tag with name equal to modal
                $('a[name=modal]').click(function(e) {
                        //Cancel the link behavior
                        e.preventDefault();

                        //Get the A tag
                        var id = $(this).attr('href');

                        //Get the screen height and width
                        var maskHeight = $(document).height();
                        var maskWidth = $(window).width();

                        //Set heigth and width to mask to fill up the whole screen
                        $('#mask').css({'width':maskWidth,'height':maskHeight});

                        //transition effect		
                        $('#mask').fadeIn(700);	
                        $('#mask').fadeTo("fast",0.8);	

                        //Get the window height and width
                        var winH = $(window).height();
                        var winW = $(window).width();

                        //Set the popup window to center
                        $(id).css('top',  winH/2-$(id).height()/2);
                        $(id).css('left', winW/2-$(id).width()/2);

                        //transition effect
                        $(id).fadeIn(1000); 

                });

                //if close button is clicked
                $('.window .close').click(function (e) {
                        //Cancel the link behavior
                        e.preventDefault();

                        $('#mask').hide();
                        $('.window').hide();
                });		

                //if mask is clicked
                $('#mask').click(function () {
                        $(this).hide();
                        $('.window').hide();
                });			

                $(window).resize(function () {

                        var box = $('#boxes .window');

                //Get the screen height and width
                var maskHeight = $(document).height();
                var maskWidth = $(window).width();

                //Set height and width to mask to fill up the whole screen
                $('#mask').css({'width':maskWidth,'height':maskHeight});

                //Get the window height and width
                var winH = $(window).height();
                var winW = $(window).width();

                //Set the popup window to center
                box.css('top',  winH/2 - box.height()/2);
                box.css('left', winW/2 - box.width()/2);

                });
        });
    }
