angular-webpivottable
=====================

Directive to be used with WebPivotTable component.

https://github.com/bright-sea/webpivottable

## Install
```bower install angular-webpivottable```

## Usage

add the module "WebPivotTable-ng" to your module dependencies
create a scope variable containing your CSV
```
$scope.csv = "fetch csv from server side or file";
```

add the directive to your HTML
```html
<div wpt="wptConfig" csv="csv" id="wpt-container" style="height:800px; width:100%;"></div>
```

pass your options

full options: http://webpivottable.com/themes/wpt/quick/index.html?Customizeoptions.html
```javascript
$scope.wptConfig = {
  locale: 'pt',
  uiFlags: {
    menuBtn: 1, // show/hide "Menu" dropdown button : 1/0
    dataSourceBtn: 0, // show/hide "DataSource" dropdown button : 1/0
    languageSwitchBtn: 0, // show/hide "Language Switch" dropdown button: 1/0
    helpBtn: 0, // show/hide "Help" button: 1/0
    aboutBtn: 0
  },
  decimalPoint: ',',
  thousandsSep: '.',
  chart: {
    width: null
  }
};
```
