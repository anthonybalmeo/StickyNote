/**
 * Class for a Sticky Stickie.
 *
 */
 

  var State ={TextEditing:false};


var captured = null;
var highestZ = 0;
 /**var highestId = 0;

  * Each sticky must be assigned to a unique uid (User ID). Only that user can modify the sticky. Think of a sticky like a Comment.
  */
var Stick = function Stick(message, id, key, x, y, callback)
 {
         var sself = this;
         var self =this;
	 this.uid=id;
         
         this.key = key;
         
         var sticky = document.createElement('div');
         
     
         
         sticky.style.left=x+'px';
	 sticky.style.top=y+'px';
	 
	 
         sticky.className = 'sticky';

    
        sticky.addEventListener('click', function() { return self.onStickyClick() }, false);
	
        this.sticky = sticky;
	 
	 var close = document.createElement('div');
         
        close.className = 'closebutton';
        close.addEventListener('click', function(event) { return self.close(event) }, false);
	 
	 this.closeButton=close;
	 
	 var drag = document.createElement('div');
         drag.className = 'dragbutton'; 

         drag.addEventListener('mousedown', function(e) { return self.onMouseDown(e) }, false);

	
	 var editFieldContainer=document.createElement('div');
	 editFieldContainer.className="edit-container";
         
     
        this.setLeft = function(x)
        {
            this.sticky.style.left = x;
        };

        this.setTop = function(y)
        {
            this.sticky.style.left = y;
        };
	
	 
	 var tb=document.createElement("div");
	 tb.contentEditable=true;
	 tb.className="edit";
	
	 this.editField=tb;
         this.editField.innerHTML = message;
	 this.editField.id="edit_"+Math.random()*100;
	 	
         $(this.editField).blur(function(){
            callback(tb.innerHTML); 
         });
	
	 editFieldContainer.appendChild(this.editField);
	 editFieldContainer.id="editContainer_"+Math.random()*100;
         
	 sticky.appendChild(editFieldContainer);
	
	 
	 var clear=document.createElement("div");
	 clear.className="clear";

	
	
	 var ts = document.createElement('div');
	 ts.className = 'timestamp';
	 
         
	ts.addEventListener('mousedown', function(e) { return self.onMouseDown(e) }, false);
	 
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
	 

     return this;

 }




Stick.prototype.getid =function()
{

    return this.id;
};
 
    Stick.prototype.setid= function(x)
    {
        this.id = x;
	
    };
	
    Stick.prototype.getkey= function()
    {
            return this.key;
    };
    
    Stick.prototype.setkey= function(k)
    {
            this.key = k;
    };

 
    Stick.prototype.gettext=function()
    {
        return this.editField.innerHTML;
    };
 
    Stick.prototype.settext=function(x)
    {
        this.editField.innerHTML = x;
    };
	
    /**
        * DOM representation of the STICKY.
        */
    Stick.prototype.getcontent=function()
    {
            return this.sticky;	
    };

Stick.prototype.getleft=function()
    {
        return this.sticky.style.left;
    };
 
    Stick.prototype.setleft=function(x)
    {
        this.sticky.style.left = x;
    };
    
    Stick.prototype.gettop=function()
    {
        return this.sticky.style.top;
    };
 
    Stick.prototype.settop=function(x)
    {
        this.sticky.style.top = x;
    },
 
 
    Stick.prototype.getzIndex=function()
    {
        return this.sticky.style.zIndex;
    },
 
    Stick.prototype.setzIndex=function(x)
    {
        this.sticky.style.zIndex = x;
    };
	
	Stick.prototype.getstickyColor=function()
	{
		return this.sticky.style.backgroundColor;
	};
	
	Stick.prototype.setstickyColor=function(color)
	{
		this.sticky.style.backgroundColor=color;		
	};
 

        
        Stick.prototype.close= function()
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
	
	Stick.prototype.remove= function()
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
    /* saveSoon: function()
    {
        this.cancelPendingSave();
        var self = this;
        this._saveTimer = setTimeout(function() { self.save() }, 200);
    },
 
    cancelPendingSave: function()
    {
        if (!("_saveTimer" in this))
            return;
        clearTimeout(this._saveTimer);
        delete this._saveTimer;
    },
 
    save: function()
    {
			
        this.cancelPendingSave();
 
        if ("dirty" in this) {
            this.timestamp = new Date().getTime();
            delete this.dirty;
        }
 
        var sticky = this;
		
		//save to cloud here.
		var stickyCommand=new StickyCommand(this.text, this.left,this.top, this.stickyColor , this.fontFamily ,
										this.fontSize, this.timestamp, userManager.userID, documentManager.docID);
										
		//alert('cloud save');
										
		stickyCommand.id=this.id;
		stickyCommand.alive="true";
		var self=this;
		  //submits updated sticky to cloud.
		communicationManager.updateSticky(stickyCommand);
	 
		
		
		
		
						
										
    },
 
    saveAsNew: function(id, ts)
    {
		var self=this;
        this.timestamp = new Date().getTime();
        
        var sticky = this;
		var stickyCommand=new StickyCommand(this.text, this.left,this.top, this.stickyColor , this.fontFamily ,
										this.fontSize, this.timestamp, userManager.userID, documentManager.docID);
										
		
		//submits updated sticky to cloud.
		//var cloudObj=communicationManager.updateSticky(stickyCommand);	
		self.id=id;
		currentTimestamp=cloudObj.timestamp;
		stickyManager.addSticky(self);
    },*/

 
    /*Stick.prototype.saveSoon=function()
    {
        this.cancelPendingSave();
        var self = this;
        this._saveTimer = setTimeout(function() { self.save() }, 200);
    };
 
    Stick.prototype.cancelPendingSave= function()
    {
        if (!("_saveTimer" in this))
            return;
        clearTimeout(this._saveTimer);
        delete this._saveTimer;
    };
 
    Stick.prototype.save= function()
    {
			
        this.cancelPendingSave();
 
        if ("dirty" in this) {
            this.timestamp = new Date().getTime();
            delete this.dirty;
        }
 
        var sticky = this;
		
		//save to cloud here.
		var stickyCommand=new StickyCommand(this.text, this.left,this.top, this.stickyColor , this.fontFamily ,
										this.fontSize, this.timestamp, userManager.userID, documentManager.docID);
										
		//alert('cloud save');
										
		stickyCommand.id=this.id;
		stickyCommand.alive="true";
		var self=this;
		  //submits updated sticky to cloud.
		communicationManager.updateSticky(stickyCommand);
	 
		
		
		
		
						
										
    };
 
    Stick.prototype.saveAsNew= function(id, ts)
    {
		var self=this;
        this.timestamp = new Date().getTime();
        
        var sticky = this;
		var stickyCommand=new StickyCommand(this.text, this.left,this.top, this.stickyColor , this.fontFamily ,
										this.fontSize, this.timestamp, userManager.userID, documentManager.docID);
										
		
		//submits updated sticky to cloud.
		//var cloudObj=communicationManager.updateSticky(stickyCommand);	
		self.id=id;
		currentTimestamp=cloudObj.timestamp;
		stickyManager.addSticky(self);
    };*/

 
    Stick.prototype.onMouseDown= function(e)
    {
        captured = this;
        this.startX = e.clientX - this.sticky.offsetLeft;
        this.startY = e.clientY - this.sticky.offsetTop;
        this.zIndex = ++highestZ;
 
        var self = this;
        
        if (!("mouseMoveHandler" in this)) {
            this.mouseMoveHandler = function(e) { return self.onMouseMove(e) }
            this.mouseUpHandler = function(e) { return self.onMouseUp(e) }
        }
 
        document.addEventListener('mousemove', this.mouseMoveHandler, true);
        document.addEventListener('mouseup', this.mouseUpHandler, true);
 
        return false;
    };


    Stick.prototype.onInputDown=function(ev)
	{
		//var position=deviceManager.getPosition(ev);
        captured = this;
        
        
        //this.startX = position[0] - this.sticky.offsetLeft;f
        //this.startY = position[1] - this.sticky.offsetTop;
        
        this.startX = this.sticky.style.top - this.sticky.offsetLeft;
        this.startY =this.sticky.style.Left - this.sticky.offsetTop;
        
        this.zIndex = ++highestZ;
 
        var self = this;
    
 		//deviceManager.addEventListener(document, InputEvent.INPUT_MOVE, function(ev){self.onInputMove(ev);}, false);
		//deviceManager.addEventListener(document, InputEvent.INPUT_UP, function(ev){self.onInputUp(ev);}, false);

 
        return false;
		
	};
	
	Stick.prototype.onInputMove= function(ev)  //dragging
	{
		 if (this != captured)
            return true;
 
        this.left = e.clientX - this.startX + 'px';
        this.top = e.clientY - this.startY + 'px';
        return false;
		
	};
	
	Stick.prototype.onInputUp=function(ev)
	{
		
		
	};
	Stick.prototype.onTouchStart= function(e)
    {
		var position=stage.FingerDocument(e);
        captured = this;
        this.startX = position.x - this.sticky.offsetLeft;
        this.startY = position.y - this.sticky.offsetTop;
        this.zIndex = ++highestZ;
 
        var self = this;
        if (!("touchMoveHandler" in this)) {
            this.touchMoveHandler = function(e) { return self.onTouchMove(e) }
            this.touchEndHandler = function(e) { return self.onTouchEnd(e) }
        }
 
        //document.addEventListener('touchmove', this.touchMoveHandler, true);
        //document.addEventListener('touchend', this.touchEndHandler, true);
 
        return false;
    };
 
    Stick.prototype.onMouseMove = function(e)
    {
        if (this != captured)
            return true;
        console.log(e);
        console.log(e.srcElement);
 
        this.left = e.clientX - this.startX + 'px';
        this.top = e.clientY - this.startY + 'px';
        console.log(self);
        
        //this.setLeft( this.left);
        //this.setTop( this.top);
        
        
        this.sticky.style.top = e.clientY;
        
        console.log(e.clientY);
        
        this.sticky.style.left = e.clientX;
        
        console.log(self);
        
        console.log(e.clientX);
        
        return false;
    };
	
	Stick.prototype.onTouchMove= function(e)
    {
		e.preventDefault();
		
        if (this != captured)
            return true;
 
 		var position=stage.FingerDocument(e);
        this.left = position.x - this.startX + 'px';
        this.top = position.y - this.startY + 'px';
        
        //self.sticky.style.top = this.top;
        //self.sticky.style.left = this.left;
        //console.log('here');
        return false;
    };
 
    Stick.prototype.onMouseUp=function(e)
    {
        document.removeEventListener('mousemove', this.mouseMoveHandler, true);
        document.removeEventListener('mouseup', this.mouseUpHandler, true);
 
 	//	if(this._uid==userManager.userID) this.save();
        return false;
    };
	
	 Stick.prototype.onTouchEnd= function(e)
    {
        document.removeEventListener('touchmove', this.touchMoveHandler, true);
        document.removeEventListener('touchend', this.touchEndHandler, true);
 
       //if(this._uid==userManager.userID)  this.save();
        return false;
    };
 
    Stick.prototype.onStickyClick= function(e)
    {
		State.TextEditing=true;
        this.editField.focus();
		this.editField.onblur=function(){State.TextEditing=false;};
		
      //  getSelection().collapseToEnd();
    };
 
    Stick.prototype.onKeyUp= function(ev)
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
	