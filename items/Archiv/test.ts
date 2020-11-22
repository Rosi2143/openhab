<style>
.icon-tile.colorize {
  filter: invert(45%) sepia(100%) hue-rotate(15deg) saturate(1700%);
-webkit-filter: invert(45%) sepia(100%) hue-rotate(15deg) saturate(1700%);
}
.hue-controller-table {
  width: 100%;
  border-collapse: separate; 
  border-spacing: 8px;
  border: 2px solid #76899e; 
  border-radius: 10px;  
} 
.hue-rounded-border {
  border: 2px solid #76899e; 
  border-radius: 10px;  
}
#dimmer-slider .rz-bubble {
  color: #FFAA00;
}
#dimmer-slider .rz-pointer {
  background-color: #FFAA00;
}
#dimmer-slider .rzslider .rz-bar.rz-selection {
  background-color: #FFAA00;
}
.caret#hue-controller-caret {
  position: absolute;
  left: 95%;
  top: 45%;
  color: white;  
}
.hue-select {
  padding-right: 10px;
}
.action-button#single-button {
  color: #26BF75;
  background-color: rgb(95,95,95);  
  border: 1px solid #565F58;
  overflow: hidden;
  width: 100%;
  border-radius: 5px;
  font-size: 18px;
  font-weight: normal;
}
ul.dropdown-menu#hue-controller-dropdown {
  background-color: rgb(100,100,100);
  text-align: center;
  border: 0px;
  border-radius: 5px;
  width: 100%;
} 
ul.dropdown-menu#hue-controller-dropdown li {
  color: #000;
  border-collapse: separate;
  padding: 5px;
  border-radius: inherit;  
} 
  
</style>

     <div ng-init="sceneMap={
              '81,56,100': 'Normal',
              '5,91,78': 'Savanna Sunset',
              '37,47,48': 'Tropical Twilight', 
              '225,99,53': 'Arctic Aurora', 
              '320,57,84': 'Spring Blossom', 
              '74,78,56': 'Relax', 
              '84,47,100': 'Read', 
              '181,21,100': 'Concentrate', 
              '187,98,100': 'Energize', 
              '82,55,100': 'Bright', 
              '82,55,30': 'Dimmed', 
              '82,55,0': 'Nightlight'
             }" />
<div class="section" ng-init="hueColors = [ { hsb: '0,0,100', hex: '#fff' }, { hsb: '74,78,100', hex: '#fecc2f' }, { hsb: '46,100,100', hex: '#f9a228' }, { hsb: '26,100,100', hex: '#f6621f' }, { hsb: '0,100,100', hex: '#db3838' }, { hsb: '273,100,100', hex: '#a363d9' }, { hsb: '201,100,100', hex: '#40a4d8' }, { hsb: '177,100,100', hex: '#33beb8' }, { hsb: '140,100,100', hex: '#b2c225' } ]">
	<div class="sectionIconContainer"><div class="sectionIcon"><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#light_bulb"></use></svg></div></div>
  <div class="title"><div class="name">Simon</div><div class="summary">ON: {{ ( filtered | filter: { state: 'ON' } ).length }} of {{ ( filtered | filter: { type: 'Color' } ).length }}</div></div>
  <div class="controls">    
  <div ng-repeat="item in itemsInGroup('gLight') | filter:{ type: 'Switch' }">    
 
  <div class="sectionIconContainer"><div class="sectionIcon"><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#light_bulb"></use></svg></div></div>
  <div class="title">
      <div class="name">
        <div class="summary">
            <div class="controls">
                <div class="widget" ng-if="item.type=='Switch' && itemValue(item.name)=='ON'" ng-click="sendCmd(item.name, 'OFF')">
                  <div class="icon on" ><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#on"></use></svg></div>
                  
                  <div class="name">{{item.label}}_______________________________</div>            
                </div>  
            </div>  
            <div class="controls">
                 <div class="widget" ng-if="item.type=='Switch' && itemValue(item.name)=='ON'" ng-click="showHueSelect = !showHueSelect">
                 <div class="icon on"><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#light_bulb"></use></svg></div>
                 <div class="name"><div class="hue" ng-style="{'background': 'rgb(' + itemValue(item.name + '_rgb') + ')'}">
                     </div><div class="hueSelect" ng-init="showHueSelect = false" ng-show="showHueSelect"><div class="hueSelectItem"></div>
                     <div class="hueSelectOptions"><a href="" ng-click="sendCmd(item.name, 'OFF')"><svg viewBox="0 0 48 48" style="stroke: white; stroke-width: 3px;">
                      <use xlink:href="/static/matrix-theme/matrixicons.svg#cross-line"></use></svg></a>
                      <a href="" ng-click="sendCmd(item.name + '_rgb', color.hsb)" ng-repeat="color in hueColors" ng-style="{ 'background': color.hex }"></a>
              </div></div></div></div>
          </div>
          <div class="controls">
               <div class="widget" ng-if="item.type=='Switch' && itemValue(item.name)=='ON'" ng-click="showHueSelect = !showHueSelect">
               <div ng-init="slider = { value: itemValue(item.name + '_dim'), options: { floor: 0, ceil: 100, step: 10, showSelectionBar: true } };">on</div>
               <rzslider rz-slider-model="slider.value" rz-slider-options="slider.options" ng-click="sendCmd(item.name + '_dim', slider.value)"></rzslider>
                 test={{item.name+'_rgb'}} 
                 {{item.label+'_rgb'}} 
               {{item.name+'_rgb'}}.state
                 {{itemValue(item.name + '_dim')}}
                 {{itemValue(item.name + '_rgb')}}
                 {{item.state}}xxxxx

         <table width="100%">
        <tr>
          <td><div style="font-size: 15px; color: #565F58; font-weight: bold;"><u>Scene</u></div></td>
        </tr>
        <tr>
          <td>
            <div style="width: 100%;" class="btn-group" uib-dropdown>
              <button id="single-button" type="button" class="action-button" uib-dropdown-toggle>
                <span id="hue-select">{{sceneMap[itemValue(item.name + '_rgb')]}}</span><span class="caret" id="hue-controller-caret"></span>
                <span id="hue-select" ng-if="sceneMap[itemValue(config.light)]== NULL">UNKNOWN ({{itemValue(item.name + '_rgb')}})</span>
              </button>
              <ul class="dropdown-menu" id="hue-controller-dropdown" uib-dropdown-menu role="menu" aria-labelledby="single-button">
                <li role="menuitem" ng-repeat="(state, label) in {
              '81,56,100': 'Normal',
              '5,91,78': 'Savanna Sunset',
              '37,47,48': 'Tropical Twilight', 
              '225,99,53': 'Arctic Aurora', 
              '320,57,84': 'Spring Blossom', 
              '74,78,56': 'Relax', 
              '84,47,100': 'Read', 
              '181,21,100': 'Concentrate', 
              '187,98,100': 'Energize', 
              '82,55,100': 'Bright', 
              '82,55,30': 'Dimmed', 
              '82,55,0': 'Nightlight'
             }">
                  <a ng-click="sendCmd(item.name + '_rgb', state)">{{label}}</a>
                </li>                
              </ul>
            </div>
          </td>
        </tr>
      </table>    
                 
                 
                 
             </div></div>
          
          <div class="controls">
              <div class="widget" ng-if="item.type=='Switch' && itemValue(item.name)=='OFF'" ng-click="sendCmd(item.name, 'ON')">
              <div class="icon off" ><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#off"></use></svg></div>
              <div class="name">{{item.label}} off</div>
          </div>
          <div class="widget" ng-if="item.type=='Switch' && itemValue(item.name)=='NULL'" ng-click="sendCmd(item.name, 'ON')">
             <div class="icon off" ><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#none"></use></svg></div>
             <div class="name">sw null{{item.label}}</div>
          </div>
     </div>          
  </div>
</div>

<---->comment</---->    
<div class="section" ng-init="hueColors = [ { hsb: '0,0,100', hex: '#fff' }, { hsb: '74,78,100', hex: '#fecc2f' }, { hsb: '46,100,100', hex: '#f9a228' }, { hsb: '26,100,100', hex: '#f6621f' }, { hsb: '0,100,100', hex: '#db3838' }, { hsb: '273,100,100', hex: '#a363d9' }, { hsb: '201,100,100', hex: '#40a4d8' }, { hsb: '177,100,100', hex: '#33beb8' }, { hsb: '140,100,100', hex: '#b2c225' } ]">
	<div class="sectionIconContainer"><div class="sectionIcon"><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#light_bulb"></use></svg></div></div>
  <div class="title"><div class="name">Büro</div><div class="summary">ON: {{ ( filtered | filter: { state: 'ON' } ).length }} of {{ ( filtered | filter: { type: 'Color' } ).length }}</div></div>
  <div class="controls">    
  <div ng-repeat="item2 in itemsInGroup('F2_Bedroom')) | filter:{ type: 'Switch' }">    
 
  <div class="sectionIconContainer"><div class="sectionIcon"><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#light_bulb"></use></svg></div></div>
  <div class="title">
      <div class="name">
        <div class="summary">
            <div class="controls">
                <div class="widget" ng-if="item2.type=='Switch' && itemValue(item2.name)=='ON'" ng-click="sendCmd(item2.name, 'OFF')">
                  <div class="icon on" ><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#on"></use></svg></div>
                  
                  <div class="name">{{item2.label}}_______________________________</div>            
                </div>  
            </div>  
            <div class="controls">
                 <div class="widget" ng-if="item2.type=='Switch' && itemValue(item2.name)=='ON'" ng-click="showHueSelect = !showHueSelect">
                 <div class="icon on"><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#light_bulb"></use></svg></div>
                 <div class="name"><div class="hue" ng-style="{'background': 'rgb(' + itemValue(item2.name + '_rgb') + ')'}">
                     </div><div class="hueSelect" ng-init="showHueSelect = false" ng-show="showHueSelect"><div class="hueSelectItem"></div>
                     <div class="hueSelectOptions"><a href="" ng-click="sendCmd(item2.name, 'OFF')"><svg viewBox="0 0 48 48" style="stroke: white; stroke-width: 3px;">
                      <use xlink:href="/static/matrix-theme/matrixicons.svg#cross-line"></use></svg></a>
                      <a href="" ng-click="sendCmd(item2.name + '_rgb', color.hsb)" ng-repeat="color in hueColors" ng-style="{ 'background': color.hex }"></a>
              </div></div></div></div>
          </div>
          <div class="controls">
               <div class="widget" ng-if="item.type=='Switch' && itemValue(item2.name)=='ON'" ng-click="showHueSelect = !showHueSelect">
               <div ng-init="slider = { value: itemValue(item2.name + '_dim'), options: { floor: 0, ceil: 100, step: 10, showSelectionBar: true } };">on</div>
               <rzslider rz-slider-model="slider.value" rz-slider-options="slider.options" ng-click="sendCmd(item2.name + '_dim', slider.value)"></rzslider>
             </div></div>
          <div class="controls">
              <div class="widget" ng-if="item.type=='Switch' && itemValue(item2.name)=='OFF'" ng-click="sendCmd(item2.name, 'ON')">
              <div class="icon off" ><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#off"></use></svg></div>
              <div class="name">{{item2.label}} off</div>
          </div>
          <div class="widget" ng-if="item.type=='Switch' && itemValue(item2.name)=='NULL'" ng-click="sendCmd(item2.name, 'ON')">
             <div class="icon off" ><svg viewBox="0 0 48 48"><use xlink:href="/static/matrix-theme/matrixicons.svg#none"></use></svg></div>
             <div class="name">sw null{{item2.label}}</div>
          </div>
     </div>          
  </div>
</div>
      

    
  




