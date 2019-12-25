# add div in div

```html
<!DOCTYPE html>
<html>
<body>

<ul id="myList">
  <li>Coffee</li>
  <li>Tea</li>
</ul>

<p>Click the button to append an item to the end of the list.</p>

<button onclick="xugang()">add div</button>
<button onclick="myFunction()">Try it</button>

<script>
function xugang() {
  var node = document.createElement("div");//create li
    node.setAttribute("id", "Div1");
  document.getElementById("myList").appendChild(node);// add LI into myList
}
</script>

<script>
function myFunction() {
  var node = document.createElement("LI");//create li
  var textnode = document.createTextNode("Water"); //set content
  node.appendChild(textnode);//add into node.
  document.getElementById("myList").appendChild(node);// add LI into myList
}
</script>

<p><strong>Note:</strong><br>First create an LI node,<br> then create a Text node,<br> then append the Text node to the LI node.<br>Finally append the LI node to the list.</p>

</body>
</html>
```
