var width = 900,
height = 600,
c = document.getElementById('c'), 
ctx = c.getContext('2d');
c.width = width;
c.height = height;


var clear = function(){
  ctx.fillStyle = '#d0e7f9';
//clear whole surface
  ctx.beginPath();
//start drawing
  ctx.rect(0, 0, width, height);
//draw rectangle from point (0, 0) to
//(width, height) covering whole canvas
  ctx.closePath();
//end drawing
  ctx.fill();
//fill rectangle with active
//color selected before
}


var MoveCloud = function(deltaY){
   
};

var MakeDeathCloud=function (x, y, z, a){
    ctx.beginPath();
    ctx.moveTo(x + z, y + a);
    ctx.bezierCurveTo(130 + z, 100 + a, 130 + z, 150 + a, 230 + z, 150 + a);
    ctx.bezierCurveTo(250 + z, 180 + a, 320 + z, 180 + a, 340 + z, 150 + a);
    ctx.bezierCurveTo(420 + z, 150 + a, 420 + z, 120 + a, 390 + z, 100 + a);
    ctx.bezierCurveTo(430 + z,  40 + a, 370 + z,  30 + a, 340 + z,  50 + a);
    ctx.bezierCurveTo(320 + z,   5 + a, 250 + z,  20 + a, 250 + z,  50 + a);
    ctx.bezierCurveTo(200 + z,   5 + a, 150 + z,  20 + a, 170 + z,  80 + a);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = '#bbb';
    ctx.fill();
    ctx.strokeStyle = '#aaa';
    ctx.stroke();
} 


var GameLoop = function(){
  clear();
  MoveCloud();
  
  MakeDeathCloud(170, 80, 20, 10);
  
  gLoop = setTimeout(GameLoop, 1000 / 50);
}
GameLoop();