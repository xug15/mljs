# 1. First get data from html.

**getinforvalue(trainid)**
> Use the div id get the data.
```js
function getinforvalue(trainid){
  //var trainid='training_decision';
  //get the html data
  if(typeof datacontents==="undefined"){
    var decision_data=document.getElementById(trainid).value;
  }else if(datacontents.length>0){
    var decision_data=datacontents;
  }else{
    var decision_data=document.getElementById(trainid).value;
  }
  
  //decision_label=document.getElementById("label_decision").value;

  //transforme data formate.
  var data=decision_data.split('\n');
  var dataarr=[];
  for(var i=0;i<data.length;i++){
    var row=[];
    row=data[i].split(',').map(function(item) {
	return parseFloat(item);
  });
    dataarr.push(row);
  }
  //console.log(dataarr);

  return dataarr;

}
// getinforvalue('training_decision')
```
**getinforlabel(lableid)**  
> Use the div id get the label data.
```js  
function getinforlabel(){
  //get the html data
  //decision_data=document.getElementById("training_decision").value;
  var lableid='label_decision';
  if(typeof labelcontents==="undefined"){
    var decision_label=document.getElementById(lableid).value;
  }
  else if(labelcontents.length>0){
    var decision_label=labelcontents;
  }else{
    var decision_label=document.getElementById(lableid).value;
  }


  //transforme data formate.

  var decision_label_a=decision_label.split('\n').map(function(item) {
	return parseFloat(item);
  })
  console.log(decision_label_a);
  return decision_label_a;
}
```
**2. Then use function sort label information.**  
**sort_unique(arr)**
> sort and unique the array, and return the unique array.
```js
var label_unique=sort_unique(label);
function sort_unique(arr2) {
  var arr=JSON.parse(JSON.stringify(arr2));
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) { return a*1 - b*1; });
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
    if (arr[i-1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  return ret;
}
```

**3. Merge data and label to one matrix.**  
**merge_matrix(data,label)**
> Make two array to one array.
```js
function merge_matrix(a2,b2){
  a=JSON.parse(JSON.stringify(a2));
  b=JSON.parse(JSON.stringify(b2));
  var c=[];
for(var i=0;i<a.length;i++){

  a[i].push(b[i]);
  c.push(a[i]);
}
return c;
}
```

**4. Shuffle array to generate random array.**  
**shufflearray(merge_array)**
> shuffle array and return the shuffled array.
```js
merge_array=shufflearray(merge_array);
function shufflearray(a2) {
  var a=JSON.parse(JSON.stringify(a2));
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
```
**5. Set train and validate range. like train 0-0.8, validate: 0.8-1**  
****
> Set the train data range. like train_range_ratio=[0,0.8]; then, calculate the range the start number and end number.
```js
var train_range_ratio=[0,0.8];
var validate_range_ratio=[0.8,1];
var train_range=[];
var validate_range=[];
var number=parseInt(train_range_ratio[1]*(data.length)) ;

//train_range_ratio[1]*(data.length);
train_range.push(parseInt(train_range_ratio[0]*(data.length)));
train_range.push(parseInt(train_range_ratio[1]*(data.length)));
//
validate_range.push(parseInt(validate_range_ratio[0]*(data.length)));
validate_range.push(parseInt(validate_range_ratio[1]*(data.length)));
```
**6. Use the partion of the set and generate train and validate.**  
**generate_train_validate_data(label_unique,train_range,merge_array)**  
> give the label unique array, and train data range, and the merge array. It will return the relative data array.
```js
//
var train=generate_train_validate_data(label_unique,train_range,merge_array);
var trainingData =train[0];
var trainingLabel=train[1];
var valide=generate_train_validate_data(label_unique,validate_range,merge_array);
var validateData=valide[0];
var validateLabel=valide[1];

function generate_train_validate_data(label_unique,train_range,merge_array)
{
var trainingData=[];
var trainingLabel=[];
var number_train=0;
if(label_unique.length>1)
  {
    for(var j=0;j<label_unique.length;j++)
    {
      trainingData.push([label_unique[j],[]]);
      trainingLabel.push([label_unique[j],[]]);
      for(var i=train_range[0]; i < train_range[1]; i++)
      {
        var row = [];
        for(var k=0;k<merge_array[i].length-1;k++)
          {
            row.push(merge_array[i][k]);
          }
        var label=0;
        if(merge_array[i][merge_array[i].length-1]==label_unique[j])
          {
            
            label=1;
          }else
          {
            label=0;
          }
        row.push(label);
        trainingData[j][1].push(row);
        trainingLabel[j][1].push(label);
      }
    }
  }
return [trainingData,trainingLabel];
}
```

**merge_matrix(a,b)**  
> merge data into array.  
```js
function merge_matrix(a2,b2){
  a=JSON.parse(JSON.stringify(a2));
  b=JSON.parse(JSON.stringify(b2));
  var c=[];
for(var i=0;i<a.length;i++){

  a[i].push(b[i]);
  c.push(a[i]);
}
return c;
}
 ```
