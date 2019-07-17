# Processing NA
* [Back Home](../README.md)

* We will use [1. First get data from html.](getdata.md) code.
* 1. getinforvalue('training_decision');
* 2. getinforlabel('label_decision');
-------
* Use  [5. Performance: AUC,  information gain (Entropy), gain ratio Gini index ](entropy_code.md) 
* 1. Function transforme_array(c);

## Set  key_replace value
```js
function key_replace_with_0(){
  key_replace='0';
}
function key_replace_with_median(){
  key_replace='median';  
}
```
## Replace NA with 0
```js
function dealwithna_replace_with_0()
{
  //get data;
  var data= getinforvalue('training_decision');
  var label=getinforlabel('label_decision');
  //deep copy
  var data1=transforme_array(data);

//replace na with 0.
  for(var i=0;i<data1.length;i++)
    {
      for(var j=0;j<data1[i].length;j++)
      {
        if(isNaN(data1[i][j]) | data1[i][j]==null){
          data1[i][j]=0;
          //console.log(i+' '+j);
        }
      }
    }
    return data1
}
```

## Replace NA with mean
* function array_mean_with_na(a)
> Calucalte the mean of array with na.


```js
function array_mean_with_na(a){
var counter=0;
var sum=0;
//Test the each element is NaN or null or not.
  for(var i=0;i<a.length;i++)
  {
    if(isNaN(a[i]) | a[i]==null){
      continue;
      }else{//if not, then calculate the number of number and the total of numbers.
        counter+=1;
        sum+=a[i];
      }
  }
  var average=sum/counter;
  return average;
}
```

```js
function dealwithna_replace_with_mean(data)
{
  //get data;
    /*
  sample1: [1,2,3]
  sample2: [1,2,3]
  [[1,2,3],[1,2,3]]
  */
  //replace na with mean.
  //1. transpose data matrix.
  feature_array=transforme_array(data);
  //deep copy the feature array.
  feature_array_replace_mean=JSON.parse(JSON.stringify(feature_array));
  //2. calculate each feature mean.
  feature_mean_array=[];
  for(var i=0;i<feature_array.length;i++)
    {
      feature_mean_array.push(array_mean_with_na(feature_array[i]));//push each feature mean to array.
    }
    //read each feature value array.
    for(var i=0;i<feature_array_replace_mean.length;i++)
    {
      //loop each value in feature.
      for(var j=0;j<feature_array_replace_mean[i].length;j++)
      {
        //test if the feature is na or null will be replaced with mean.
        if(isNaN(feature_array_replace_mean[i][j]) | feature_array_replace_mean[i][j]==null)
        {
          feature_array_replace_mean[i][j]=feature_mean_array[i];
        }
      }
    }
  return feature_array_replace_mean;
}
```

## Replace NA with median

* function array_median_with_na(a)
* return the median of array.

```js
function array_median_with_na(a){
  var median_array=[];
//Test the each element is NaN or null or not.
  for(var i=0;i<a.length;i++)
  {
    if(isNaN(a[i]) | a[i]==null){
      continue;
      }else{//if not, then calculate the number of number and the total of numbers.
      median_array.push(a[i]);  
      }
  }
  // sort the array with small to big.
  media_array_sort=median_array.sort(function(a,b){return a-b});
  //divide with 2 and get remainder.
  if(media_array_sort.length%2==1){//odd number
    var index=Math.round(media_array_sort.length/2)-1;
    // get the median index
    return media_array_sort[index];
  }else{//even number.
    var index=media_array_sort.length/2;
    // get the middle
    var index2=index-1;
    var avg=(media_array_sort[index2]+media_array_sort[index])/2
    return avg;
  }
  
}
```

```js
function dealwithna_replace_with_median(data)
{
  //get data;
  /*
  sample1: [1,2,3]
  sample2: [1,2,3]
  [[1,2,3],[1,2,3]]
  */
  //1. transpose data matrix.
  feature_array=transforme_array(data);
  //deep copy the feature array.
  feature_array_replace_median=JSON.parse(JSON.stringify(feature_array));
  //2. calculate each feature mean.
  feature_median_array=[];
  for(var i=0;i<feature_array.length;i++)
    {
      feature_median_array.push(array_median_with_na(feature_array[i]));//push each feature mean to array.
    }
    //read each feature value array.
    for(var i=0;i<feature_array_replace_median.length;i++)
    {
      //loop each value in feature.
      for(var j=0;j<feature_array_replace_median[i].length;j++)
      {
        //test if the feature is na or null will be replaced with mean.
        if(isNaN(feature_array_replace_median[i][j]) | feature_array_replace_median[i][j]==null)
        {
          feature_array_replace_median[i][j]=feature_median_array[i];
        }
      }
    }
  return feature_array_replace_median;
}
```

## Remove NA data
### Remove feature
```js

```

### Remove sample
```js

```
## Calculate NA Value with disdistance.
```js 

```



