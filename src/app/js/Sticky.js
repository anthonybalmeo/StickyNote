/**
 * Class for a Sticky Stickie.
 *
 */
 

 

var captured = null;
var highestZ = 0;
 /**var highestId = 0;

  * Each sticky must be assigned to a unique uid (User ID). Only that user can modify the sticky. Think of a sticky like a Comment.
  */
var Sticky =  function Sticky(message, id, key, x, y)
 {


         var self =this;
	 this.uid=id;
         
         this.key = key;
         
         
         
         sticky.style.left=x;
	 sticky.style.top=y;
	
	 
	 var sticky = document.createElement('div');
	 

         sticky.className = 'sticky';

    
        sticky.addEventListener('click', function() { return self.onStickyClick() }, false);
	
     this.sticky = sticky;
	 
	 var close = document.createElement('div');
     close.className = 'closebutton';
     close.addEventListener('click', function(event) { return self.close(event) }, false);
	 
	 this.closeButton=close;
	 
	 var drag = document.createElement('div');
     drag.className = 'dragbutton';
	 
	// deviceManager.addEventListener(drag, InputEvent.INPUT_DOWN, function(e) { return self.onTouchStart(e) }, false);

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
	 	 
	 var grippie=this.grippie();
	 this._grippie=grippie;

	 
	 sticky.appendChild(grippie);
	
	
	 var ts = document.createElement('div');
	 ts.className = 'timestamp';
	 
         
	ts.addEventListener('mousedown', function(e) { return self.onMouseDown(e) }, false);
	 
	 grippie.appendChild(ts);
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



Sticky.prototype = {
	
    get id()
    {
        
        return this.id;
    },
 
    set id(x)
    {
        this.id = x;
	this.editField.id='editField_'+x;
		
    },
	
    get key()
    {
            return this.key;
    },
    
    set key(k)
    {
            this.key = k;
    },

 
    get text()
    {
        return this.editField.innerHTML;
    },
 
    set text(x)
    {
        this.editField.innerHTML = x;
    },
	
	/**
	 * DOM representation of the STICKY.
	 */
	get content()
	{
		return this.sticky;	
	},
	
    
 
    /*get timestamp()
    {
        if (!("_timestamp" in this))
            this._timestamp = 0;
        return this._timestamp;
    },*/
 
 	/**
	 *
	 *@param indicate if update is local or from cloud.
	 */
    /*set timestamp(x)
    {
        if (this._timestamp == x)
            return;

        this._timestamp = x;
        var date = new Date();
        date.setTime(parseFloat(x));
		
		var user=userManager.getUserById(this._uid);
		this.lastModified.textContent = user.firstName+" on "+ calendar.getFormatedTime();
		
    },
	
	setCloudTimestamp:function(x)
	{
		if (this._timestamp == x)
            return;

        this._timestamp = x;
		var user=userManager.getUserById(this._uid);
		this.lastModified.textContent = user.firstName+" on "+ x;
	},*/
 
    get left()
    {
        return this.sticky.style.left;
    },
 
    set left(x)
    {
        this.sticky.style.left = x;
    },
	
	/*get fontSize()
	{
		return this.fontSizeSelector.selectedIndex;
	},
	
	set fontSize(index)
	{
		this.fontSizeSelector.selectedIndex=index;
	},
	
	get fontFamily()
	{
		return this.fontSelector.selectedIndex;
	},
	
	set fontFamily(index)
	{
		this.fontSelector.selectedIndex=index;
	},*/
    get top()
    {
        return this.sticky.style.top;
    },
 
    set top(x)
    {
        this.sticky.style.top = x;
    },
 
 
    get zIndex()
    {
        return this.sticky.style.zIndex;
    },
 
    set zIndex(x)
    {
        this.sticky.style.zIndex = x;
    },
	
	get stickyColor()
	{
		return this.sticky.style.backgroundColor;
	},
	
	set stickyColor(color)
	{
		this.sticky.style.backgroundColor=color;		
	},
	
	
	grippie: function()
	{
		 var self=this;
		 var grippie=document.createElement("div");
		 grippie.className="sticky_grippie";
		
		 //set up colors.
		 var transparent=document.createElement("div");
		 transparent.className="cp_transparent";
		 transparent.addEventListener("click", function(event) { return self.onTransparentClick(event) }, false);
		 
		 var yellow=document.createElement("div");
		 yellow.className="cp_yellow";
		 yellow.addEventListener("click", function(event) { return self.onYellowClick(event) }, false);
		 
		 var green=document.createElement("div");
		 green.className="cp_green";
		 green.addEventListener("click", function(event) { return self.onGreenClick(event) }, false);
		
		 
		 var fontSelector=document.createElement('select');
		 fontSelector.className='sticky_font';
		 addOption(fontSelector, 'Arial', 'Arial, Helvetica, sans-serif');
		 addOption(fontSelector, 'Verdana', 'Verdana, Geneva, sans-serif');
		 addOption(fontSelector, 'Tahoma', 'Tahoma, Geneva, sans-serif');
		 addOption(fontSelector, 'Arial Black', 'Arial Black, Gadget, sans-serif');
		 fontSelector.selectedIndex=3;
		 fontSelector.addEventListener('change',  function() { return self.onFontChange() }, false);
		 this.fontSelector=fontSelector;
		 
		 
		 var fontSizeSelector=document.createElement("select");
		 fontSizeSelector.className="sticky_fontSize";
		 
		 addOption(fontSizeSelector, '10px', '10px');
		 addOption(fontSizeSelector, '12px', '12px');
		 addOption(fontSizeSelector, '14px', '14px');
		 addOption(fontSizeSelector, '16px', '16px');
		 addOption(fontSizeSelector, '18px', '18px');
		 addOption(fontSizeSelector, '20px', '20px');
		 fontSizeSelector.selectedIndex=2;
		 
		 fontSizeSelector.addEventListener('change',  function() { return self.onFontSizeChange() }, false);
		 this.fontSizeSelector=fontSizeSelector;
		 
		 
		 if(!deviceManager.isWebkit() || deviceManager.isiOS())
		 {
			 fontSelector.addEventListener('focus', function(e){self.editField.disabled=true;},false);
			 fontSelector.addEventListener('blur', function(e){self.editField.disabled=false;},false);
			 fontSizeSelector.addEventListener('focus', function(e){self.editField.disabled=true;},false);
			 fontSizeSelector.addEventListener('blur', function(e){self.editField.disabled=false;},false);
			 transparent.addEventListener('mousedown', function(e){self.editField.disabled=true;},false);
			 transparent.addEventListener('mouseup', function(e){setTimeout(function() { self.editField.disabled=false; }, 10);},false);
			 green.addEventListener('mousedown', function(e){self.editField.disabled=true;},false);
			 green.addEventListener('mouseup', function(e){setTimeout(function() { self.editField.disabled=false; }, 10);},false);
			 yellow.addEventListener('mousedown', function(e){self.editField.disabled=true;},false);
			 yellow.addEventListener('mouseup', function(e){setTimeout(function() { self.editField.disabled=false; }, 10);},false);
			 this.closeButton.addEventListener('mousedown', function(e){self.editField.disabled=true;},false);
			
			 
		 }
		 
		 if(this._uid==userManager.userID)
		 {
			 grippie.appendChild(transparent);
			 grippie.appendChild(yellow);
			 grippie.appendChild(green);
			 grippie.appendChild(fontSelector);
			 grippie.appendChild(fontSizeSelector);
		 }
		
		 return grippie;		
	},
	
	enableField: function(e)
	{
			var self=this;
			self.editField.disabled=false;
			window.removeEventListener('click', function(e){self.disableField(e);},false);
			
	},
 
    close: function()
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
        
		
     
    },
	
	remove: function()
	{
		var self = this;
                
		stickyManager.removeSticky(this);
                this.cancelPendingSave();
		
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
		
	},
 
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

 
    onMouseDown: function(e)
    {
        captured = this;
        this.startX = e.clientX - this.sticky.offsetLeft;
        this.startY = e.clientY - this.sticky.offsetTop;
        this.zIndex = ++highestZ;
 
        var self = this;
        /*if (!("mouseMoveHandler" in this)) {
            this.mouseMoveHandler = function(e) { return self.onMouseMove(e) }
            this.mouseUpHandler = function(e) { return self.onMouseUp(e) }
        }*/
 
        //document.addEventListener('mousemove', this.mouseMoveHandler, true);
        //document.addEventListener('mouseup', this.mouseUpHandler, true);
 
        return false;
    },
	onInputDown:function(ev)
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
	
	onInputMove: function(ev)  //dragging
	{
		 if (this != captured)
            return true;
 
            this.left = e.clientX - this.startX + 'px';
            this.top = e.clientY - this.startY + 'px';
            return false;
		
	},
	
	onInputUp:function(ev)
	{
		
		
	},
	onTouchStart: function(e)
        {
		var position=stage.FingerDocument(e);
            captured = this;
            this.startX = position.x - this.sticky.offsetLeft;
            this.startY = position.y - this.sticky.offsetTop;
            this.zIndex = ++highestZ;

            var self = this;
            /*if (!("touchMoveHandler" in this)) {
                this.touchMoveHandler = function(e) { return self.onTouchMove(e) }
                this.touchEndHandler = function(e) { return self.onTouchEnd(e) }
            }*/

            //document.addEventListener('touchmove', this.touchMoveHandler, true);
            //document.addEventListener('touchend', this.touchEndHandler, true);

            return false;
    },
 
    onMouseMove: function(e)
    {
        if (this != captured)
            return true;
 
        this.left = e.clientX - this.startX + 'px';
        this.top = e.clientY - this.startY + 'px';
        return false;
    },
	
	onTouchMove: function(e)
    {
		e.preventDefault();
		
        if (this != captured)
            return true;
 
 		var position=stage.FingerDocument(e);
        this.left = position.x - this.startX + 'px';
        this.top = position.y - this.startY + 'px';
        return false;
    },
 
    onMouseUp: function(e)
    {
        //document.removeEventListener('mousemove', this.mouseMoveHandler, true);
        //document.removeEventListener('mouseup', this.mouseUpHandler, true);
 
 		if(this._uid==userManager.userID) this.save();
        return false;
    },
	
	 onTouchEnd: function(e)
    {
        document.removeEventListener('touchmove', this.touchMoveHandler, true);
        document.removeEventListener('touchend', this.touchEndHandler, true);
 
       if(this._uid==userManager.userID)  this.save();
        return false;
    },
 
    onStickyClick: function(e)
    {
		State.TextEditing=true;
                this.editField.focus();
		this.editField.onblur=function(){State.TextEditing=false;};
		
      //  getSelection().collapseToEnd();
    },
 
    onKeyUp: function(ev)
    {
		if(ev.which==27)
		{
			this.close();	
		}else
		{
			this.dirty = true;
			this.saveSoon();
		}
    },
	
	onTransparentClick: function()
	{
		this.stickyColor="rgba(255,255,255,0)";
	},
	
	onYellowClick: function()
	{
		this.stickyColor="rgb(255, 240, 70)";
	},
	
	onGreenClick: function()
	{
		this.stickyColor="#B0E8C7";
	},
	
	onFontChange: function()
	{
		
		var selection=this.fontSelector.value;
		this.editField.style.fontFamily=selection;
  	},
	
	
	
	onFontSizeChange: function()
	{
	
		var size=this.fontSizeSelector.value;
		
		if(this.fontSize>size)
		{
			this.editField.style.fontSize=size;
		}else
		{
			this.editField.style.fontSize=size;
			this.autoResize();
		}

		
	},
	
	onFieldResize: function()
	{
	}
}
 
/*function loaded()
{
	if(db!=null)
 	{
		db.transaction(function(tx) {
			tx.executeSql("SELECT COUNT(*) FROM WebkitStickyStickys", [], function(result) {
				loadStickys();
			}, function(tx, error) {
				tx.executeSql("CREATE TABLE WebKitStickyStickys (id REAL UNIQUE, sticky TEXT, timestamp REAL, left TEXT, top TEXT, zindex REAL)", [], function(result) { 
					loadStickys(); 
				});
			});
		});
	}
}
 
function loadStickys()
{
	if(db!=null)
	{
		db.transaction(function(tx) {
			tx.executeSql("SELECT id, sticky, timestamp, left, top, zindex FROM WebKitStickyStickys", [], function(tx, result) {
				for (var i = 0; i < result.rows.length; ++i) {
					var row = result.rows.item(i);
					var sticky = new Sticky();
						sticky.id = row['id'];	
					sticky.text = row['sticky'];
					sticky.timestamp = row['timestamp'];
					sticky.left = row['left'];
					sticky.top = row['top'];
					sticky.zIndex = row['zindex'];
					sticky.autoResize();
	 
					if (row['id'] > highestId)
						highestId = row['id'];
					if (row['zindex'] > highestZ)
						highestZ = row['zindex'];
				}
			
	 
				if (!result.rows.length)
					newSticky();
			}, function(tx, error) {
				alert('Failed to retrieve stickys from database - ' + error.message);
				return;
			});
		});
	}else
	{
		//load from cloud here.
		
	
		
	}
	
}*/

//<SECTION> HELPER FUNCTIONS.

 //helper function to add options in a select dropdown box.
 /*function addOption(selectbox,text,value )
 {
	var optn = document.createElement("option");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
 }
 
 
 //helper function insures minimum length of number is 2.
function appendZero(number)
{
	
	number=number.toString();
	
	if(number.length==1)
	{
		number='0'+number;
	}
	return number;
}


 
if (db != null)
    addEventListener('load', loaded, false);*/
 
 