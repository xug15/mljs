# Write code 
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