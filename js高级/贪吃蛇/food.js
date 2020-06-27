
//自调用函数----食物
((function () {
    var elements = [];//用来保存每个小方块食物
    //食物就是对象，有宽高横纵坐标，先定义构造函数，再创建对象
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.color = color || "green";
        this.width = width || 20;
        this.height = height || 20;
    }

    //为原型添加构造方法
    Food.prototype.init = function (map) {
        //先删除这个小食物
        remove();//外部无法访问
        var div = document.createElement("div");
        //把div加到map中
        map.appendChild(div);
        //设置div样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        // div.style.left = this.x;//横纵坐标是随机产生的
        // div.style.top = this.y;
        div.style.position = "absolute";//脱离文档流
        //随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        elements.push(div);//把div加到数组中
    };

    //私有函数，删除食物
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);//找到元素的父级元素，删除子元素
            elements.splice(i, 1);//把elements中的这个子元素删除
        }
    }

    //把Food暴露给全局
    window.Food = Food;
})());