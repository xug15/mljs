trainingData[2][1]
classifier.transform([5.1,3.5,1.4,0.2])
classifier.transform([5.9,3,5.1,1.8])
classifier.theta
[-0.08801661035951336, -0.214699881942101, -0.27809298979241615, 0.3588691493722146, 0.21994409719725355]
0.4795010425647269

lg1=new lg();
lg1.fit(trainingData[2][1])
lg1.predict([5.1,3.5,1.4,0.2])
lg1.predict([5.9,3,5.1,1.8])


a=[[1,2,113,124,1],[1,2,113,314,1],[116,112,3,4,0],[216,112,1,1,0],[116,112,5,1,0]]
lg1=new lg();
lg1.fit(a)
lg1.loss
lg1.weight
lg1.intercept
lg1.predict([1,2,113,124,1])
lg1.predict([116,112,3,4,0])

weight=[2.504913e-01,4.688954e-02,1.126459e+00,9.918228e-02,2.094716e-02,1.098888e-01,-3.341745e-02,4.034431e-04,2.531428e-03];
intercept=-2.411648e+01;

[0.010815555380264104, 0.008889150957244681, 0.04491310464151249, -0.030796310533470705, 0.04348158101998041, -0.042939539698597894, 0.07129379232625092, -0.011389154932319335, -0.0008339649203488361]
[0.2504913, 0.04688954, 1.126459, 0.09918228, 0.02094716, 0.1098888, -0.03341745, 0.0004034431, 0.002531428]
1 65 5.872173 34.80390  55.0 106  36 134.0   93

2.504913e-01*1+4.688954e-02*65+1.126459e+00*5.872173+9.918228e-02*34.80390+2.094716e-02*55.0+1.098888e-01*106-3.341745e-02*36+4.034431e-04*134.0+2.531428e-03*93-2.411648e+01

/*
lg1.weight=weight
lg1.intercept=intercept
trainingData[1][1][0]
for(var i=0;i<trainingData[1][1].length;i++){
  console.log(lg1.predict(trainingData[1][1][i]));
}
var pro_test=[];
for(var i=0;i<trainingData[1][1].length;i++){
  console.log(lg1.transform(trainingData[1][1][i]));
pro_test.push(lg1.transform(trainingData[1][1][i]));
}

cutoff_test=cutoff(pro_test)

deterlabel_test=mljs_determin_label(pro_test,cutoff_test);
cross_test=mljs_label_cross(trainingLabel[1][1],deterlabel_test);

mljs_label_cross_test(trainingLabel[1][1],[deterlabel_test[624]]);

cutoff_test[624];
deterlabel_test[624];
pro_test
for(var i=0;i<deterlabel_test[624].length;i++){
    console.log(i+"\t"+deterlabel_test[624][i]);
}
*/

388.27918559267044
387.15649371528343



