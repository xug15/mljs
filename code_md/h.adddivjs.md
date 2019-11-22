# Add or remove HTML inside div using Javascript

**This is my basic HTML structure:**

```html
<input type="button" value="+" onclick="addRow()">

<div id="content">

</div>
```

**JavaScript code.**

```js
function addRow() {
  const div = document.createElement('div');

  div.className = 'row';

  div.innerHTML = `
    <input type="text" name="name" value="" />
    <input type="text" name="value" value="" />
    <label> 
      <input type="checkbox" name="check" value="1" /> Checked? 
    </label>
    <input type="button" value="-" onclick="removeRow(this)" />
  `;

  document.getElementById('content').appendChild(div);
}

function removeRow(input) {
  document.getElementById('content').removeChild(input.parentNode);
}
```


**This is what I want to add inside the content div:**

```html
<input type="text" name="name" value="" />
<input type="text" name="value" value="" />
<label><input type="checkbox" name="check" value="1" />Checked?</label>
<input type="button" value="-" onclick="removeRow()">
```

