var width = 900,
//width of the canvas
  height = 600,
//height of the canvas

  c = document.getElementById('c'), 
//canvas itself 

  ctx = c.getContext('2d');
//and two-dimensional graphic context of the
//canvas, the only one supported by all 
//browsers for now

c.width = width;
c.height = height;
//setting canvas size 

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

var MakeCloud=function (){
    ctx.beginPath();
    ctx.moveTo(170, 80);
    ctx.bezierCurveTo(130, 100, 130, 150, 230, 150);
    ctx.bezierCurveTo(250, 180, 320, 180, 340, 150);
    ctx.bezierCurveTo(420, 150, 420, 120, 390, 100);
    ctx.bezierCurveTo(430, 40, 370, 30, 340, 50);
    ctx.bezierCurveTo(320, 5, 250, 20, 250, 50);
    ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = '#e6e6e6';
    ctx.fill();
    ctx.strokeStyle = '#eee';
    ctx.stroke();

} 


var GameLoop = function(){
  clear();
  MoveCloud(5);
  MakeCloud();
  //gLoop = setTimeout(GameLoop, 1000 / 50);
}
GameLoop();