# Decision tree
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