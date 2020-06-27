//自调用函数----游戏对象
(function(){
    var that = null;
    //游戏的构造函数
    function Game(map){
        this.food=new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    //初始化游戏
    Game.prototype.init=function(){
        this.food.init(this.map);
        this.snake.init(this.map);
        this.snake.move(this.food,this.map);
        this.snake.init(this.map);

        //调用自动移动蛇的方法
        this.runSnake(this.food,this.map);
        //调用按键方法
        this.bindKey();
    };
    //添加原型方法---设置小蛇自动运动
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function(){
            //移动小蛇

            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;
            var maxY = map.offsetHeight/this.snake.height;
            //小蛇头坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束");
            }
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束");
            }

        }.bind(that),150);

    };
    //添加原型方法----设置用户按键，改变小蛇移动的方向
    Game.prototype.bindKey=function(){
        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown",function(e){
            //获取按键的值
            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false)
    };

    window.Game = Game;
}());