# 5. Performance: Entropy

## Function
**List**  
* log2(a): return log2(x)
* sort_count(arr2): sort and unique and count array. 
* entropy(x): return array of entropy.
* feature_evalue(): start the calculate entropy function.
---
### log2 function
> log2(a) return the log2(x)
```js
log2(2);
//1
log2(4);
//2
log2(6);
//2.584962500721156
```
 
```js
 //function log2
function log2(a){
  var b=Math.log(a)/Math.log(2);
  return b;
}
```

### sort_count
> Input is array. Return sort and unique array and the count of each elements.
```js
//Input like :  
a=[1,1,1,2,2,3,4,5,5,5,6,6,6,7,7,8,8];  
//Output like:  
b=sort_count(a);
[[1, 2, 3, 4, 5, 6, 7, 8],[3, 2, 1, 1, 3, 3, 2, 2]]
[1, 2, 3, 4, 5, 6, 7, 8]  
[3, 2, 1, 1, 3, 3, 2, 2]  
```
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
### Transforme array.

```js
c
(3) [Array(4), Array(4), Array(4)]
0: (4) [1, 2, 3, 4]
1: (4) [1, 2, 3, 4]
2: (4) [1, 2, 3, 4]

d=transforme_array(c);
[Array(3), Array(3), Array(3), Array(3)]
0: (3) [1, 1, 1]
1: (3) [2, 2, 2]
2: (3) [3, 3, 3]
3: (3) [4, 4, 4]

```

```js
c=[[1,2,3,4],[1,2,3,4],[1,2,3,4]];
function transforme_array(a2)
{
  //Deep copy array.
  a=JSON.parse(JSON.stringify(a2));
  //Create by feature array
  var b=[];
  for(var j=0;j<a[0].length;j++)
    {
      b.push([]);
    }
    // put feature into each array.
  for(var i=0;i<a.length;i++)
  {
    for(var j=0;j<a[i].length;j++)
    {
      b[j].push(a[i][j]);
    }
  }
  return b;
}
```

### entropy
> Return array of entropy.
```js
a=[1,1,1,2,2,3,4,5,5,5,6,6,6,7,7,8,8];
b=sort_count(a)
console.log(b);
// [1, 2, 3, 4, 5, 6, 7, 8],
// [3, 2, 1, 1, 3, 3, 2, 2]

console.log(entropy(b[1]));
```

```js
function entropy(arr2){
  arr=JSON.parse(JSON.stringify(arr2));
  var sum=0;
  for(var i=0;i<arr.length;i++)
  {
    sum+=arr[i];
  }
  var entropy_value=0;
  var array=[];
  for(var i=0;i<arr.length;i++)
  {
    var a=arr[i]/sum;
    var b=a*log2(a);
    entropy_value+=b*(-1);
    array.push(b);
  }
  return [sum,entropy_value,array];

}
```
### feature_evalue()
> get data from input.

```js
function feature_evalue()
{
//get data;
var data= getinforvalue('training_decision');
var label=getinforlabel('label_decision');
var label_unique=sort_unique(label);
//
var out=sort_count(label);
console.log(out);
entropy(out[1]);

/*
merge_array=merge_matrix(data,label);
//console.log(merge_array);
merge_array=shufflearray(merge_array);
//console.log(merge_array);
*/

}
```


