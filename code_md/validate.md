# 4. mljs validate
> 1. According to the probability and sort and unique the data. Caculate the between the value threshold.
> 2. determine the label by the thresthold.
> 3. according to label in fact and the label predict.

```js
var config_model='';
var data=[];
for(var i=0;i<trainingData.length;i++)
  {
    var row=[];
    row.push(trainingData[i][0]);
    var name='model'+i;
    window[name]=train_model_new(trainingData[i][1]);
    //model=
    config_model+='<p>'+trainingData[i][0]+" "+window[name].weight+" intercept"+window[name].intercept+'</p>';
    proarr=model_data_probability(window[name],validateData[i][1]);
    rocarray=mljs_validate(proarr,validateLabel[i][1]);
    row.push(rocarray[3]);
    row.push(rocarray[1]);
    row.push(rocarray[2]);
    //console.log(row);
    data.push(row);
  }
  //console.log(data);
  plot_roc(data,'roc_plot');
```



**1. According to the probability and sort and unique the data. Caculate the between the value threshold.**  
**cutoff(probability);**  
> 1. Deep copy probability array.
> 2. sort the probability from small to big.
> 3. Unique the probability.
> 4. Calculate the therthold the first one is the smallest -1, other is the (data[i]+data[i+1])/2

```js
var cutoffarray=cutoff(probability);
function cutoff(arr2) {
  arr=JSON.parse(JSON.stringify(arr2));
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) { return a*1 - b*1; });
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
    if (arr[i-1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  var cutoff=[];
  cutoff.push(ret[0]-1);
  for(var i=1;i<ret.length;i++){
    cutoff.push((ret[i-1]+ret[i])/2);
  }
  cutoff.push(ret[ret.length-1]+1);
  return cutoff;
}
```
**2. determine the label by the thresthold.**  
**mljs_determin_label(probability,cutoffarray)**
> 
> 
> 
```js
roc_array_label=mljs_determin_label(probability,cutoffarray);
function mljs_determin_label(a,b){
  //a is probability array
  //b is cutoff array
  label_array=[];
  for(var i=0;i<b.length;i++){
    //get each cutoff valule is b[i]
    label_array.push([]);
    for(var j=0;j<a.length;j++){
      //get the each probability a[j]
      if(a[j]> b[i]){
        label_array[i].push(1);
      }else{
        label_array[i].push(0);
      }
    }
  }
return label_array;
}
```
**3. according to label in fact and the label predict.**  
**mljs_label_cross(trainingLabel,roc_array_label);**
```js
roc_tp4=mljs_label_cross(trainingLabel,roc_array_label);
function mljs_label_cross(a,b){
  //a is the label of fact.
  //b is the array of use probability to predict label.
  var pro=[];
  var tprarr=[];
  var fprarr=[];
  for(var i=0;i<b.length;i++){
    // each cut off label is b[i]
    var tp=0;
    var tf=0;
    var fp=0;
    var fn=0;
    var tpr=0;
    var fpr=0;
    for(var j=0;j<b[i].length;j++){
      if(b[i][j]==1 & a[j]==1){
        tp++;
      }
      if(b[i][j]==0 & a[j]==0){
        tf++;
      }
      if(b[i][j]==0 & a[j]==1){
        fn++;
      }
      if(b[i][j]==1 & a[j]==0){
        fp++;
      }
    }
    tpr=tp/(tp+fn);
    tpr.toFixed(3);
    fpr=fp/(tf+fp);
    fpr.toFixed(3);

    pro.push([tp,tf,fp,fn]);
    fprarr.push(fpr);
    tprarr.push(tpr);
  }
  var auc=0;
  for(var i=1;i<fprarr.length;i++){
    auc+=(tprarr[i]+tprarr[i-1])*(fprarr[i]-fprarr[i-1])/2;
  }
  auc=Math.abs(auc).toFixed(3);
  return [pro,fprarr,tprarr,auc];
}
```
## select_data_from_id()
```js
function select_data_from_id()
{
//get data;
var data= getinforvalue('training_decision');
var label=getinforlabel('label_decision');
var label_unique=sort_unique(label);
//console.log(label_unique);
//merge_matrix()


merge_array=merge_matrix(data,label);
//console.log(merge_array);
merge_array=shufflearray(merge_array);
//console.log(merge_array);
//
var train_range_ratio=[0,1];
var validate_range_ratio=[0,1];
var train_range=[];
var validate_range=[];
var number=parseInt(train_range_ratio[1]*(data.length)) ;

//train_range_ratio[1]*(data.length);
train_range.push(parseInt(train_range_ratio[0]*(data.length)));
train_range.push(parseInt(train_range_ratio[1]*(data.length)));
//
validate_range.push(parseInt(validate_range_ratio[0]*(data.length)));
validate_range.push(parseInt(validate_range_ratio[1]*(data.length)));

//
var train=generate_train_validate_data(label_unique,train_range,merge_array);
trainingData =train[0];
trainingLabel=train[1];
var valide=generate_train_validate_data(label_unique,validate_range,merge_array);
validateData=valide[0];
validateLabel=valide[1];

/*
model=train_model(trainingData[0][1]);
proarr=model_data_probability(model,validateData[0][1]);
rocarray=mljs_validate(proarr,validateLabel[0][1]);
console.log(rocarray);
*/
var data=[];
for(var i=0;i<trainingData.length;i++)
  {
    var row=[];
    row.push(trainingData[i][0]);
    model=train_model(trainingData[i][1]);
    proarr=model_data_probability(model,validateData[i][1]);
    rocarray=mljs_validate(proarr,validateLabel[i][1]);
    row.push(rocarray[3]);
    row.push(rocarray[1]);
    row.push(rocarray[2]);
    //console.log(row);
    data.push(row);
  }
  console.log(data);
  plot_roc(data,'roc_plot');

}
```

-----
## old version 

```js
rocarray=mljs_validate(proarr,validateLabel[0][1]);
function mljs_validate(probability,trainingLabel){
  var cutoffarray=cutoff(probability);
console.log(probability);
console.log(cutoffarray);
roc_array_label=mljs_determin_label(probability,cutoffarray);
roc_tp4=mljs_label_cross(trainingLabel,roc_array_label);
return roc_tp4;
}
```
