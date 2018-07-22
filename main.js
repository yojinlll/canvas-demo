var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(yyy)

listenToUser(yyy)


//画笔与橡皮擦
var eraserEnabled = false
brush.onclick = function () {                                     // eraser.onclick = function(){
    eraserEnabled = false                                       //   eraserEnabled = true
    brush.classList.add('active')                               //   actions.className = 'actions x'
    eraser.classList.remove('active')                           // }
}
eraser.onclick = function () {                                    // brush.onclick = function(){
    eraserEnabled = true                                        //   eraserEnabled = false
    eraser.classList.add('active')                              //   actions.className = 'actions'
    brush.classList.remove('active')                            // }
}


//清屏效果
clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height)
    context.fillStyle =  'white';
    context.fillRect (0, 0, yyy.width, yyy.height);
}

//下载功能
download.onclick = function () {
    var url = yyy.toDataURL("image/png")
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'works'
    a.click()
}

//红绿蓝三色
red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}
black.onclick = function () {
    context.strokeStyle = 'black'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.add('active')
}



//笔画粗细
thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 10
}


/*************/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    //设置背景色；与清屏同个原理，给整个屏幕一块矩形，矩形加上想要的颜色即可；
    context.fillStyle =  'white';
    context.fillRect (0, 0, yyy.width, yyy.height);

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function listenToUser(canvas) {

    var using = false
    var lastPoint = { x: undefined, y: undefined }

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (aaa) {
            console.log('开始摸我了')
            console.log(aaa)
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }

        canvas.ontouchmove = function (aaa) {
            console.log('边摸边动')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {

                var newPoint = { 'x': x, 'y': y }
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }

        canvas.ontouchend = function (aaa) {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }

        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {

                var newPoint = { 'x': x, 'y': y }
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }

        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}


