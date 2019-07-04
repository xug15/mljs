# 3. model data probability.
> loop the validate data use classifier to predict the probability.
> 1. use the best model, and validate data, and for each validate and calculate the probability.

**1. use the best model, and validate data, and for each validate and calculate the probability.**  
**model_data_probability(a,b)**  
> a is the model
> b is the validate data, were used to predict the probability.
```js
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