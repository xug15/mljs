# Linear Regression using js-regrssion
```js
// var jsregression = require('js-regression');

// === training data generated from y = 2.0 + 5.0 * x + 2.0 * x^2 === //
var data = [];
for(var x = 1.0; x < 100.0; x += 1.0) {
  var y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
  data.push([x, x * x, y]); // Note that the last column should be y the output
}

// === Create the linear regression === //
var regression = new LSRE.LinearRegression({
  alpha: 0.0000001, // 
  iterations: 1000,
  lambda: 0.0
});
// can also use default configuration: var regression = new jsregression.LinearRegression(); 

// === Train the linear regression === //
var model = regression.fit(data);

// === Print the trained model === //
console.log(model);


// === Testing the trained linear regression === //
var testingData = [];
for(var x = 1.0; x < 100.0; x += 1.0) {
  var actual_y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random() * 1.0;
  var predicted_y = regression.transform([x, x * x]);
  console.log( x +" actual: " + actual_y + " predicted: " + predicted_y); 
}
```