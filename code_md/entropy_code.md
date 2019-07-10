# 5. Performance: Entropy

## Function
**List**  
* log2(a): return log2(x)
* sort_count(arr2): sort and unique and count array. 

---
### log2 function
> log2(a) return the log2(x)
 
```js
 //function log2
function log2(a){
  var b=Math.log(a)/Math.log(2);
  return b;
}
```

### sort_count
> Input is array. Return sort and unique array and the count of each elements.
> Input like :
> a=[1,1,1,2,2,3,4,5,5,5,6,6,6,7,7,8,8];
> Output like:
> [1, 2, 3, 4, 5, 6, 7, 8]
> [3, 2, 1, 1, 3, 3, 2, 2]

```js
// Use array to generate two unique array, and each count.
function sort_count(arr2){
  arr=JSON.parse(JSON.stringify(arr2));
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) { return a*1 - b*1; });
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
    if (arr[i-1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  var out=[];
  for(var j=0;j<ret.length;j++)
  {
    var count = 0;
    for(let i=0; i<arr.length; i++)
    {
      if (arr[i]==ret[j]){
        count++;
      }   
    }
    out.push(count);
  }
  return [ret,out];
}
```
