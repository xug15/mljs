# 2. train model
> 1. use serial learning ratio with 100 iteration to test the best learning ratio.
> 2. use the best learning ratio use serial iterations to select best iterations.
> 3. use the best learning ratio and iteration to generate the model.


**train_model(trainingData[0][1]);**
> use the function train_model(trainingData[0][1]) to train the best model.  
> this function use other functions.  
> loop_learning(learning_ratio,3000,trainingData);  
> trainlogistic(learn_ratio,best_iteration,3,trainingData);  

```js
// train and return model.
function train_model(trainingData){
  var learning_ratio=[1,0.1,0.01,0.001,0.0001,0.00001,0.000001,0.0000001,0.00000001];
  var iteration_array=[100,500,1000,1500,2000,2500,3000,3500];
  var acca=loop_learning(learning_ratio,3000,trainingData);
  console.log(acca);
  var learn_ratio=learning_ratio[indexOfMax(acca)];
  var best_ratio=learn_ratio;
  console.log("index of max "+indexOfMax(acca)+" best learning ratio:"+learning_ratio[indexOfMax(acca)]+"\n\n");
  var acca_iteration=[];
for(var i=0;i<iteration_array.length;i++){
  console.log(iteration_array[i]);
  var a=trainlogistic(learn_ratio,iteration_array[i],0,trainingData);
  acca_iteration.push(a);
}
  var best_iteration=iteration_array[indexOfMax(acca_iteration)];
  console.log("Best iteration:"+best_iteration+" Best ratio:"+best_ratio);
  var modelbest=trainlogistic(learn_ratio,best_iteration,3,trainingData);
  return modelbest;
}
```

**trainlogistic(a,b,c,data)**
> use this function to train logistic regression model. a is the learning ratio, b is iteration, c is report other information or not c default is false,c=0 report accurarcy; c=2 is, report predict probability,  c=3,report classifier, data is the train data.

```js
function trainlogistic(a,b,c,data)
{
  //a is learning ration
  //b is iterations
  //c is report other information or not c default is false,c=0 report accurarcy; c=2 is, report predict probability,  c=3,report classifier, 
  // data is the train data.

  
  if(b===undefined){
    b=100;
  }
  if(c===undefined){
    c=false;
    d=false;
  }else if(c==0)
  {
    c=false;
    d=false;
  }else if(c==2){
    c=true;
    d=true;
  }else if(c==3){
    c=false;
    d=3;
  }
  else{
    console.log(a);
    c=true;
    d=false;
  }
  classifier = new LSRE.LogisticRegression({
   alpha: a,
   iterations: b,
   lambda: 0.0
});

result = classifier.fit(data);

if(c){
  console.log(result);
}
  var probability=[];
  var correct=0;
  var wronge=0;
  for(var i=0; i < data.length; ++i){
   var predicted_probability = classifier.transform(data[i]);
   var predicted = classifier.transform(data[i]) >= classifier.threshold ? 1 : 0;
   /*
   if(c){
    console.log("probability:"+predicted_probability+" predict:"+predicted+" label:"+data[i][data[i].length-1]);
   }
   */
  probability.push(predicted_probability);


   if(data[i][data[i].length-1]==predicted){
    correct++;
   }else{
     wronge++;
   }
   //console.log(" actual: " + merge_array[i][4] + " predicted: " + predicted);
  }
  var ratio=correct/(correct+wronge);

  console.log("Accuracy: "+ratio);
  if(d==3){
    return classifier;
  }else if(d){
    return probability;
  }else{
    return ratio;
  }
  
}
```


**1. use serial learning ratio with 100 iteration to test the best learning ratio.**   
**loop_learning(learning_ratio,3000,trainingData);**  
> This function use the learning ratio array. use the each learning ratio and return the accuracy.
```js

function loop_learning(a,b,c){
  //a is learning ratio array.
  //b is iteration
  //c is data.
  //d is function.
  var acca=[];
  for (var i=0;i<a.length;i++){
    var acc=trainlogistic(a[i],b,0,c);
    acca.push(acc);
  }
  return acca;
}
  var learning_ratio=[1,0.1,0.01,0.001,0.0001,0.00001,0.000001,0.0000001,0.00000001];
  var iteration_array=[100,500,1000,1500,2000,2500,3000,3500];
  var acca=loop_learning(learning_ratio,3000,trainingData);
  console.log(acca);
  var learn_ratio=learning_ratio[indexOfMax(acca)];
  var best_ratio=learn_ratio;
  console.log("index of max "+indexOfMax(acca)+" best learning ratio:"+learning_ratio[indexOfMax(acca)]+"\n\n");
```
**2. use the best learning ratio use serial iterations to select best iterations.**  
> use the different iteration and select highest iterations.
```js
  var acca_iteration=[];
for(var i=0;i<iteration_array.length;i++){
  console.log(iteration_array[i]);
  var a=trainlogistic(learn_ratio,iteration_array[i],0,trainingData);
  acca_iteration.push(a);
}
  var best_iteration=iteration_array[indexOfMax(acca_iteration)];
```
**3. use the best learning ratio and iteration to generate the model.**  

```js
  var modelbest=trainlogistic(learn_ratio,best_iteration,3,trainingData);
  return modelbest;
```