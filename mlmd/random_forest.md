# Random forest 
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
  classifier_randomforest = new ML.RandomForestClassifier(options);

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