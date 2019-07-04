# PCA analysis

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