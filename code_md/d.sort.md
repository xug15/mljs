# Sort, Min, min, mean, median
* [Back Home](../README.md)

## sort and return the index of sort.
```js
function sort_and_index(array2){
    var array=JSON.parse(JSON.stringify(array2));
    var array_old=JSON.parse(JSON.stringify(array2));
    array_order=array.sort(function(a,b){return b-a});
    var index_array=[];
    for(var i=0;i<array_old.length;i++)
    {
        var j=array_order.indexOf(array_old[i]);
        index_array.push(j);
        array_order[j]=NaN;
    }
    //return [array_old,array_order,index_array];
    return index_array;

}
data=[1,2,111,33,17];
sort_and_index(data);
//[6, 4, 5, 0, 7, 2, 3, 1]

function sort_and_index_max(array2,number){
    var array=JSON.parse(JSON.stringify(array2));
    if(number>array.lenght){
        console.log("The max number is mucher than total of array!");
    }
    var array_old=JSON.parse(JSON.stringify(array2));
    array_order=array.sort(function(a,b){return b-a});
    var index_array=[];
    
    for(var i=0;i<number;i++)
    {
        var j=array_old.indexOf(array_order[i]);
        index_array.push(j);
        array_old[j]=NaN;
    }
    //return [array_old,array_order,index_array];
    
    return index_array;

}
data=[1,2,111,33,17];
sort_and_index_max(data,2);
//[2, 3]
function sort_and_index_max_array(array23,number){
    var array2=[];
    for (var i=0;i<array23.length;i++)
    {
        array2.push(array23[i][0]);
    }
    var array=JSON.parse(JSON.stringify(array2));
    if(number>array.lenght){
        console.log("The max number is mucher than total of array!");
    }
    var array_old=JSON.parse(JSON.stringify(array2));
    array_order=array.sort(function(a,b){return b-a});
    var index_array=[];
    
    for(var i=0;i<number;i++)
    {
        var j=array_old.indexOf(array_order[i]);
        index_array.push(j);
        array_old[j]=NaN;
    }
    //return [array_old,array_order,index_array];
    
    return index_array;

}
//
sort_and_index_max_array(feature_entropy,3)



```


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

### object unqiue
```js
data=[[1,1,1,1],[2,2,2,2],[3,3,3,3],[4,4,4,4],[1,2,1,1],[3,2,4,4],[1,1,1,1],[2,2,2,2],[3,3,3,3],[4,4,4,4]]
function unique_array_ob(data){
    var car={};
    for(var i=0;i<data.length;i++)
    {
        var name=JSON.stringify(data[i]);
        //console.log(name);
        car[name]=data[i]
    }
    var unique_array=[];
    for(var key in car)
    {
        unique_array.push(car[key]);
    }
return unique_array;
}
unique_array_ob(data)

0: (4) [1, 1, 1, 1]
1: (4) [2, 2, 2, 2]
2: (4) [3, 3, 3, 3]
3: (4) [4, 4, 4, 4]
4: (4) [1, 2, 1, 1]
5: (4) [3, 2, 4, 4]



```




