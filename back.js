// our training set (X,Y)
var X = new ML.Matrix([[0,-1], [1,0], [1,1], [1,-1], [2,0], [2,1], [2,-1], [3,2], [10,4], [11,3], [11,4], [11,5], [12,3], [12,4], [12,5], [13,4], [11, 10], [11, 12], [12, 10]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

// the test set (Xtest, Ytest)
var Xtest = new ML.Matrix([[0, -2], [1, 0.5], [1.5, -1], [1, 2.5], [2, 3.5], [1.5, 4]])
var Ytest = ML.Matrix.columnVector([0, 0, 0, 1, 1, 1]);

// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);

// we try to predict the test set
var finalResults = logreg.predict(Xtest);
// Now, you can compare finalResults with the Ytest, which is what you wanted to have.
logreg.toJSON()
[-0.05954417984338776, 0.8434233722681644]
[0.05954417984338771, -0.8434233722681642]



// our training set (X,Y)
var X = new ML.Matrix([[0,-1], [1,0], [1,1], [1,-1], [2,0], [2,1], [2,-1], [3,2], [10,4], [11,3], [11,4], [11,5], [12,3], [12,4], [12,5], [13,4], [11, 10], [11, 12], [12, 10], [112, 10], [121, 10], [121, 10], [112, 10]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,2,2,2,2]);

// the test set (Xtest, Ytest)
var Xtest = new ML.Matrix([[0, -2], [1, 0.5], [1.5, -1], [1, 2.5], [2, 3.5], [1.5, 4]])
var Ytest = ML.Matrix.columnVector([0, 0, 0, 1, 1, 1]);

// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);

// we try to predict the test set
var finalResults = logreg.predict(Xtest);
// Now, you can compare finalResults with the Ytest, which is what you wanted to have.
logreg.toJSON()
[-0.009389900810404554, 0.7260133727755587]
[0.1397502638169355, -1.0420803750009429]
[-0.13403077719361928, 1.3520255442482518]

// our training set (X,Y)
var X = new ML.Matrix([[0,-1], [1,0], [1,1], [1,-1], [2,0], [2,1], [2,-1], [3,2], [0,4], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5], [3,4]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]);

// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);

logreg.toJSON()

[-3.0218149910123713, 2.8246414225572694]
[3.0218149910123713, -2.8246414225572694]


// our training set (X,Y)
var X = new ML.Matrix([[0], [1], [1], [1], [2], [2], [2], [3]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0]);

// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);

logreg.toJSON()
[-2.9300398154243847]



// our training set (X,Y)
var X = new ML.Matrix([[0], [1], [3], [4], [5], [6], [6], [7], [10], [111], [121], [411], [3312], [512], [812], [113]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]);

// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);
var Xtest = new ML.Matrix([[0], [1], [1.5], [1], [2], [1.5] ])
logreg.predict(Xtest);

logreg.toJSON()

[0.21375077534399556]
[-0.21375077534399553]





// our training set (X,Y)
var X = new ML.Matrix([[0], [1], [2], [3], [4], [5], [6], [7], [10], [11], [21], [41], [82], [112], [712], [913]]);
var Y = ML.Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2]);
var Xtest = new ML.Matrix([[0], [1], [15], [111], [700], [1005] ])
// we will train our model
var logreg = new LG({numSteps: 1000, learningRate: 5e-3});
logreg.train(X,Y);
logreg.predict(Xtest);
logreg.toJSON()

[0.21375077534399556]
[-0.21375077534399553]


function logist(a,b){
    y1=1/( 1+(Math.exp( -1*(0.21788204158842128*a+0.04289269589918818*b+1) ) ) );
    y2=1/( 1+(Math.exp( -1*(0.051404067247221095*a+1) ) ) );
    y3=1/( 1+(Math.exp( -1*(0.0010145403339779369*a+1) ) ) );
    return [y1,y2,y3];
}



