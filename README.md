# mljs

## Usage

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

** Code example **
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