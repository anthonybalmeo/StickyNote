/**
 * Determines what kind of device is being used by the user.
 * Sets up the environment for the appropriate device.
 *
 */
 

 
 
function DeviceManager()
{
 	this.deviceName= navigator.userAgent;
	
	if(this.isiOS())
	{
		this.device=Device.iOS;
	}else if(this.isAndroid())
	{
		this.device=Device.ANDROID;
	}else
	{
		this.device=Device.PC;	
	}

};
 
	
	DeviceManager.prototype.isiOS=function()
	{
		return (new RegExp( "iPhone|iPad|iPod", "i" )).test(navigator.userAgent);
	};
	
	DeviceManager.prototype.isAndroid=function()
	{
		return (new RegExp( "Android", "i" )).test(navigator.userAgent);
	};
	
	DeviceManager.prototype.isWebkit= function()
	{
		return (new RegExp( "Webkit", "i" )).test(navigator.userAgent);
	};
	
	DeviceManager.prototype.isMobile=function()
	{
		return (new RegExp( "iPhone|iPad|iPod|Android|Nokia|Blackberry", "i" )).test(navigator.userAgent);
		
	};
	
	DeviceManager.prototype.getPosition=function(ev)
	{
		if(this.isiOS())
		{
			return this.fingerPosition(ev);	
		}else
		{
			return this.mousePosition(ev);
		}
		
	};
	
	
	/**
	  * Returns an Object with X and Y coordinates of the Mouse during the Event relative to the Stage.
	  *
	  *@param ev MouseEvent.
	  */
	DeviceManager.prototype.mousePosition=function(ev)
	{
		var x, y;
		// Get the mouse position relative to the canvas element.
		if (ev.layerX || ev.layerX == 0) { // Firefox
			x = ev.layerX;
			y = ev.layerY;
		
		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
			x = ev.offsetX;
			y = ev.offsetY;
		}
		return [x,y]; 
	};
		
	DeviceManager.prototype.fingerPosition=function(ev)
	{
		var x, y;
		x =  ev.targetTouches[0].pageX;
		y = ev.targetTouches[0].pageY;	
		return [x,y]; 
	};
	
	/**
	 * Replaces addEventListener of DOM. Adapts for Device
	 *
	 *@param event:InputEvent 
	 *@param callback anonymous function to callback.
	 *@useCapture Use capture or bubbling? see Henri's Article on JS Events
	 *
	 *@author Henri-Charles Machalani
	 *@version 0.33
	 *@date February 16 2011
	 */
	DeviceManager.prototype.addEventListener= function(caller, event, callback, useCapture)
	{
		var click, down, up, move, over, out;
		click='click';
		
		switch(this.device)
		{
			case Device.iOS:
				down='touchstart';
				up='touchend';
				over='touchmove'; //TODO: add logic to simulate a mouseover.
				out='touchmove';//TODO: add logic to simulate a mouseout.
				move='touchmove';
				break;
				
				
			case Device.PC:
				down='mousedown';
				up='mouseup';
				over='mouseover';
				out='mouseout'; 
				move='mousemove';
				break;
			
		}
		switch(event)
		{
			case InputEvent.CLICK:
				caller.addEventListener(click, callback, useCapture);
				break;
			
			case InputEvent.INPUT_DOWN:
				caller.addEventListener(down, callback, useCapture);
				break;
						
			case InputEvent.INPUT_MOVE:
				caller.addEventListener(move, callback, useCapture);
				break;
	
						
			case InputEvent.INPUT_OUT:
				if(this.isIOS())
					break; //TODO: implement mouseout for iOS
				
				caller.addEventListener(out, callback, useCapture);			
				break;
					
			case InputEvent.INPUT_OVER:
				if(this.isIOS())
					break; //TODO: implement mouseover for iOS
				caller.addEventListener(over, callback, useCapture);
				break;

			case InputEvent.INPUT_UP:
				caller.addEventListener(up, callback, useCapture);
				break;
		}
				
			
	
		
		
		
	};
	
	DeviceManager.prototype.removeActionListeners= function(page)
	{
		var canvas=page.permCanvas;
		if(this.isiOS() )
		{
			//remove current event listeners.
			canvas.removeEventListener('touchstart', function(ev){ page.onInputStart(ev); });
			canvas.removeEventListener('touchend', function(ev) {page.onInputEnd(ev);});
			canvas.removeEventListener('gesturestart', function(ev){page.onGestureStart(ev); });		
		}else 
		{
			canvas.removeEventListener('mousedown', function(ev){ page.onInputDown(ev); });
			window.removeEventListener('mouseup', function(ev){page.onInputUp(ev); });			
		}
		
		this.actionsPaused=true;
		
	};
	
	
	DeviceManager.prototype.addActionListeners=function(page)
	{
		var canvas=page.tempCanvas;
		if(this.isiOS())
		{
			canvas.addEventListener('touchstart', function(ev){ page.onInputStart(ev);});
			canvas.addEventListener('touchend', function(ev) {page.onInputEnd(ev);});
			canvas.addEventListener('gesturestart',function(ev){page.onGestureStart(ev); });	
								
		}else 
		{
			canvas.addEventListener('mousedown',function(ev){ page.onInputDown(ev); }, true);
			window.addEventListener('mouseup', function(ev){page.onInputUp(ev); }, true);		
		}
		
		this.actionsPaused=false;
		
	};