# mljs

## Usage
### Get data from html
```js
function getinforvalue(trainid){
  //get the html data
  var decision_data=document.getElementById(trainid).value;
  //decision_label=document.getElementById("label_decision").value;

  //transforme data formate.
  var decision_data='['+decision_data+']';
  var decision_data_a=JSON.parse(decision_data);
  return decision_data_a;

}
// getinforvalue('training_decision')


function getinforlabel(lableid){
  //get the html data
  //decision_data=document.getElementById("training_decision").value;
  var decision_label=document.getElementById(lableid).value;

  //transforme data formate.

  var decision_label_a=decision_label.split(',').map(function(item) {
	return parseFloat(item);
  })
  return decision_label_a;
}
// getinforlabel('label_decision');
```
### Linear Regression using js-regrssion
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

### Logistic Regression
The sample code below illustrates how to run the logistic regression on the iris datsets to classify whether a data row belong to species Iris-virginica:
```js
var jsregression = require('js-regression');
var iris = require('js-datasets-iris');

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

### Multi-Class Classification using One-vs-All Logistic Regression
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
### Usage In HTML

Include the "node_modules/js-regression/build/jsregression.min.js" (or "node_modules/js-regression/src/jsregression.js") in your HTML \<script\> tag

The codes in the following html files illustrates how to use them in html pages:

* [example-binary-classifier.html](https://rawgit.com/chen0040/js-regression/master/example-binary-classifier.html)
* [example-multi-class-classifier.html](https://rawgit.com/chen0040/js-regression/master/example-multi-class-classifier.html)
* [example-regression.html](https://rawgit.com/chen0040/js-regression/master/example-regression.html)
* [example-regression-2.html](https://rawgit.com/chen0040/js-regression/master/example-regression-2.html)
* [example-regression-3.html](https://rawgit.com/chen0040/js-regression/master/example-regression-3.html)

### Logistic Regression using mljs
```js


// our training set (X,Y)
var X = new ML.Matrix([[0,-1], [1,0], [1,1], [1,-1], [2,0], [2,1], [2,-1], [3,2], [0,4], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5], [3,4], [1, 10], [1, 12], [2, 10], [2,11], [2, 14], [3, 11]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]);




// the test set (Xtest, Ytest)
var Xtest = new ML.Matrix([[0, -2], [1, 0.5], [1.5, -1], [1, 2.5], [2, 3.5], [1.5, 4], [1, 10.5], [2.5, 10.5], [2, 11.5]])
var Ytest = ML.Matrix.columnVector([0, 0, 0, 1, 1, 1, 2, 2, 2]);

// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);

// we try to predict the test set
var finalResults = logreg.predict(Xtest);
// Now, you can compare finalResults with the Ytest, which is what you wanted to have.

```
### PCA analysis

```js
// Generate the data sets.
dataset=MLDataset.getNumbers();

//Use new dataset to calculate the PCA module.
pca=new ML.PCA(dataset);

//export the PCA module parameter.
pca_result=pca.toJSON();

//display the PCA parameter.
for (var i in pca_result){
    console.log(pca_result[i]);
}

//load the PCA module paramters.
pca_load=ML.PCA.load(pca_result);

//Input the new points
newPoints = [[4.9, 3.2, 1.2, 0.4], [5.4, 3.3, 1.4, 0.9]];

//predict new point in the pca result.
pca.predict(newPoints)[0]
// [-2.830722471866897, 0.01139060953209596, 0.0030369648815961603, -0.2817812120420965]

//predict new point in the load module pca result.
pca_load.predict(newPoints)[0]
// [-2.830722471866897, 0.01139060953209596, 0.0030369648815961603, -0.2817812120420965]
predict_result=pca.predict(dataset);
//
threedplot(dataset,'3dplot');
threedplot(predict_result,'3dplotnew');
```

### Decision tree
```js
function train_decision(){
  //get the html data
  decision_data_a=getinforvalue('training_decision');
  decision_label_a=getinforlabel('label_decision');
  
  //set decision parameter
  var options = {
  gainFunction: 'gini',
  maxDepth: 10,
  minNumSamples: 3
  };

  //Generate a decision module.
  classifier_decision = new ML.DecisionTreeClassifier(options);

  //Training the data
  classifier_decision.train(decision_data_a, decision_label_a);

  $(".predict_decision").show();

}
function download_decisiontree(){
  var text=classifier_decision.toJSON();
  myJSON = JSON.stringify(text);
  download("decisiontree_parameters.txt",myJSON);

}

function prediction_decision(){
  //predict_decision
    //get the html data
    predict_data_a=getinforvalue('predict_decision_input');

    //Predict the data
    var result_decision = classifier_decision.predict(predict_data_a);

    $("#result_dicision").html('<p>Decision Tree Prediction results:'+result_decision+'</p>');

}
```
### Random forest 
```js

function train_randomforest(){
  //get the html data
  decision_data_a=getinforvalue('training_decision');
  decision_label_a=getinforlabel('label_decision');
  
  //set decision parameter
  var options = {
  seed: 3,
  maxFeatures: 0.8,
  replacement: true,
  nEstimators: 25
  };

  //Generate a decision module.
  classifier_randomforest = new ML.DecisionTreeClassifier(options);

  //Training the data
  classifier_randomforest.train(decision_data_a, decision_label_a);

  $(".predict_randomforest").show();

}

function download_randomforest(){
  var text=classifier_randomforest.toJSON();
  myJSON = JSON.stringify(text);
  download("randomforest_parameters.txt",myJSON);

}

function prediction_randomforest()
{

  //predict_decision
  //get the html data
    predict_data_a=getinforvalue('predict_randomforest_input');

    //Predict the data
    var result = classifier_randomforest.predict(predict_data_a);

    $("#result_randomforest").html('<p>Random Forest Prediction results:'+result+'</p>');

}
```

#### Regression Code example
```js
//regression-simple-linear begin
//
const x = [0.5, 1, 1.5, 2, 2.5];
const y = [0, 1, 2, 3, 4];

const regression = new ML.SimpleLinearRegression(x, y); //load ML function
new MLDataset.get

regression.slope // 2
regression.intercept // -1
regression.coefficients // [-1, 2]

regression.predict(3); // 5
regression.computeX(3.5); // 2.25

regression.toString(); // 'f(x) = 2 * x - 1'

regression.score(x, y);
// { r: 1, r2: 1, chi2: 0, rmsd: 0 }

const json = regression.toJSON();
// { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
const loaded = ML.SimpleLinearRegression.load(json);
loaded.predict(5) // 9

```
### Write code 
```html
<button class="btn btn-success" onclick="download_randomforest()">
```
```js
function download_randomforest(){
  var text=classifier_randomforest.toJSON();
  myJSON = JSON.stringify(text);
  download("randomforest_parameters.txt",myJSON);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
element.style.display = 'none';
  document.body.appendChild(element);
element.click();
document.body.removeChild(element);
}
```

### Upload code
```html
      <div style="margin:10px;">
        <input type="file" id="file-input" >
        <div id="file-content"></div>
        <button class="btn" onclick="loadmodule()">Upload</button>
      </div>
```
```js
function loadmodule()
{
  if(uploadjson['name'] == 'LogisticRegression')
  {
    //alert(uploadjson['name']);
    logreg=LG.load(uploadjson);
    $(".predict_logistic").show();
  }
  if(uploadjson['name'] == 'PCA')
  {
    //alert(uploadjson['name']);
    pca=ML.PCA.load(uploadjson);
      //get the html data
    pca_data_a=getinforvalue('training_decision');
    pca_label_a=getinforlabel('label_decision');
    predict_result=pca.predict(pca_data_a);
  //
  $(".predict_pca").show();
    threedlabelplot(pca_data_a,pca_label_a,'3dplot');
    threedlabelplot(predict_result,pca_label_a,'3dplotnew');
    
  }
  if(uploadjson['name'] == 'DTClassifier')
  {
    //alert(uploadjson['name']);
    classifier_decision=ML.DecisionTreeClassifier.load(uploadjson);
    $(".predict_decision").show();
  }
  
}


function readSingleFile(e) {
  //console.log(e);
  file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    // Display file content
    //displayContents(contents);
    uploadjson=JSON.parse(contents);
  };
  reader.readAsText(file);

}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.innerHTML = contents;
}
 
document.getElementById('file-input').addEventListener('change', readSingleFile, false);
```


## List of included libraries

### Unsupervised learning

- Principal component analysis (PCA): [`ML.PCA`](https://github.com/mljs/pca)
- Hierarchical clustering: [`ML.HClust`](https://github.com/mljs/hclust)
- K-means clustering: [`ML.KMeans`](https://github.com/mljs/kmeans)

### Supervised learning

- Support vector machines: [`ML.SVM`](https://github.com/mljs/svm)
- Naive Bayes: [`ML.NaiveBayes`](https://github.com/mljs/naive-bayes)
- K-Nearest Neighbor (KNN): [`ML.KNN`](https://github.com/mljs/knn)
- Partial least squares (PLS): [`ML.PLS`](https://github.com/mljs/pls)
- Cross-validation: [`ML.CrossValidation`](https://github.com/mljs/cross-validation)
- Confusion matrix: [`ML.ConfusionMatrix`](https://github.com/mljs/confusion-matrix)
- Decision tree classifier: [`ML.DecisionTreeClassifier`](https://github.com/mljs/decision-tree-cart)
- Random forest classifier: [`ML.RandomForestClassifier`](https://github.com/mljs/random-forest)

### Artificial neural networks (ANN)

- Feedforward Neural Networks: [`ML.FNN`](https://github.com/mljs/feedforward-neural-networks)
- Self-organizing map / Kohonen networks: [`ML.SOM`](https://github.com/mljs/som)

### Regression

- Simple linear regression: [`ML.SimpleLinearRegression`](https://github.com/mljs/regression-simple-linear)
- Polynomial regression: [`ML.PolynomialRegression`](https://github.com/mljs/regression-polynomial)
- Multivariate linear regression: [`ML.MultivariateLinearRegression`](https://github.com/mljs/regression-multivariate-linear)
- Power regression: [`ML.PowerRegression`](https://github.com/mljs/regression-power)
- Exponential regression: [`ML.ExponentialRegression`](https://github.com/mljs/regression-exponential)
- Theil-Sen regression: [`ML.TheilSenRegression`](https://github.com/mljs/regression-theil-sen)
- Robust polynomial regression: [`ML.RobustPolynomialRegression`](https://github.com/mljs/regression-robust-polynomial)
- Decision tree regression: [`ML.DecisionTreeRegression`](https://github.com/mljs/decision-tree-cart)
- Random forest regression: [`ML.RandomForestRegression`](https://github.com/mljs/random-forest)

### Optimization

- Levenberg-Marquardt: [`ML.levenbergMarquardt`](https://github.com/mljs/levenberg-marquardt)

### Math

- Matrix: [`ML.Matrix`](https://github.com/mljs/matrix) (Matrix class)
- Singular value decomposition (SVD): [`ML.SVD`](https://github.com/mljs/matrix)
- Eigenvalue decomposition (EVD): [`ML.EVD`](https://github.com/mljs/matrix)
- Cholesky decomposition: [`ML.CholeskyDecomposition`](https://github.com/mljs/matrix)
- Lu decomposition: [`ML.LuDecomposition`](https://github.com/mljs/matrix)
- Qr decomposition: [`ML.QrDecomposition`](https://github.com/mljs/matrix)
- Sparse matrix: [`ML.SparseMatrix`](https://github.com/mljs/sparse-matrix)
- Kernels: [`ML.Kernel`](https://github.com/mljs/kernel)
- Distance functions: [`ML.Distance`](https://github.com/mljs/distance)
- Similarity functions: [`ML.Similarity`](https://github.com/mljs/distance)
- Distance matrix: [`ML.distanceMatrix`](https://github.com/mljs/distance-matrix)
- XORShift-add RNG: [`ML.XSadd`](https://github.com/mljs/xsadd)

### [`ML.Array`](https://github.com/mljs/array)

- [`ML.Array.min`](https://github.com/mljs/array/tree/master/packages/array-min)
- [`ML.Array.max`](https://github.com/mljs/array/tree/master/packages/array-max)
- [`ML.Array.median`](https://github.com/mljs/array/tree/master/packages/array-median)
- [`ML.Array.mean`](https://github.com/mljs/array/tree/master/packages/array-mean)
- [`ML.Array.mode`](https://github.com/mljs/array/tree/master/packages/array-mode)
- [`ML.Array.normed`](https://github.com/mljs/array/tree/master/packages/array-normed)
- [`ML.Array.rescale`](https://github.com/mljs/array/tree/master/packages/array-rescale)
- [`ML.Array.sequentialFill`](https://github.com/mljs/array/tree/master/packages/'ml-array-sequential-fill)
- [`ML.Array.standardDeviation`](https://github.com/mljs/array/tree/master/packages/array-standard-deviation)
- [`ML.Array.variance`](https://github.com/mljs/array/tree/master/packages/array-variance)

### [`ML.ArrayXY`](https://github.com/mljs/array-xy)

Functions dealing with an object containing 2 properties x and y, both arrays.

Example:

```
let result = ML.ArrayXY.sortX({x: [2,3,1], y: [4,6,2]});
// result = {x: [1,2,3], y: [2,4,6]}
```

- [ML.ArrayXY.weightedMerge](https://github.com/mljs/array-xy/tree/master/packages/array-xy-weighted-merge): Merge abscissa values on similar ordinates and weight the group of abscissa

- [ML.ArrayXY.maxMerge](https://github.com/mljs/array-xy/tree/master/packages/array-xy-max-merge): Merge abscissa values on similar ordinates and keeps the abscissa with bigger ordinate value
- [ML.ArrayXY.closestX](https://github.com/mljs/array-xy/tree/master/packages/array-xy-closest-x): Get the closest point for a specific abscissa value
- [ML.ArrayXY.centroidsMerge](https://github.com/mljs/array-xy/tree/master/packages/array-xy-centroids-merge): Merge abscissa values if the ordinate value is in a list of centroids
- [ML.ArrayXY.sortX](https://github.com/mljs/array-xy/tree/master/packages/array-xy-sort-x): Sort a set of point based on the abscissas values
- [ML.ArrayXY.maxY](https://github.com/mljs/array-xy/tree/master/packages/array-xy-max-y): Sort a set of point based on the abscissas values
- [ML.ArrayXY.uniqueX](https://github.com/mljs/array-xy/tree/master/packages/array-xy-unique-x): Ensure that x values are unique

### Statistics

- Performance (ROC curve): [`ML.Performance`](https://github.com/mljs/performance)

### Data preprocessing

- Principal component analysis (PCA): [`ML.PrincipalComponentAnalysis`](https://github.com/mljs/pca)
- Savitzky-Golay filter: [`ML.savitzkyGolay`](https://github.com/mljs/savitzky-golay)
- Savitzky-Golay generalized: [`ML.savitzkyGolayGeneralized`](https://github.com/mljs/savitzky-golay-generalized)

### Utility

- Bit array operations: [`ML.BitArray`](https://github.com/mljs/bit-array)
- Hash table: [`ML.HashTable`](https://github.com/mljs/hash-table)
- Pad array: [`ML.padArray`](https://github.com/mljs/pad-array)
- Binary search: [`ML.binarySearch`](https://github.com/darkskyapp/binary-search)
- Number comparison functions for sorting: [`ML.numSort`](https://github.com/sindresorhus/num-sort)
- Random number generation: [`ML.Random`](https://github.com/mljs/random)

## License

[MIT](./LICENSE)