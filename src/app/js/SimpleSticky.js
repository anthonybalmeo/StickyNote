/**
 * Class for a Sticky Stickie.
 *
 */
 

 var State =function(){this.TextEditing=false;}

var InputEvent={INPUT_UP:0, INPUT_DOWN: 1, INPUT_MOVE: 2, INPUT_OVER:3, INPUT_OUT:4, CLICK:5};

var Device={PC:0, iOS:1, ANDROID:2};

var captured = null;
var highestZ = 0;
 /**var highestId = 0;

  * Each sticky must be assigned to a unique uid (User ID). Only that user can modify the sticky. Think of a sticky like a Comment.
  */
 
var SimpleSticky =  function SimpleSticky(message, id, key, x, y)
 {
     console.log('hello');


     self =this;
     
	 this.id=id;
         
         this.key = key;
         
         var sticky = document.createElement('div');
	 
         sticky.className = 'sticky';

         sticky.style.left =x+'px';
         
         console.log(sticky.style.left);
         
	 sticky.style.top =y+'px';
	
	 
	 

         
    
        sticky.addEventListener('click', function() { return self.onStickyClick() }, false);

        this.sticky = sticky;

        var close = document.createElement('div');
        close.className = 'closebutton';
        close.addEventListener('click', function(event) { return self.close(event) }, false);

        this.closeButton=close;

        var drag = document.createElement('div');
        drag.className = 'dragbutton';
	 
	//deviceManager.addEventListener(drag, InputEvent.INPUT_DOWN, function(e) { return self.onTouchStart(e) }, false);


	drag.addEventListener('mousedown', function(e) { return self.onMouseDown(e) }, false);

	 
	
	 var editFieldContainer=document.createElement('div');
	 editFieldContainer.className="edit-container";
	 
	 var tb=document.createElement("div");
	 tb.contentEditable=true;
	 tb.className="edit";
	
	 this.editField=tb;
	 this.editField.id="edit_"+Math.random()*100;
	 	
	
	 editFieldContainer.appendChild(this.editField);
	 editFieldContainer.id="editContainer_"+Math.random()*100;
         
	 sticky.appendChild(editFieldContainer);
	
	 
	 var clear=document.createElement("div");
	 clear.className="clear";
	 	 
	 //var grippie=this.grippie();
	 //this._grippie=grippie;

	 
	 //sticky.appendChild(grippie);
	
	 
	 var ts = document.createElement('div');
	 ts.className = 'timestamp';
	 
         
	ts.addEventListener('mousedown', function(e) { return self.onMouseDown(e) }, false);
	 
	 //grippie.appendChild(ts);
	 this.lastModified = ts;
	
	 sticky.appendChild(clear);
	 
	 this.stickyColor='rgb(255, 240, 70)';
	 
	 
	 sticky.addEventListener('click', function(e){self.onStickyClick();},false);
	 
	 
	 
	 sticky.appendChild(drag);
         
	 //if(uid==userManager.userID)
	 //{
         tb.addEventListener('keyup', function(ev) { return self.onKeyUp(ev) }, false);
    	 
         sticky.appendChild(close);
		
	 
	 
	 document.body.appendChild(sticky);	 
	 	 
 };
 
 

SimpleSticky.prototype.getid =function()
{

    return this.id;
};
 
    SimpleSticky.prototype.setid= function(x)
    {
        this.id = x;
	
    };
	
    SimpleSticky.prototype.getkey= function()
    {
            return this.key;
    };
    
    SimpleSticky.prototype.setkey= function(k)
    {
            this.key = k;
    };

 
    SimpleSticky.prototype.gettext=function()
    {
        return this.editField.innerHTML;
    };
 
    SimpleSticky.prototype.settext=function(x)
    {
        this.editField.innerHTML = x;
    };
	
    /**
        * DOM representation of the STICKY.
        */
    SimpleSticky.prototype.getcontent=function()
    {
            return this.sticky;	
    };

SimpleSticky.prototype.getleft=function()
    {
        return this.sticky.style.left;
    };
 
    SimpleSticky.prototype.setleft=function(x)
    {
        this.sticky.style.left = x;
    };
    
    SimpleSticky.prototype.gettop=function()
    {
        return this.sticky.style.top;
    };
 
    SimpleSticky.prototype.settop=function(x)
    {
        this.sticky.style.top = x;
    },
 
 
    SimpleSticky.prototype.getzIndex=function()
    {
        return this.sticky.style.zIndex;
    },
 
    SimpleSticky.prototype.setzIndex=function(x)
    {
        this.sticky.style.zIndex = x;
    };
	
	SimpleSticky.prototype.getstickyColor=function()
	{
		return this.sticky.style.backgroundColor;
	};
	
	SimpleSticky.prototype.setstickyColor=function(color)
	{
		this.sticky.style.backgroundColor=color;		
	};
 

        
        SimpleSticky.prototype.close= function()
    {
		
 		
		
        var sticky = this;
		
		/*if(db!=null)
		{
			db.transaction(function(tx)
			{	//local delete.
				tx.executeSql("DELETE FROM WebKitStickyStickys WHERE id = ?", [sticky.id]);
			});
		}else
		{
			//cloud delete.
			var stickyCommand={type:ActionEnum.STICKY, id:this.id, alive:"false"};
			communicationManager.updateSticky(stickyCommand);
		}*/
		
		this.remove(); //remove from stage.
        
		
     
    };
	
	SimpleSticky.prototype.remove= function()
	{
		var self = this;
                
                //TODO
		//stickyManager.removeSticky(this);
                //this.cancelPendingSave();
		
		//if(deviceManager.isWebkit() && !deviceManager.isiOS())
		//{
		/*	var duration =.25; //if shift click - slow motion animation.
			if(event!=null && event.shiftKey)
			{
				duration=2;
			}
		
			this.sticky.style.webkitTransition = '-webkit-transform ' + duration + 's ease-in, opacity ' + duration + 's ease-in';
			this.sticky.offsetTop; // Force style recalc
			this.sticky.style.webkitTransformOrigin = "0 0";
			this.sticky.style.webkitTransform = 'skew(30deg, 0deg) scale(0)';
			this.sticky.style.opacity = '0';
	 
			
			
			
			//setTimeout(function() { document.body.removeChild(self.sticky) }, duration * 1000);
		}else
		{*/
			try
			{
				document.body.removeChild(self.sticky);
			}catch(e)
			{
				
			}
		//}
		
	};
        
        
        
    SimpleSticky.prototype.onMouseDown= function(e)
    {
        captured = this;
        
        this.startX = e.clientX - this.sticky.offsetLeft;
        this.startY = e.clientY - this.sticky.offsetTop;
        this.zIndex = ++highestZ;
 
        var self = this;
        //if (!("mouseMoveHandler" in this)) {
            this.mouseMoveHandler = function(e) { return self.onMouseMove(e) }
            this.mouseUpHandler = function(e) { return self.onMouseUp(e) }
        //}
        //    this.mouseMoveHandler = function(e) { return self.onMouseMove(e) }
          //  this.mouseUpHandler = function(e) { return self.onMouseUp(e) }
        //document.addEventListener('mousemove', this.mouseMoveHandler, true);
        //document.addEventListener('mouseup', this.mouseUpHandler, true);
 
        return false;
    
    };
	
        
        SimpleSticky.prototype.onInputDown=function(ev)
	{
		var position=deviceManager.getPosition(ev);
                
        captured = this;
        
        this.startX = position[0] - this.sticky.offsetLeft;
        this.startY = position[1] - this.sticky.offsetTop;
        this.zIndex = ++highestZ;
 
        var self = this;
    
 		//deviceManager.addEventListener(document, InputEvent.INPUT_MOVE, function(ev){self.onInputMove(ev);}, false);
		//deviceManager.addEventListener(document, InputEvent.INPUT_UP, function(ev){self.onInputUp(ev);}, false);

 
        return false;
		
	},
	
	SimpleSticky.prototype.onInputMove= function(ev)  //dragging
	{
            //if (this != captured)
            //return true;
 
            this.left = e.clientX - this.startX + 'px';
            this.top = e.clientY - this.startY + 'px';
            return false;
		
	},
	
	SimpleSticky.prototype.onInputUp=function(ev)
	{
		
		
	},
	
        SimpleSticky.prototype.onTouchStart= function(e)
        {
		//var posi//stage.FingerDocument(e);
                
            captured = this;
            this.startX = this.sticky.style.left ;//- */ //this.sticky.offsetLeft;
            this.startY = this.sticky.style.top ;//-*/ //this.sticky.offsetTop;
            this.zIndex = ++highestZ;

            var self = this;
            //if (!("touchMoveHandler" in this)) {
                this.touchMoveHandler = function(e) { return self.onTouchMove(e) }
                this.touchEndHandler = function(e) { return self.onTouchEnd(e) }
            //}

            //document.addEventListener('touchmove', this.touchMoveHandler, true);
            //document.addEventListener('touchend', this.touchEndHandler, true);

            return false;
    };
 
    SimpleSticky.prototype.onMouseMove= function(e)
    {
        
        
        console.log('CAPTURED ' + captured);
        
        //if (this != captured)
          //  return true;
 
        this.left = e.clientX - this.startX + 'px';
        console.log('left is '+this.left);
        
        this.top = e.clientY - this.startY + 'px';
        console.log('top is '+this.top);
        
        this.sticky.style.top = this.top;
        this.sticky.style.left = this.left ;
        
        return false;
    };
	
	SimpleSticky.prototype.onTouchMove= function(e)
    {
		//
                //
                //e.preventDefault();
		
        //if (this != captured)
          //  return true;
 
 		//var position= sticky.style.left// stage.FingerDocument(e);
                
        //this.left = this.sticky.style.left /*position.x*/ - this.startX + 'px';
        //this.top = /*position.y*/ this.sticky.style.top-  this.startY + 'px';
        
        //console.log('left is '+left);
        //console.log('top is '+top);
        
        return false;
    };
 
    SimpleSticky.prototype.onMouseUp= function(e)
    {
        //document.removeEventListener('mousemove', this.mouseMoveHandler, true);
        //document.removeEventListener('mouseup', this.mouseUpHandler, true);
 
 	//if(this._uid==userManager.userID) 
        //this.save();
        return false;
    };
	
	 SimpleSticky.prototype.onTouchEnd=function(e)
    {
        //document.removeEventListener('touchmove', this.touchMoveHandler, true);
        //document.removeEventListener('touchend', this.touchEndHandler, true);
 
       //if(this._uid==userManager.userID)  this.save();
        return false;
    };
 
    SimpleSticky.prototype.onStickyClick= function(e)
    {
		//document.removeEventListener('touchmove', this.touchMoveHandler, true);
                //document.removeEventListener('touchend', this.touchEndHandler, true);
 
                //if(this._uid==userManager.userID)  this.save();
                    
                return false;
      //  getSelection().collapseToEnd();
    };
 
    SimpleSticky.prototype.onKeyUp= function(ev)
    {
                
		if(ev.which==27)
		{
			this.close();	
		}else
		{
			this.dirty = true;
			//this.saveSoon();
		}
    };
	
	SimpleSticky.prototype.onTransparentClick= function()
	{
		this.stickyColor="rgba(255,255,255,0)";
	};
	
	SimpleSticky.prototype.onYellowClick= function()
	{
		this.stickyColor="rgb(255, 240, 70)";
	};
	
	SimpleSticky.prototype.onGreenClick= function()
	{
		this.stickyColor="#B0E8C7";
	};
	