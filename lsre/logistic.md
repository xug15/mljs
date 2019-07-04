# Logistic Regression
The sample code below illustrates how to run the logistic regression on the iris datsets to classify whether a data row belong to species Iris-virginica:
```js

// === Create the linear regression === //
var logistic = new LSRE.LogisticRegression({
   alpha: 0.000001,
   iterations: 1000,
   lambda: 0.0
});
// can also use default configuration: var logistic = new jsregression.LogisticRegression(); 

// === Create training data and testing data ===//
IRIS.shuffle();

var trainingDataSize = Math.round(IRIS.rowCount * 0.8);
var trainingData = [];
var testingData = [];
for(var i=0; i < IRIS.rowCount ; ++i) {
   var row = [];
   row.push(IRIS.data[i][0]); // sepalLength;
   row.push(IRIS.data[i][1]); // sepalWidth;
   row.push(IRIS.data[i][2]); // petalLength;
   row.push(IRIS.data[i][3]); // petalWidth;
   row.push(IRIS.data[i][4] == "Iris-virginica" ? 1.0 : 0.0); // output which is 1 if species is Iris-virginica; 0 otherwise
   if(i < trainingDataSize) {
        trainingData.push(row);
   } else {
       testingData.push(row);
   }
}


// === Train the logistic regression === //
var model = logistic.fit(trainingData);

// === Print the trained model === //
console.log(model);

// === Testing the trained logistic regression === //
for(var i=0; i < testingData.length; ++i){
   var probabilityOfSpeciesBeingIrisVirginica = logistic.transform(testingData[i]);
   var predicted = logistic.transform(testingData[i]) >= logistic.threshold ? 1 : 0;
   console.log("actual: " + testingData[i][4] + " probability of being Iris-virginica: " + probabilityOfSpeciesBeingIrisVirginica);
   console.log("actual: " + testingData[i][4] + " predicted: " + predicted);
}
```