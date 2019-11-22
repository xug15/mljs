# g. count array

```js
array = ["2","1","2","2","3","4","3","3","3","5"];
var counts = {};

for (var i = 0; i < array.length; i++)
    counts[array[i]] = (counts[array[i]] + 1) || 1;


console.log(counts);

{1: 1, 2: 3, 3: 4, 4: 1, 5: 1}
```
