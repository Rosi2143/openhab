rule "TRADFRI on/off switch (IK1)"
when
   Channel 'deconz:switch:5c6cc3c3:14b457fffe6f78c2011000:buttonevent' triggered 
then
    var actionName = receivedEvent.getEvent()
    
    val autoModeItem     = FF_LuTh_Color as GenericItem
    val autoModeItem_rgb = FF_LuTh_Color_rgb as GenericItem
    var TextString       = "TRADFRI on/off switch (IK1)"
    
    switch(actionName) {
        case "1002": {	
            logInfo(TextString, "case 1002, 1 pressed")
            if (autoModeItem.state==ON){  autoModeItem_rgb.sendCommand("0,0,0") }
            if (autoModeItem.state==OFF){ autoModeItem_rgb.sendCommand("0,0,70") 
            	}
        }
        case "2002": {	
            logInfo(TextString, "case 2002, O pressed")
            if (autoModeItem.state==ON){  autoModeItem_rgb.sendCommand("0,0,0") }
            if (autoModeItem.state==OFF){ autoModeItem_rgb.sendCommand("0,0,70") 
            	}
        }
    }  
end
