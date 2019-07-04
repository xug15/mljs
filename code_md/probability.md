# 3. model data probability.
> loop the validate data use classifier to predict the probability.
> 1. use the best model, and validate data, and for each validate and calculate the probability.

**1. use the best model, and validate data, and for each validate and calculate the probability.**  
**model_data_probability(a,b)**  
> a is the model
> b is the validate data, were used to predict the probability.
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

```js
proarr=model_data_probability(window[name],validateData[i][1]);

function model_data_probability(a,b)
{
//a is the model
//b is validate data.
var proarr=[];
for(var i =0;i<b.length;i++)
  {
    var pro=a.transform(b[i]);
    proarr.push(pro);
  }
  return proarr;
}
```