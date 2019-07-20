# Gradient descent method 
* [Back Home](../README.md)

### Dynamic learning ratio for train.
****
>
```js
function lg(){
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
    for(var j=0;j<data[0].length;j++)
    {
      derivativearray.push(0);
    }
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
      ybx=data[i][data[i].length-1]*(-1)*epowersum;
      lnx=Math.log(1+Math.exp(epowersum));
      //calculate the loss value.
      lossv+=ybx+lnx;
      //calculate the step -y(i)+exp(Bx)/1+exp(Bx) 
      y_ebx_1ebx=data[i][data[i].length-1]*(-1)+Math.exp(epowersum)/(1+Math.exp(epowersum));
      for(var j=0;j<data[i].length-1;j++)
      {
        
        derivativearray[j]+=y_ebx_1ebx*data[i][j];
        //console.log(j+" "+derivativearray[j]);
      }
      derivativearray[data[i].length-1]+=y_ebx_1ebx;
      /*
      console.log("data:"+data[i]);
      console.log("sum:"+epowersum);
      console.log("ybx:"+ybx);
      console.log("lnx:"+lnx);
      console.log("y_ebx_1ebx:"+y_ebx_1ebx);
      console.log("derivativearray:"+derivativearray);
      */

    }
    //console.log(derivativearray);
    return [lossv,derivativearray];
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
    console.log(this.weight);
    
    var lossold=0;
    loss2=[];
    var flate_count=0;
    var big_count=0;
    for(var i=0;i<10000;i++)
    {
      loss2=exploss(this.data,this.weight,this.intercept);
      //console.log("loss:"+loss2[0]+" learning ratio:"+this.ratio);

      if(i==0){
        lossold=loss2[0];
        //
        test_step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
        console.log("test_step:"+test_step);
        test_loss=exploss(this.data,test_step[0],test_step[1]);
        console.log("test_loss:"+test_loss);
        var breaknum=0;
        while(test_loss[0] > lossold){
          breaknum++;
          this.ratio=this.ratio/1.5;
          if(this.ratio==0){break;}
          test_step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
          //console.log("test_step:"+test_step);
          test_loss=exploss(this.data,test_step[0],test_step[1]);
          //console.log("test_loss:"+test_loss);
          if(test_loss[0] == lossold)
          {
            break;
          }
          if(breaknum>1000){
            break;
          }
        }
        //
        console.log("The begin ratio is"+this.ratio);
        step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
        this.weight=step[0];
        this.intercept=step[1];
        //
        
      }else if(lossold < loss2[0] )
      {
        big_count++;
        //
        test_loss=loss2;
        while(test_loss[0] > lossold)
        {
          breaknum++;
          this.ratio=this.ratio/1.2;
          if(this.ratio === 0)
          {
            console.log("1ratio is 0");
            break;
          }
          test_step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
          //console.log("test_step:"+test_step);
          test_loss=exploss(this.data,test_step[0],test_step[1]);
          if(this.ratio < Math.pow(10,-10))
          {
            console.log("2ratio is 0");
            console.log("bigger number :"+big_count+" test_loss:"+test_loss);
            break;
          }else{
            console.log("bigger number :"+big_count+" test_loss:"+test_loss);
          }
          
          if(test_loss[0] === lossold)
          {
            console.log("equal");
            break;
          }
          if(this.ratio < Math.pow(10,-10))
          {
            console.log("3ratio is 0");
            break;
          }
        }
        //
        console.log("Bigger The refine ratio is"+this.ratio);
        step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
        this.weight=step[0];
        this.intercept=step[1];
        //
        if(big_count>1000){
          console.log("big counter 1000");
          break;
        }

      }else if(lossold == loss2[0])
      {
        flate_count++;
        //
        test_loss=loss2;
        while(test_loss[0] > lossold){
          breaknum++;
          this.ratio=this.ratio/2;
          
          test_step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
          //console.log("test_step:"+test_step);
          test_loss=exploss(this.data,test_step[0],test_step[1]);
          //console.log("test_loss:"+test_loss);
          if(test_loss[0] == lossold)
          {
            break;
          }
          if(this.ratio == 0)
          {
            break;
          }
        }
        //
        console.log("Equal The refine ratio is"+this.ratio);
        step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
        this.weight=step[0];
        this.intercept=step[1];
        //
        if(flate_count>4)
        {
          console.log("flate count 4");
          break;
        }

      }else{
        lossold=loss2[0];
        step=gradient(loss2[1],this.weight,this.intercept,this.ratio);
        this.weight=step[0];
        this.intercept=step[1];
        this.ratio=this.ratio*1.007;
      }
      if(loss2[0]<Math.pow(10,-7)){
        console.log("loss small 10^-7");
        break;
      }
      
    }
    console.log("loss:"+loss2[0]+" ratio"+this.ratio+" step"+i+" big counter:"+big_count);
    
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