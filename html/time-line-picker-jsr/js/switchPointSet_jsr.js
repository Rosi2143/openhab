// timeline/ timepicker control
// version 2.0.1
// ToSe 

//////////////////////////////////////////////////////////////////////////////////////

Vue.component('time-scale',{
  template: '<div @mouseup="mouseLeftUp()"><div class="day"><div class="scale"><div class="unit" v-for="(i,index) in _range()" @mousedown="mouseLeftDown(i)" @mouseover="mouseMove(i)" :style="{background: scaleColors[initValue[indexLine][i]], width: scaleSegmentWidth}"><div class="one" :class="{lineR: (i+1) % 4 == 0, lineL: i == 0}"></div><div class="two" :class="{lineR: (i+1) % 2 == 0, lineL: i == 0}"></div><div class="three" :class="{lineL: i == 0}"></div><div class="three" :class="{lineL: i == 1}" :style="{background: _eventBackground(i)}"></div></div></div></div></div>',
  data: function() {
    return {
      mouseLeftPressed: false
    }   
  },
  props: {
    indexLine: "",
    zoomFactor: { type: Number },
    currTime: { type: Number },
    currSwitchstate: 0,
    eventMode: {
      type: Boolean,
      default: true,
    },
    scaleColors: {
      type: Array,
      default: function() { return [] }
    },
    initValue: {
      type: Object,
      default: function() { return {} }
    }
  },
  computed: {
    scaleSegmentWidth: function() {
      return ('calc(100% / 96 * ' + this.zoomFactor + ')')
    }
  },
  methods: {
     mouseMove(index) {
      if (this.mouseLeftPressed) {
        let setState = (this.eventMode && (this.currSwitchstate == 0)) ? -1 : this.currSwitchstate
        Vue.set(this.initValue[this.indexLine], index, setState)
      }
    },
    mouseLeftDown(index) {
      this.mouseLeftPressed = true
      let setState = (this.eventMode && (this.currSwitchstate == 0)) ? -1 : this.currSwitchstate
      Vue.set(this.initValue[this.indexLine], index, setState)
    },
    mouseLeftUp() {
        this.mouseLeftPressed = false
    },
    _eventBackground: function(index) {
      if (this.initValue[this.indexLine][index] == (-1)) return (this.scaleColors[0])
    },
    _range : function() {
      let start = (this.currTime - (24 / this.zoomFactor/2))
      if (start < 0) start = 0
      if ((start + (24 / this.zoomFactor)) > 24) start = (24 - (24 / this.zoomFactor))
      start = start * 4
      let diff = 96 / this.zoomFactor
      return Array(diff).fill().map((_, idx) => start + idx)
    }
  }
})

Vue.component('tl-inactive',{
  template:'<div id="overlayDisable"><div id="overlayDisableContent"><div>{{line1}}</div><div id="reactivate" class="activation" @click="reactivate"><div>{{line2}}</div></div></div></div>',
  data: function() {
    return {
      line1: '',
      line2: ''
    }
  },
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  created: function() {
    this.line1 = prefs.languages[this.lang].inactive.line1
    this.line2 = prefs.languages[this.lang].inactive.line2
  },
  methods: {
    reactivate() {
      this.$emit('click')
    }
  }
})

new Vue({
  el: '#app',
  data: () => ({
    device: '',                   // variables for presentation zoom slider and slider for shift timeintervall in sitemap
    orientation: 'portrait',      //
    zoomVisible: false,           //
    zoomForced: 'auto',           // 
    zoomFactor: 0,                //
    currTime:  12,                //
    initValue: {},                // buffer for data structure
    yAxis: [],
    yAxisLabel: [],
    timeScale: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    urlParamItemName: '',
    secPrompt: false,             // security prompt befor switch points will changed
    ip: '',
    switchStates: [],
    currSwitchstate: 0,
    scaleValueColors: [],
    stateParam: ',',
    statesChanged: 0,             // 0 .. not changed, 1 .. changed, 2 .. error
    daySetError: false,
    eventMode: false,
    darkMode: false,
    currLang: 'en',               // default language: en
    line3: '',
    line6: '',
    line7: '',
    line8: '',
    line9: '',
    line10: '',
    line11: '',
    line12: '',
    line13: '',
    line14: '',
    line15: '',
    tl_active: true,              // timeline active = true
    deactivation: false,          // switch for activation/deactivation visible
    debounceTimer: null           // debonce timer for activation/deactivation
  }),
  computed: {
    zoomFactor1: function() {
      return (this.zoomFactor == 0) ? 1 : this.zoomFactor * 3
    },
    currTime1: function() {
      return this.currTime * 1
    },
    currTimeScale: function() {
      let startIndex = this.currTime - (24 /this.zoomFactor1 / 2)
      if (startIndex < 0) startIndex = 0
      if ((startIndex + (24 / this.zoomFactor1)) > 24) startIndex = (24 - (24 / this.zoomFactor1))
      let endIndex = startIndex + (24 /this.zoomFactor1)
      return this.timeScale.filter((val,index) => ((this.zoomFactor1 == 1) && (index % 2 == 0)) || ((this.zoomFactor1 != 1) && ((index >= startIndex) && (index <= endIndex))))
    },
    xAxisTimeScale: function() {
      let calculatedLabel = ((this.device == 'Mobile') && (this.orientation == 'portrait')) ? this.timeScale.filter((val,index) => (index % 4 == 0)) : this.timeScale.filter((val,index) => (index % 2 == 0))
      return calculatedLabel
    }
  },
  created() {
    // mapping url parameter and prework
    let urlParams = new URLSearchParams(window.location.search)
    this.yAxis = (urlParams.get('yAxisLabel') != null) ? urlParams.get('yAxisLabel').split(',') : ["1","2","3","4","5","6","7"]
    let openHAB_ip = urlParams.get('ip')
    this.urlParamItemName = urlParams.get('transferItem')
    this.deactivation = ((urlParams.get('deactivation') != null) && (urlParams.get('deactivation') == 'true')) ? true : false
    
    // set language then selected else default: en
    if (urlParams.get('lang') != null) this.currLang = urlParams.get('lang')
    this.currLang = (prefs.languages[this.currLang] == undefined) ? 'en' : this.currLang
    this.line3 = prefs.languages[this.currLang].inactive.line3
    this.line6 = prefs.languages[this.currLang].inactive.line6
    this.line7 = prefs.languages[this.currLang].inactive.line7
    this.line8 = prefs.languages[this.currLang].inactive.line8
    this.line9 = prefs.languages[this.currLang].inactive.line9
    this.line10 = prefs.languages[this.currLang].inactive.line10
    this.line11 = prefs.languages[this.currLang].inactive.line11
    this.line12 = prefs.languages[this.currLang].inactive.line12
    this.line13 = prefs.languages[this.currLang].inactive.line13
    this.line14 = prefs.languages[this.currLang].inactive.line14
    this.line15 = prefs.languages[this.currLang].inactive.line15
    
    // switch states
    this.stateParam = urlParams.get('states')
    if (this.stateParam == null) this.stateParam = 'OFF,ON'                                           // set default states values OFF,ON
    this.switchStates = this.stateParam.split(',')
    if (this.switchStates.length > 5) this.switchStates.splice(6, this.switchStates.length - 6)       // when more then five states passed -> cancel from position six
    
    // check user defined colorset or select one of the predefined colorsets or set user defined colors
    this.scaleValueColors = prefs.colorsets["1"]                                                      // select default colorset
    let colorSet = urlParams.get('colorset')
    if (colorSet != null) {                                                                           // check if url parameter used
      let csArray = colorSet.split(',')
      // check if selected an predefined colorset (lenght = 1) or userdefined colorset (lenght > 1)
      if (csArray.length > 1) {
        if (urlParams.get('event') != 'yes') csArray.unshift('#000')                                  // check is event inactive then set #000 as dummy
        csArray.forEach( (color, i) => {
          if (i < this.scaleValueColors.length) this.scaleValueColors[i] = '#' + color
        })
      } else {
        // check is selected colorset not empty and exist key in prefs
        if (csArray[0] != "" && (csArray[0] in prefs.colorsets)) this.scaleValueColors = prefs.colorsets[csArray[0]]
      }
    }

    // select event trigger
    if (urlParams.get('event') == 'yes') {
      this.eventMode = true
      this.switchStates.unshift('manuell')                                                            // add manuell as state; note: there are max 5 user defined states
    } else {
      this.scaleValueColors.shift()                                                                   // event mode no -> remove the predefined color for manual mode
    }
    this.switchStatesCount = this.switchStates.length
    
    // check dark mode
    this.darkMode = (urlParams.get('dark') == 'yes') ? true : false

    // check zoom parameter
    let zoom = urlParams.get('zoom')
    if (zoom == 'no') this.zoomForced = 'no'
    if (zoom == 'force') this.zoomForced = 'force'
    
    this.ip = 'http://' + openHAB_ip + '/rest/'

    // check selected days for valid values, duplicates and ordering
    if (this.yAxis.every(el => { return ["1","2","3","4","5","6","7","15","17","67"].includes(el) })) {
      this.yAxis = (this.yAxis.includes("17")) ? ["17"] : [...new Set(this.yAxis)].sort()
      if (this.yAxis.includes("15") && !(this.yAxis.every(el => { return ["6","7","15"].includes(el) }) || (this.yAxis.every(el => { return ["67","15"].includes(el) })))) this.daySetError = true
      if (this.yAxis.includes("67") && !(this.yAxis.every(el => { return ["1","2","3","4","5","67"].includes(el) }) || (this.yAxis.every(el => { return ["15","67"].includes(el) })))) this.daySetError = true
    } else {
      this.daySetError = true
    }

    // set label for y axis and note the language select; default is english
    let yLabel = this._selectLang(this.currLang)
    this.yAxis.forEach((el,i) => {
      switch (el) {
        case "17":  {
          this.yAxisLabel.push(yLabel[0])
          break
        }
        case "15": {
          this.yAxisLabel.push(yLabel[1])
          break
        }
        case "67": {
          this.yAxisLabel.push(yLabel[9])
          break
        }
        default: this.yAxisLabel.push(yLabel[parseInt(el) + 1])
      }
    })

    // init for initValue, because the delay from promise throws error while rendering
    for ( let i of this.yAxis) {
      Vue.set(this.initValue, i, this._initArray(96))
    }

    Vue.set(this.initValue, "config", {
      "mode": this.yAxis,
      "states": this.switchStates,
      "event": this.eventMode,
      "lastItemState": -1,
      "active": true
    })

    this.$http.get(this.ip + 'items/' + this.urlParamItemName + '/state').then(response => {
      if ((typeof response.body === 'object') && (response.status === 200)) {
        // check inital call
        // check integrity switchStates
        if (response.body["config"] != undefined) {
          let storedStates = response.body["config"]["states"]
          if ((storedStates.length != this.switchStates.length) || !(storedStates.every(el => {return this.switchStates.includes(el)}))) this.statesChanged = 1       // check if y-axis changed 1/2
          if (storedStates.every(el => {return response.body[el] != undefined})) this.statesChanged = 1                                                               // check if y-axis changed 2/2
          let storedModes = response.body["config"]["mode"]     
          if ((storedModes.length != this.yAxis.length) || !(storedModes.every(el => {return this.yAxis.includes(el)}))) this.statesChanged = 1                       // check if mode changed 1/2
          if (storedStates.every(el => {return response.body[el] != undefined})) this.statesChanged = 1                                                               // check if mode changed 2/2
          if ((response.body["config"]["event"] != this.eventMode)) this.statesChanged = 1                                                                            // check integrity of event parameter 
          this.tl_active = (response.body["config"]["active"] == false) ? false : true                                                                                // check state of active
          this.initValue["config"]["active"] = this.tl_active
        } else {
          // new timeline detected
          this.statesChanged = 1
        }
        if (this.statesChanged == 0) this._initValueArray(response.body)
      } else {
        console.log('warn in API call; transfered data is empty or not valid')
      }
    }, response => {
      console.log('error in API request to openHAB')
    })
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.screenChanged)
      this.screenChanged()                                      //Init
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screenChanged)
  },
  methods: {
    _initArray(n) {
      var arr = []
      for(let i = 0; i < n; i++) arr.push(this.eventMode ? -1 : 0)
      return arr
    },
    _initValueArray(responseBody) {
      for ( let i of this.yAxis) {
        Vue.set(this.initValue, i, (typeof responseBody[i] !== 'undefined') ? responseBody[i] : this._initArray(96))
      }
    },
    firstInitValueArray() {
      this.statesChanged = 0
    },
    stateChangedAbort() {
      this.statesChanged = 2
    },
    // set color is active
    setCurrentSwitchState(key) {
      this.currSwitchstate = key
    },
    setInterval() {
      this.secPrompt = true
    },
    saveInterval() {
      this.$http.post(this.ip + 'items/' + this.urlParamItemName,  JSON.stringify(this.initValue), {'headers': {"Accept": "application/json","content-type": "text/plain"}}).then(response => {
        console.log(response.status,response.statusText)
      }, response => {
      // error callback
      console.log(response)
      })
      this.secPrompt = false
    },
    abort() {
      this.secPrompt = false
    },
    toggleDisable() {
      this.tl_active = !this.tl_active
      if (this.debounceTimer != null) clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(this._debounceTimerFunc, 2000)
    },
    _debounceTimerFunc() {
      if (this.tl_active != this.initValue["config"]["active"]) {
        this.initValue["config"]["active"] = this.tl_active
        this.saveInterval()
      }
      this.debounceTimer = null
    },
    _selectLang(lang) {
      return (prefs.languages[lang] == undefined) ? prefs.languages["en"].yLabel : prefs.languages[lang].yLabel
    },
    screenChanged(event) {
      //this.screenWidth = document.documentElement.clientWidth;
      //this.screen Height = document.documentElement.clientWidth;
      
      // recognize device type
      if(navigator.userAgent.match(/mobile/i)) {
        this.device = 'Mobile'
      } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
        this.device = 'Tablet'
      } else {
        this.device = 'Desktop'
      }
      // set zoom variables for presentation in sitemap
      this.zoomVisible = ((this.device != 'Desktop') && (this.zoomForced != 'no')) ? true : false
      if (this.zoomForced == 'force') this.zoomVisible = true  

      // recognize device orientation
      if (window.matchMedia("(orientation: portrait)").matches) {
        this.orientation = 'portrait' 
      }
      if (window.matchMedia("(orientation: landscape)").matches) {
        this.orientation = 'landscape' 
      }
    }
  }
})