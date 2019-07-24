# Sort, Min, min, mean, median
* [Back Home](../README.md)

## Sort array, small to big.
```js
data=[1,4,2,44,0,21,17];
data.sort(function(a,b){return a-b});
```

## Sort array, big to small.
```js
data=[1,4,2,44,0,21,17];
data.sort(function(a,b){return b-a});
```
## return the biggest index of array.
```js
data=[1,4,2,44,0,21,17];
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
indexOfMax(data);
```

## return the samllest index of array.
```js
data=[1,4,2,44,0,21,17];
function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}
indexOfMin(data);
```
## return the mean of array
```js
data=[[1,4],[2,44],[0,21]];
function mean_array(a)
    {
        var counter=a.length;
        var mean_array=[];
        for(var j=0;j<a[0].length;j++)
                    {
                        mean_array.push(0);
                    }
        //console.log(mean_array);
        for(var i=0;i<counter;i++)
            {
                for(j=0;j<a[i].length;j++)
                    {
                        mean_array[j]+=a[i][j];
                    }
            }
        //console.log(mean_array); 
        for(var i=0;i<mean_array.length;i++)
            {
            mean_array[i]=mean_array[i]/counter;
            }
        //console.log(mean_array);   
        return mean_array;   
    }

mean_array(data);
```

### mean array
```js

```

## median
```js
data=[1,11,2,33,4,56];
function median(median_array){
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
median_array(data);
```



