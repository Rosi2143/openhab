// timeline/ timepicker control
// version 2.0.2
// ToSe 
//

// to do's:
// 
//

'use strict';
var OPENHAB_CONF = Java.type("java.lang.System").getenv("OPENHAB_CONF")             // most this is /etc/openhab2
load(OPENHAB_CONF + '/automation/jsr223/jslib/JSRule.js')
load(OPENHAB_CONF + '/automation/jsr223/jslib/RNTs-trigger.js')
load(OPENHAB_CONF + '/automation/jsr223/conf/00_RNTs-timelinepicker_conf.js')       // load all personaly config


var previousStates = {}                                  // nessesary for event mode and restoring previous state

JSRule({
  name: "RNTs - timelinepicker",
  description: "timelinepicker",
  triggers: aggregateTrigger([
    TimerTrigger("0 0/15 * 1/1 * ? *"),                                             // run every 15 minutes
    // TimerTrigger("0/15 * * ? * * *"),                                               // run every 15 seconds, for debug only
    ChangedEventTriggerGroup("gTimepicker"),
    ItemStateChangeTrigger("Helper_JSR223_SystemIsStarted","","ON")                 // trigger for system startup with helper item
  ]),
  execute: function( module, input){
    // logInfo("------------ jsr223 timeline picker -------------")

    // calculate minutes since midnight & day of week
    var d0 = new Date(), d1 = new Date(d0)
    var msSinceMidnight = d1 - d0.setHours(0,0,0,0)
    var currTimeInterval = Math.floor(msSinceMidnight / 60000 / 15)

    getItem("gTimepicker").getAllMembers().forEach(function(currSwitchPlan) {
      if ((currSwitchPlan.state !== NULL) && (timePicker[currSwitchPlan.name] != undefined)) {
        var switchPlan = JSON.parse(currSwitchPlan.state)
        if (switchPlan["config"]["active"]) {                                                               // check if timeline deactivated
          
          var currDay = d0.getDay()
          if (currDay == 0) currDay = 7 
          if (switchPlan["17"] != undefined) currDay = 17
          if ((switchPlan["15"] != undefined) && (currDay != "6") && (currDay != "7")) currDay = 15
          if ((switchPlan["67"] != undefined) && ((currDay == "6") || (currDay == "7"))) currDay = 67

          var switchPlanOfDay = switchPlan[currDay]
          var itemToSwitch = timePicker[currSwitchPlan.name].split(",")
          var switchStates = switchPlan["config"]["states"]
          var event = switchPlan["config"]["event"]
          var newStateIndex = switchPlanOfDay[currTimeInterval]
          var newState = newStateIndex != -1 ? switchStates[newStateIndex] : undefined

          itemToSwitch.forEach(function(iTS) {
            if (event) {
              if ((newStateIndex != -1) && (previousStates[iTS] == undefined)) previousStates[iTS] = getItem(iTS).state
              if ((newStateIndex == -1) && (previousStates[iTS] != undefined)) {
                newState = previousStates[iTS]
                previousStates[iTS] = undefined
              }
            }

            if ((newState != undefined) && (getItem(iTS).state != newState)) {
              sendCommand(getItem(iTS), newState)
            }
          })
        }
      }
    })
  }
})