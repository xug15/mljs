# f. mulity data was processed
* [Back Home](../README.md)

## When the data was multiply classification data.
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

//The data will be one vs rest.
var train=generate_train_validate_data(label_unique,train_range,merge_array);
trainingData =train[0];
trainingLabel=train[1];
var valide=generate_train_validate_data(label_unique,validate_range,merge_array);
validateData=valide[0];
validateLabel=valide[1];

//
var config_model='';
var data=[];
for(var i=0;i<trainingData.length;i++)
  {
    var row=[];
    row.push(trainingData[i][0]);
    var name='model'+i;
    window[name]=train_model_new(trainingData[i][1]);

    config_model+='<p>'+trainingData[i][0]+" "+window[name].weight+" intercept"+window[name].intercept+'</p>';
    proarr=model_data_probability(window[name],validateData[i][1]);
    rocarray=mljs_validate(proarr,validateLabel[i][1]);
    row.push(rocarray[3]);
    row.push(rocarray[1]);
    row.push(rocarray[2]);
    //console.log(row);
    data.push(row);
  }
}

```

## data to one vs rest.
```js
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


