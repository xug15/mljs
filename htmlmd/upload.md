# Upload code
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
