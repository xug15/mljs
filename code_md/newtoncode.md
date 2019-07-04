# Newton method
### 
![](image/newton.png)

```js
function newtonlg(){
  this.weight=[];
  this.intercept=Math.random();
  this.loss=[];
  this.ratio=1;

  function exploss(data,weight,intercept)
  {
    var lossv=0;
    var lossarray=[];
    var epowersumarray=[];
    var exp2_exp3=0;
    var exp1_exp2=0;
    var derivativearray=[];
    var derivativeone=[];
    var hessematrix=[];
    var old_beta=JSON.parse(JSON.stringify(weight));
    old_beta.push(intercept);
    //initialize the derivative array and hessematrix.
    for(var j=0;j<data[0].length;j++)
    {
      derivativearray.push(0);
      derivativeone.push(0);
      var row=[];
      for(var i=0;i<data[0].length;i++){
        row.push(0);
      }
      hessematrix.push(row);
    }
    //console.log(derivativearray);
    //console.log(hessematrix);
    for(var i=0;i<data.length;i++)
    {
      var ybx=0;
      var lnx=0;
      var losssinge=0;
      epowersum=0;
      var y_ebx_1ebx=0;
      for(var j=0;j<data[i].length-1;j++)
      {
        epowersum+=data[i][j]*weight[j];
      }
      epowersum+=intercept;
      //caculate p1 and p0
      var p1=Math.exp(epowersum)/(1+Math.exp(epowersum));
      var p0=1/(1+Math.exp(epowersum));
      //ybx=-y(i)beta*x
      ybx=data[i][data[i].length-1]*(-1)*epowersum;
      //lnx=ln(1+e^beta*x)
      lnx=Math.log(1+Math.exp(epowersum));
      //calculate the loss value. loss value=foreach[-y(i)beatax+ln(1+e^betax)]
      lossv+=ybx+lnx;
      //calculate the step -y(i)+exp(Bx)/1+exp(Bx) 
      y_ebx_1ebx=data[i][data[i].length-1]*(-1)+Math.exp(epowersum)/(1+Math.exp(epowersum));
      for(var j=0;j<data[i].length-1;j++)
      {
        //
        derivativearray[j]+=y_ebx_1ebx*data[i][j];
        //console.log(j+" "+derivativearray[j]);
      }
      derivativearray[data[i].length-1]+=y_ebx_1ebx;
      
      for(var j=0;j<data[i].length-1;j++)
      {
        //console.log(j);
        for(var k=0;k<data[i].length-1;k++)
        {
          var sum=data[i][j]*data[i][k]*p1*p0;
          //console.log("order:"+i+" data:"+data[i]+" ij:"+data[i][j]+" ik:"+data[i][k]+" "+sum);
          hessematrix[j][k]+=sum;
          
        }
        var sum=data[i][j]*p1*p0;
        hessematrix[j][k]+=sum;
      }
      for(var k=0;k<data[i].length-1;k++)
        {
          var sum=data[i][k]*p1*p0;
          //console.log("order:"+i+" data:"+data[i]+" ij:"+data[i][j]+" ik:"+data[i][k]+" "+sum);
          hessematrix[j][k]+=sum;
          
        }
        var sum=p1*p0;
        hessematrix[j][k]+=sum;
      //console.log(hessematrix);
      /*
      console.log("data:"+data[i]);
      console.log("sum:"+epowersum);
      console.log("ybx:"+ybx);
      console.log("lnx:"+lnx);
      console.log("y_ebx_1ebx:"+y_ebx_1ebx);
      console.log("derivativearray:"+derivativearray);
      //mini
      */

    }
    //console.log(derivativearray);
    //calculate derivate of first
    //math.multiply();
    var hesse_inv=math.inv(hessematrix);
    //calculate the point the derivate vlaue.
    var deriavte_value=math.multiply(derivativearray,old_beta);
    //return the update value.
    var step=math.multiply(derivativearray,hesse_inv);
    var update=[];
    for(var i=0;i<step.length;i++)
    {
      update.push(old_beta[i]-step[i]);
    }
    //return [lossv,derivativearray,deriavte_value,old_beta,hessematrix,hesse_inv,step,update];
    return[deriavte_value,update,lossv];
    //return derivativearray;
  }

  function gradient(array,weight,intercept,ratio){
    //console.log("gradient:"+array+typeof(array)+" weight:"+weight+typeof(weight)+" intercept:"+intercept);

    weight_new=[];
    intercept_new=[];
    for(var i in weight){
      //console.log(i+" weight:"+weight[i]+" change:"+array[i]+" ratio:"+ratio);
      //console.log(weight[i]-array[i]*ratio);
      weight_new.push(weight[i]-array[i]*ratio);
    }
    
    intercept_new=intercept-array[array.length-1]*ratio;
    //console.log("weight new:"+weight_new+" intercept new:"+intercept_new);
    return [weight_new,intercept_new];
  }


  this.fit=function(data){
    this.data=data;
    this.variable_number=data[0].length-1;
    this.labelindex=this.variable_number;
    for(var i=0;i<this.variable_number;i++)
    {
      this.weight.push(0);
    }
    for(var j=0;j<this.data.length;j++)
    {
      for(var i=0;i<this.variable_number;i++)
      {
        this.weight[i]+=data[j][i];
      }
    }
    for(var i=0;i<this.variable_number;i++)
    {
      this.weight[i]=1/this.weight[i];
      //this.weight[i]=Math.random();
    }
    //console.log(this.weight);
    
    var lossold=0;
    loss2=[];
    var flate_count=0;
    var big_count=0;
    for(var j=0;j<70;j++)
    {
      loss2=exploss(this.data,this.weight,this.intercept);
      console.log(loss2);
      if(Math.abs(loss2[0])<1.0e-13){
        break;
        }
      for(var i=0;i<loss2[1].length-1;i++)
      {
        this.weight[i]=loss2[1][i];
      }
      this.intercept=loss2[1][i];
    }
    
  }
  this.predict=function (array)
  {
    var powersum=0;
    for(var i=0;i<array.length-1;i++)
      {
        powersum+=this.weight[i]*array[i];
      }
      powersum+=this.intercept;
      var pro=Math.exp(powersum)/(Math.exp(powersum)+1);
      return [powersum,pro];
  }
  this.transform=function (array)
  {
    var powersum=0;
    for(var i=0;i<array.length-1;i++)
      {
        powersum+=this.weight[i]*array[i];
      }
      powersum+=this.intercept;
      var pro=Math.exp(powersum)/(Math.exp(powersum)+1);
      return pro;
  }
}
```