# Generate file to download.

```js
// this function can create filename, to download. 
// the text is the content to download.
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
// download('abc.txt','a');
// This function is use download function auto read file content.
function data_transfer_json()
{
var json_name=document.getElementById('generate_name').value;
var data= getinforvalue('training_decision');
var data_con=JSON.stringify(data);
var label=getinforlabel('label_decision');
var label_con=JSON.stringify(label);
var name=JSON.stringify(feature_name_array);
var content=json_name+"data="+data_con+";\n";
content+=json_name+"label="+label_con+";\n";
content+=json_name+"featurename="+name+";\n";
download(json_name+'.js',content);
return content;
}

```

# Load js 

```js
   function include(url)
  {
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", url);
    var nodes = document.getElementsByTagName("*");
    var node = nodes[nodes.length -1].parentNode;
    node.appendChild(s);
  }
  include("datasource/GSE71008/GSE71008.lncRNA.js")
```


