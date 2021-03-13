'use strict';
var OPENHAB_CONF = Java.type("java.lang.System").getenv("OPENHAB_CONF");  // most this is /etc/openhab2
load(OPENHAB_CONF + '/automation/jsr223/jslib/JSRule.js');
load(OPENHAB_CONF + '/automation/jsr223/jslib/RNTs-trigger.js')


// !!! workoround - trigger on start up with helper item !!!
// this command simulate trigger on startup
// wait 10s befor trigger switch item
// !!! this must be in a single rule as global helper function !!!
//
setTimeout(function() {sendCommand(getItem("Helper_JSR223_SystemIsStarted"), ON)}, 5000)

// for rule deveopment set the line above temporary in the rule- file witch to develop and delete the line when finished