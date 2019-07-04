# Multi-Class Classification using One-vs-All Logistic Regression
The sample code below illustrates how to run the multi-class classifier on the iris datasets to classifiy the species of each data row:

```js
var classifier = new LSRE.MultiClassLogistic({
   alpha: 0.000001,
   iterations: 1000,
   lambda: 0.0
});

IRIS.shuffle();

var trainingDataSize = Math.round(IRIS.rowCount * 0.9);
var trainingData = [];
var testingData = [];
for(var i=0; i < IRIS.rowCount ; ++i) {
   var row = [];
   row.push(IRIS.data[i][0]); // sepalLength;
   row.push(IRIS.data[i][1]); // sepalWidth;
   row.push(IRIS.data[i][2]); // petalLength;
   row.push(IRIS.data[i][3]); // petalWidth;
   row.push(IRIS.data[i][4]); // output is species
   if(i < trainingDataSize){
        trainingData.push(row);
   } else {
       testingData.push(row);
   }
}


var result = classifier.fit(trainingData);

console.log(result);

for(var i=0; i < testingData.length; ++i){
   var predicted = classifier.transform(testingData[i]);
   console.log("actual: " + testingData[i][4] + " predicted: " + predicted);
}
```