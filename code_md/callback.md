# call back
```js
function doHomework(subject, callback) {

  console.log(`Starting my ${subject} homework.`);  
  callback();
  console.log('Finished');
  
}


function alertFinished(){
    console.log("pro begin");
  for(i=0;i<1000000000;i++){
    // do something
  }
  console.log("pro end");

}
alertFinished()
doHomework('math', alertFinished);

function doHomework_new(subject) {
    
  console.log(`Starting my ${subject} homework.`);
    alertFinished()
  console.log('Finished');
  
}

doHomework_new('math');


function firstFunction(_callback){
    // do some asynchronous work
    // and when the asynchronous stuff is complete
    setTimeout( function(){
    console.log('processing');
    }, 500 );
    _callback();    
}

function secondFunction(){
    // call first function and pass in a callback function which
    // first function runs when it has completed
    firstFunction(function() {
        console.log('huzzah, I\'m done!');
    });    
}

firstFunction(secondFunction);
```
  
 ```js
 var isPaused = false;

function firstFunction(){
    isPaused = true;
    for(i=0;i<x;i++){
        // do something
    }
    isPaused = false;
};

function secondFunction(){
    firstFunction()

    alert("Here");

    function waitForIt(){
        if (isPaused) {
            setTimeout(function(){waitForIt()},100);
        } else {
            // go do that thing
        };
    }
};
 ```

 ```js
async function firstFunction(){
    console.log("processing begin");
  for(i=0;i<100000;i++){
    // do something

  }
  console.log("processing end");
  return;
};
async function secondFunction(){
  await firstFunction();
  // now wait for firstFunction to finish...
  // do something else
  console.log("finished");
};
secondFunction()
 ```