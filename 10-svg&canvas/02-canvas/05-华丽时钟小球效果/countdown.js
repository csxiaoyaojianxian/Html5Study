/**
 * CS逍遥剑仙注释
 * 2019.01.27
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var curShowTimeSeconds = 0 // 展示的时间秒数
var balls = []; // 存放小球
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"] // 随机色彩

window.onload = function(){
    // 自适应
    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight
    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1
    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);

    // 绘图
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds()

    // 动画架构
    setInterval(
        function(){
            // 重绘
            render( context );
            // 更新数据
            update();
        }
        ,
        50
    );
}

// 返回当前需要展示的秒数
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    return curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
}

// 更新数据
function update(){
    // 更新秒数
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60
    // 判断是否需要更新
    if( nextSeconds != curSeconds ){
        // 时
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }
        // 分
        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }
        // 秒
        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        // 更新时间
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    // 每次都执行更新小球位置
    updateBalls();
    // 当前页面上的小球数量
    console.log( balls.length)
}

// 更新小球位置
function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){
        balls[i].x += balls[i].vx; // 更新x坐标
        balls[i].y += balls[i].vy; // 更新y坐标
        balls[i].vy += balls[i].g; // 重力加速度
        // 碰撞检测，地面反弹
        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75; // 0.75摩擦系数，速度变为反方向并衰减
        }
    }
    // 优化处理，去掉不在屏幕内的小球
    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i] // 在左右范围内的球存放到 cnt++ 下，最终balls数组前半部分是屏幕内的球，后半部分是屏幕外的球
    // 去除屏幕外的球
    while( balls.length > cnt ){
        balls.pop();
    }
}

// 添加小球
function addBalls( x , y , num ){
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                // 定义小球参数
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(), // 重力加速度，添加随机数，使得每个小球的速度略有差异
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4, // 水平速度，随机数结果为-1或1，控制方向
                    vy:-5, // 垂直速度
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }
                balls.push( aBall )
            }
}

function render( cxt ){
    // 清空画布
    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    // 渲染数字
    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
    var seconds = curShowTimeSeconds % 60
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    // 画balls中的彩色小球
    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        // 画一个球
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();
        cxt.fill();
    }
}

// 渲染数字
function renderDigit( x , y , num , cxt ){
    cxt.fillStyle = "rgb(0,102,153)";
    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                // 画一个小圆
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

