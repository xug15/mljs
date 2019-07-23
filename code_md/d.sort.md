# Sort, Min, min
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


