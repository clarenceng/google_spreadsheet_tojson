var finalData = '';

// add menu to toolbar
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    {name: "Choose columns", functionName: "doGet"},
  ];
  ss.addMenu("Export JSON", menuEntries);
}

// grabs the html file and allows it to run inline code
function doGet() {    
  var html = HtmlService
      .createTemplateFromFile('json')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Exporting JSON');
}

// get Titles of columns
function getColumnTitles() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var titles = data[0];
  return titles;
}

//convert into usable format
function unflatten(data){
    if (Object(data) !== data || Array.isArray(data)) return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
          cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
}

// get the data and converts into object
function getColumnData(numbers) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var object  = {};
  for (var i = 0; i < data.length; i++) {
    var objectItem = [];
    for (var j = 0; j < numbers.length; j++) {
      objectItem.push(data[i][numbers[j]]);
    }
    if(objectItem[1] != "") {
      object[objectItem[0]] = objectItem[1]
    }
  }
  return object
}

// return text in new window
function showOutput(){
  var html = HtmlService
      .createTemplateFromFile('output')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'output');
}

// receive form data of chosen columns and return the selected columns
// and output usable json
function processForm(formObject) {
  var columnArr = []
  for (x in formObject) {
    columnArr.push(x);
  }
  
  var usableFormat = getColumnData(columnArr)
  
  
  finalData = unflatten(usableFormat)

  showOutput()
}

// returns a readable object
function returnData(){
  return JSON.stringify(finalData, null, "\t")
}


    
