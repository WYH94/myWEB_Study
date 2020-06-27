
//自调用函数----小蛇
(function () {

    var elements = [];//存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width, height, direction) {
        //小蛇每个部分的宽高方向
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ];
        this.direction = direction || "right";
    }

    //为原型添加方法---小蛇初始化
    Snake.prototype.init = function (map) {
        remove();//先删除之前的小蛇
        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];//数组中的每个元素都是对象
            //创建div
            var div = document.createElement("div");
            map.appendChild(div);//把div加到map中
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;

            //把div加到elements数组中---目的为了删除
            elements.push(div);
        }
    };

    //为原型添加方法---小蛇移动
    Snake.prototype.move = function (food, map) {

        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x ;
            this.body[i].y = this.body[i - 1].y ;
        }
        //判断蛇头部位置
        switch (this.direction) {
            case "right":
                this.body[i].x += 1;
                break;
            case "left":
                this.body[i].x -= 1;
                break;
            case "top":
                this.body[i].y -= 1;
                break;
            case "bottom":
                this.body[i].y += 1;
                break;

        }

        //判断有没有吃到食物
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        //食物的横纵坐标
        var foodX = food.x;
        var foodY = food.y;
        if(headX==foodX&&headY==foodY){
            // alert("撞到了");
            //获取蛇尾
            var last = this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //删除食物，再初始化食物
            food.init(map);
        }

    };
    //删除小蛇的函数
    function remove(){
        //获取数组
        console.log(elements.length);
        for(var i = elements.length-1;i>=0;i--){
            //先从当前的子元素中找到该子元素的父级元素，在删除
            var ele = elements[i];
            ele.parentNode.removeChild(ele);//从map中删除
            elements.splice(i,1);
        }
    }

    window.Snake = Snake;
}());