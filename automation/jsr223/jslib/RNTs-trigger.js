// trigger helper
// version 0.2
// ToSe 
//

// to do's:
// 
//

// param:   group of item
// return:  single ItemCommandTrigger array of items what are member of group in param
//
var ItemCommandTriggerGroup = function(groupName) {
  var trigger = [];
  getItem(groupName).getAllMembers().forEach(function(key) {
    trigger.push(ItemCommandTrigger(key.getName()));
  })
  return trigger;
}

// param:   group of item
// return:  single ChangedEventTrigger array of items what are member of group in param
//
var ChangedEventTriggerGroup = function(groupName) {
  var trigger = [];
  getItem(groupName).getAllMembers().forEach(function(key) {
    trigger.push(ChangedEventTrigger(key.getName()));
  })
  return trigger;
}

// param:   dataset with trigger times in the follwoing format - hour:minute
// 
// example of dataset:    var example_timeSet = {
//                          "trigger1": "23:10", 
//                          "nightStart": "23:04", 
//                          "bedTime": "23:02", 
//                        }
// one can define as much as nessesary trigger times
// the key is for human readability  but it must be unique
//
var generateCronTriggerSet = function(triggerPreset) {
  var cronTrigger = []
  var triggerPresetKeys = Object.keys(triggerPreset)
  if (triggerPresetKeys.length != 0 ) {
    var triggerSet =  []
    triggerPresetKeys.forEach(function(key) { triggerSet.push(triggerPreset[key]) })
    triggerSet.sort()          // nessesary, else earlyer triggers will not resolved at first run

    triggerSet.forEach(function(tS) {
      var singleTrigger = tS.split(':')
      // construct the cron expression
      cronTrigger.push(TimerTrigger('0 ' + singleTrigger[1] + ' ' + singleTrigger[0] + ' * * ? *'))
    })
  }
  return cronTrigger
}

// param:   array of trigger
//          each entry can be an array of triggers oder a sinle trigger
// return:  single array of triggers
//
var aggregateTrigger = function(triggerArray) {
  var trigger = []
  if (triggerArray.length > 0) {
    triggerArray.forEach(function(singleTrigger) {
      if (Array.isArray(singleTrigger)) {               // it's dosen't work the i push a complete array to trigger, so i must iterate over the array of triggers to add
        singleTrigger.forEach(function(sTr) { trigger.push(sTr) })
      } else {
        trigger.push(singleTrigger)
      }
    })
  }
  return trigger
}


	

