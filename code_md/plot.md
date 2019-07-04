# Plot

```js
//
function plot_roc(data,id){
  //data is [[[name][condition][fpr][tpr]],[...]]
		var data_dir=[];
		var color_plot=['#ffa502','#2ed573','#1e90ff','#ba154d','#8aa77e','#f9cd0f','#028d2f','#006958','#551956','	#8c163e','#ee7f1d','#fbc0c0','#cadb74'];
		for (var i=0;i<data.length;i++)
		{
			data_dir[i]={
				x:data[i][2],
				y:data[i][3],
				mode: 'lines',
				name:data[i][0]+' AUC '+data[i][1],
				line: 
						{
    					dash: 'solid',
							width: 2,
							color:color_plot[i], 
  					}
			};
		}
		data_dir[i]={
				x:[0, 1],
				y: [0, 1],
				mode: 'lines',
				name:'dot',
				showlegend: false,
				line: 
						{
    					dash: 'dot',
							width: 2,
							color:'#828282',
  					}
			};
			var layout = {
				legend: {
				x: 0.6,
				y: 0.1,
				bgcolor: '#ffffff',
    		bordercolor: '#dadada',
    		borderwidth: 1
				},
				title: {
				text:' Receiver operating characteristic',
				},
				xaxis: 
				{
    		title: {
      		text: 'False Positive Rate',
					}
				},
				yaxis: {
    			title: {
      		text: 'True Positive Rate',
						}
					},
				autosize: false,
				width: 550,
				height: 600,
				margin: {
					l: 50,
					r: 50,
					b: 100,
					t: 100,
					pad: 4
				}
				
			};
			Plotly.newPlot(id, data_dir, layout, {showSendToCloud: true});
		}
 
```