// JavaScript Document
/*

	1.创建对象  键值对
	2.判断游戏状态
	3.游戏结束时，发生的事件
	4.游戏开始时
	5.数字随机生成
	6.更新数字
	7.向左移动时，发生的事件
	8.向右移动
	9.向上移动
	10.向下移动
	11.最后 键盘属性 事件

*/
var game={
	data:[],//创建二维数组，存放数据
	rn:4,//行数 4
	cn:4,//列数 4
	score:0,//  分数初始值为0
	state:0,// 判断游戏的状态，RUNNING\\GameOver
	RUNNING:1,
	GAMEOVER:0,

	/*判断游戏结束时，数组已经填满*/
	isGameOver:function(){
		//如果数组没有填满
		if(!this.isFull()){
			return false;//游戏继续
		}else{
			//数组填满了,遍历数组
			for(var row=0;row<this.rn;row++){
				for(var col=0;col<this.cn;col++){
					//最右侧的元素 c03，c13，c23，c33.最右一列
					if(col<this.cn-1){
						//如果当前元素==最右侧的元素，游戏继续  c00 =c01 ，c01 =c02 ， c02 = c03
						if(this.data[row][col]==this.data[row][col+1]){
							return false;
						}
					}
					//最下边的元素 c30,c31,c32,c33,最后一行
					if(row<this.rn-1){
						//如果当前元素==最下边的元素，游戏继续   c00=c10， c01=c11 ，c02=c12 ，c03=c13
						if(this.data[row][col]==this.data[row+1][col]){
							return false;
						}
					}
				}
			}return true;//游戏结束
		}
	},
	
	/*游戏开始时*/
	start:function(){
		//游戏开始
		this.state=this.RUNNING;
		//找到游戏结束提示界面，隐藏
		var div=document.getElementById("gameOver");
	  div.style.display = "none";
		//初始化二维数组
		this.data=[
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		//重新定义score为0
		this.score=0;
		//随机生成2或4
		this.randomNum();
		this.randomNum();
		//将数字更新到页面上
		this.updateView();
	},
		/*判断二维数组是否填满*/
		isFull:function(){
			for(var row=0;row<this.rn;row++){
				for(var col=0;col<this.cn;col++){
					//当前数组为0
					if(this.data[row][col]==0){
						return false;//则表示，数组没有填满，游戏继续
					}
				}
			 }
			 //循环正常退出
			 return true;//表示数组已经填满，游戏退出
		},
		
	
	/*随机生成数字2和数字4*/
	randomNum:function(){
		//是在数组没有满的时候，随机生成
		if(!this.isFull()){
			while(true){//没有满，结果为真,进行循环
				//得到随机行列
				var row=parseInt(Math.random()*this.rn);
				var col=parseInt(Math.random()*this.cn);
				//判断随机生成的行列，有没有值。没有值，就赋值
				if(this.data[row][col]==0){
					this.data[row][col]=Math.random()<0.5?2:4;//条件成立，则输出2，反之输出4
					break;//退出循环
				}
			}
		}
	},
	/*更新数字和显示提示面板*/
	// updateView:function(){
	// 	//得到数组 那行那列 再进行修改
	// 	for(var row=0;row<this.rn;row++){
	// 		for(var col=0;col<this.cn;col++){
	// 			var div=document.getElementById("c"+row+col);//得到行列
	// 			var curr=this.data[row][col];//得到当前数组的值
				
	// 			div.innerHTML=curr!=0?curr:"";//改变 得到的行列 的div里面的值
				
	// 			div.className=curr!=0?"cell n"+curr:"cell";//修改class属性 改变 得到行列 div值的背景颜色
	// 		}
	// 	}
	// 	//得到score//改变score的值
	// 	var span = document.getElementById("score");
	// 	span.innerHTML=this.score;
	// 	//游戏结束，显示提示面板
	// 	if(this.isGameOver()){
	// 		this.state=this.GAMEOVER;
	// 		var div=document.getElementById("gameOver");
	// 		var span=document.getElementById("finalScore");
	// 		span.innerHTML=this.score;
	// 		div.style.display = "block";
	// 	}
		
	// },

	updateView:function(){
		//将二维数组中每个格的数字放入前景格中
		//遍历二维数组中每个元素,比如:row=2,col=3, 16
		for(var row=0;row<this.rn;row++){
			for(var col=0;col<this.cn;col++){
				/*网页中一切元素，属性，文字都是对象*/
				var div=document.getElementById("c"+row+col); 
																			 //"c23"
				var curr=this.data[row][col]; //当前元素值
				//修改div开始标签和结束标签之间的内容
				div.innerHTML=curr!=0?curr:"";
				//修改div的class属性
					div.className=curr!=0?"cell n"+curr:"cell"
				//   class
			}
		}
			var span=document.getElementById("score");
			span.innerHTML=this.score;
		
			//判断并修改游戏状态为GAMEOVER
			if(this.isGameOver()){
				this.state=this.GAMEOVER;
				var div=document.getElementById("gameOver");
				var span=document.getElementById("finalScore");
				span.innerHTML=this.score;
			//修改div的style属性下的display子属性为"block"
				div.style.display="block";
			}
		
			},
	
	/*向左移动*/
	// 找到当前位置右侧，下一个不为零的数
	getRightNext:function(row,col){
		// 从col+1开始，遍历row行中剩余元素，<cn 结束
		for(var nextc = col+1;nextc<this.cn;nextc++){
			// 如果遍历到的元素 !=0
			if(this.data[row][nextc]!=0){
				// 就返回nextc
				return nextc;
			}
		}
		return -1;  // 循环正常退出 返回-1
	},
	// 判断并左移指定行中的每个元素
	moveLeftInRow: function (row){
		for(var col=0;col<this.cn-1;col++){
			// 获得当前元素不为零的元素的小标 nextc
			var nextc = this.getRightNext(row,col);
			if(nextc == -1){
				break;
			}else{
				if(this.data[row][col] == 0){
					this.data[row][col]=this.data[row][nextc];
					this.data[row][nextc] = 0;
					col--;
				}else if(this.data[row][col] == this.data[row][nextc]){
					this.data[row][col] *= 2;
					this.data[row][nextc] = 0;
					this.score += this.data[row][col];
				}
			}
		}
	},
	// 移动所有行
	moveLeft:function(){
		var oldStr = this.data.toString();
		for(var row = 0;row<this.rn;row++){
			// 调用 moveLeftInRow 方法 传入当前行号row
			this.moveLeftInRow(row);
		}
		var newStr = this.data.toString();
		if(oldStr != newStr){
			// 调用randomNum()，随机生成一个数
			this.randomNum();
			// 调用 updateView() 更新页面
			this.updateView();
		}
	},
	/*向右移动*/
	moveRight:function(){
		var oldStr = this.data.toString();
		for(var row =0;row<this.rn;row++){
			this.moveRightInRow(row);
		}
		var newStr = this.data.toString();
		if(oldStr != newStr){
			this.randomNum();
			this.updateView();
		}
	},
	// 判断并右移指定行中的每个元素
	moveRightInRow:function(row){
		for(var col =this.cn-1;col>0;col--){
			var nextc = this.getLeftNext(row,col);
			if(nextc == -1){
				break;
			}else{
				if(this.data[row][col] == 0){
					this.data[row][col] = this.data[row][nextc];
					this.data[row][nextc] = 0;
					col++;
				}else if(this.data[row][col] == this.data[row][nextc]){
					this.data[row][col] *= 2;
					this.data[row][nextc] = 0;
					this.score += this.data[row][col];
				}
			}
		}
	},
	// 找到当前位置左侧，下一个不为零的数
	getLeftNext:function(row,col){
		// nextc从col-1开始，遍历row行中剩余行数，>=0 结束
		for(var nextc = col-1;nextc>=0;nextc--){
			if(this.data[row][nextc] != 0){
				return nextc;
			}
		}
		return -1;
	},
	/*向上移动*/
	// 获取任意位置下方不为零的位置
	getDownNext:function(row,col){
		for(var nextr = row+1;nextr<this.rn;nextr++){
			if(this.data[nextr][col] != 0){
				return nextr;
			}
		}
		return -1;
	},
	// 判断并上移指定列中的每个元素
	moveUpInCol:function(col){
		// row从0开始，到<rn-1,遍历每行元素
		for(var row=0;row<this.rn-1;row++){
			var nextr = this.getDownNext(row,col);
			if(nextr == -1){
				break;
			}else{
				if(this.data[row][col] == 0){
					this.data[row][col] = this.data[nextr][col];
					this.data[nextr][col] = 0;
					row--;
				}else if(this.data[row][col] == this.data[nextr][col]){
					this.data[row][col] *= 2;
					this.data[nextr][col] = 0;
					this.score += this.data[row][col];
				}
			}
		}
	},
	// 上移所有列
	moveUp:function(){
		var oldStr = this.data.toString();
		for(var col=0;col<this.cn;this.moveUpInCol(col++)){
			var newStr = this.data.toString();
			if(oldStr != newStr){
				this.randomNum();
				this.updateView();
			}
		}
	},
	/*向下移动*/
	// 下移所有列
	moveDown:function(){
		var oldStr = this.data.toString();
		for(var col=0;col<this.cn;this.moveDownInCol(col++)){
			var newStr = this.data.toString();
			if(oldStr != newStr){
				this.randomNum();
				this.updateView();
			}
		}
	},
	// 判断并下移指定列中的每个元素
	moveDownInCol:function(col){
		for(var row=this.rn-1;row>0;row--){
			var nextr = this.getUpNext(row,col);
			if(nextr == -1){
				break;
			}else{
				if(this.data[row][col] == 0){
					this.data[row][col] = this.data[nextr][col];
					row++;
				}else if(this.data[row][col] == this.data[nextr][col]){
					this.data[row][col] *= 2;
					this.data[nextr][col] =0;
					this.score += this.data[row][col];
				}
			}
		}
	},
	// 获得任意位置上方不为零的位置
	getUpNext:function(row,col){
		for(var nextr = row-1;nextr>=0;nextr--){
			if(this.data[nextr][col] != 0){
				return nextr;
			}
		}
		return -1;
	}
}
/*当页面加载后，自动执行*/
window.onload=function(){
	game.start(); // 页面加载后 自动启动游戏
	// 当键盘按键时，触发移动
	document.onkeydown = function() {
		if(game.state == game.RUNNING){
			// 获取事件对象
			var e = window.event || arguments[0];
			// 获取对应的上下左右键值
			if(e.keyCode == 37){
				game.moveLeft();
			}else if (e.keyCode == 39){
				game.moveRight();
			}else if(e.keyCode == 38){
				game.moveUp();
			}else if(e.keyCode == 40){
				game.moveDown();
			}
		}
	}
}