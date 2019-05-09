new_element=document.createElement("script");
 new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","d3.v4.js");
 document.body.appendChild(new_element);
<script type="text/javascript">
		var width = 800,
			height = 1000,
			padding = 50,
			svg,
			day,//存储读取到的day的数据
			people = [],//存储对应时间节点时最新的各个人员的位置
			index = [],//便于快速查找数据
			curr = 0,//便于快速查找数据
			tmpData = d3.range(31),
			tmpData2 = d3.range(17)
			p= 40,//内边距
			xScale= d3.scaleLinear().domain([0, 30]).range([p, width - p]), //(2) 定义x和y比例尺
			gridSize = xScale(1)-xScale(0),
			peopleSize = 6,
			floor1 = [],//第一层的所有人
			floor2 = [];//第二层的所有人
		var	grids1, grids2;
		//days数据的转换函数
		var rowConventerDay = function (d) {
			return {
				id: parseInt(d.id),
				sid: parseInt(d.sid),
				time: parseInt(d.time),
				x: parseInt(d.x),
				y: parseInt(d.y),
				floor: parseInt(d.floor)
			};
		}
		svg = d3.select("svg");
		d3.csv("day1.csv", rowConventerDay, function (dataday) {
			day=dataday;
			var time = 48000;
			getTimeIn(day, time);
			for (var i = 0; i < people.length; i++) {
				if(people[i].floor==1)
					floor1.push(people[i]);
				else
					floor2.push(people[i]);
			}
			drawGrids(1);
			draws(floor1);
			drawGrids(2);
			draws(floor2);
		});
//填充区域划分的颜色
var p= 40,//内边距
var xScale= d3.scaleLinear().domain([0, 30]).range([p, width - p]),
var gridSize=xScale(1)-xScale(0),
		//#D4D4D4 无传感器区域
		var wcgqx=[
		0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,
		0,1,2,3,4,5,6,7,8,9,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,12,13,14,29,
		0,1,2,3,4,5,12,13,14,29,
		0,1,2,3,4,5,12,13,14,29,
		0,29,
		29,
		0,29,
		0,1,3,6,8,9,10,11,12,13,14,16,18,29
		];
		var wcgqy=[
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		1,1,1,1,1,1,1,1,1,1,1,
		2,2,2,2,2,
		3,3,3,3,3,
		4,4,4,4,4,
		5,5,5,5,5,
		6,6,6,6,6,
		7,7,7,7,7,
		8,8,8,8,8,
		9,9,9,9,9,
		10,10,10,10,10,10,10,10,10,10,
		11,11,11,11,11,11,11,11,11,11,
		12,12,
		13,
		14,14,
		15,15,15,15,15,15,15,15,15,15,15,15,15,15
		];
		var wcgqSize=119;
		for(i=0;i<wcgqSize;i++){
		var rect =svg.append("rect")
			.attr("x",p+wcgqx[i]*gridSize)
			.attr("y",p+wcgqy[i]*gridSize)
			.attr("width",gridSize)
			.attr("height",gridSize)
			.attr("fill","#D4D4D4")
		}
		
		//##D4D4D4 无传感器区域-floor2
		var wcgqx2=[
		0,1,2,3,4,5,6,7,8,9,10,11,
		0,1,2,3,4,5,6,7,8,9,
		0,
		0,
		0,
		0,
		0,
		0,
		0,10,11,
		0,10,11,
		0,10,11,
		0,10,11,
		0,1,2,3,4,5,
		6,7,8,9,10,11
		];
		var wcgqy2=[
		0,0,0,0,0,0,0,0,0,0,0,0,
		1,1,1,1,1,1,1,1,1,1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,8,8,
		9,9,9,
		10,10,10,
		11,11,11,
		12,12,12,12,12,12,
		15,15,15,15,15,15
		
		];
		var wcgqSize2=52;
		for(i=0;i<wcgqSize2;i++){
		var rect =svg.append("rect")
			.attr("x",p+wcgqx2[i]*gridSize)
			.attr("y",464+wcgqy2[i]*gridSize)
			.attr("width",gridSize)
			.attr("height",gridSize)
			.attr("fill","#D4D4D4")
		}
	    var rect =svg.append("rect")
			.attr("x",p+12*gridSize)
			.attr("y",464+0*gridSize)
			.attr("width",gridSize*18)
			.attr("height",gridSize*16)
			.attr("fill","#D4D4D4")
		//##000000 扶梯
		var futix=[10,11,10,11];
		var futiy=[1,1,14,14];
		var futiSize=4;
		for(i=0;i<futiSize;i++){
		var rect =svg.append("rect")
			.attr("x",p+futix[i]*gridSize)
			.attr("y",p+futiy[i]*gridSize)
			.attr("width",gridSize)
			.attr("height",gridSize)
			.attr("fill","#000000")
		var rect =svg.append("rect")
			.attr("x",p+futix[i]*gridSize)
			.attr("y",464+futiy[i]*gridSize)
			.attr("width",gridSize)
			.attr("height",gridSize)
			.attr("fill","#000000")
		}
		//##EEEED1 分会场A
	    var rect =svg.append("rect")
			.attr("x",p+1*gridSize)
			.attr("y",p+2*gridSize)
			.attr("width",5*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEEED1")
		//##EEE8AA 分会场B
	    var rect =svg.append("rect")
			.attr("x",p+1*gridSize)
			.attr("y",p+4*gridSize)
			.attr("width",5*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEE8AA")	
		//##EEE685 分会场C
		var rect =svg.append("rect")
			.attr("x",p+1*gridSize)
			.attr("y",p+6*gridSize)
			.attr("width",5*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEE685")	
		//##EEEE00 分会场D
		var rect =svg.append("rect")
			.attr("x",p+1*gridSize)
			.attr("y",p+8*gridSize)
			.attr("width",5*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEEE00")	
		//##A52A2A 签到
		var rect =svg.append("rect")
			.attr("x",p+2*gridSize)
			.attr("y",p+12*gridSize)
			.attr("width",4*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#A52A2A")	
		//##E0FFFF 海报
		var rect =svg.append("rect")
			.attr("x",p+7*gridSize)
			.attr("y",p+3*gridSize)
			.attr("width",2*gridSize)
			.attr("height",8*gridSize)
			.attr("fill","#E0FFFF")	
		//##A0522D 厕所
		var rect =svg.append("rect")
			.attr("x",p+10*gridSize)
			.attr("y",p+4*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#A0522D")	
		var rect =svg.append("rect")
			.attr("x",p+27*gridSize)
			.attr("y",p+14*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#A0522D")	
		var rect =svg.append("rect")
			.attr("x",p+10*gridSize)
			.attr("y",465+4*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#A0522D")	
		//##43CD80 服务台
		var rect =svg.append("rect")
			.attr("x",p+19*gridSize)
			.attr("y",p+14*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#43CD80")	
		//##EEE0E5 room1
		var rect =svg.append("rect")
			.attr("x",p+10*gridSize)
			.attr("y",p+6*gridSize)
			.attr("width",2*gridSize)
			.attr("height",4*gridSize)
			.attr("fill","#EEE0E5")	
		//##EED5D2 room2
		var rect =svg.append("rect")
			.attr("x",p+10*gridSize)
			.attr("y",p+10*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EED5D2")	
		//##EEE0E5 room3
		var rect =svg.append("rect")
			.attr("x",p+21*gridSize)
			.attr("y",p+14*gridSize)
			.attr("width",4*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEE0E5")
		//##EED5D2 room4
		var rect =svg.append("rect")
			.attr("x",p+25*gridSize)
			.attr("y",p+14*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EED5D2")
		//##CAFF10 展厅
		var rect =svg.append("rect")
			.attr("x",p+15*gridSize)
			.attr("y",p+2*gridSize)
			.attr("width",4*gridSize)
			.attr("height",10*gridSize)
			.attr("fill","#CAFF10")
		//##B4EEB4 主会场
		var rect =svg.append("rect")
			.attr("x",p+19*gridSize)
			.attr("y",p+2*gridSize)
			.attr("width",10*gridSize)
			.attr("height",10*gridSize)
			.attr("fill","#B4EEB4")
		//##90EE90 餐厅
		var rect =svg.append("rect")
			.attr("x",p+1*gridSize)
			.attr("y",465+2*gridSize)
			.attr("width",5*gridSize)
			.attr("height",8*gridSize)
			.attr("fill","#90EE90")	
		//##EEE0E5 room5
		var rect =svg.append("rect")
			.attr("x",p+1*gridSize)
			.attr("y",465+10*gridSize)
			.attr("width",5*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEE0E5")	
		//##EEE0E5 room6
		var rect =svg.append("rect")
			.attr("x",p+10*gridSize)
			.attr("y",465+6*gridSize)
			.attr("width",2*gridSize)
			.attr("height",2*gridSize)
			.attr("fill","#EEE0E5")	
		//##D15FEE 休闲区
		var rect =svg.append("rect")
			.attr("x",p+0*gridSize)
			.attr("y",465+13*gridSize)
			.attr("width",6*gridSize)
			.attr("height",3*gridSize)
			.attr("fill","#D15FEE")	
		//##00FA9A 出入口
		var crx=[0 ,2 , 4, 5, 7,15,17,19];
		var cry=[13,15,15,15,15,15,15,0 ];
		var futiSize=8;
		for(i=0;i<futiSize;i++){
		var rect =svg.append("rect")
			.attr("x",p+crx[i]*gridSize)
			.attr("y",p+cry[i]*gridSize)
			.attr("width",gridSize)
			.attr("height",gridSize)
			.attr("fill","#00FA9A")
}