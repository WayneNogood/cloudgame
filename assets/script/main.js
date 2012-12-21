var width = 900,
height = 600,
c = document.getElementById('c'), 
ctx = c.getContext('2d');
c.width = width;
c.height = height;
var x =  400;
var y = 15;
var speed = 3;
var walkPace = -1;
var strikeZone = -1000;

var clear = function(){
  ctx.fillStyle = '#d0e7f9';
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#bbb';
  ctx.stroke();
}


var MoveCloud = function(deltaY){
   
};

var DeathCloud=function (x, y, z, a){
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

var lightning = function(x, y){
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 55, y + 105);
  ctx.lineTo(x + 25, y + 205);
  ctx.lineTo(x + 65, y + 405);
  ctx.lineTo(x + 50, y + 205);
  ctx.lineTo(x + 85, y + 105);
  ctx.lineTo(x + 35, y);
  //ctx.closePath();
  ctx.lineWidth = 2;
  ctx.fillStyle = '#FFFF00';
  ctx.fill();
  ctx.strokeStyle = '#F4FA58';
  ctx.stroke();
}

function LightUpGround(){
  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.rect(0, 590, width, 10);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#FFFF00';
  ctx.stroke();
}



function Strike()
{
  strike = randomNumberBetween(-300, 900);
  
    if(x >= strike && x <= strike + 20){
      var strike = lightning(270 + x, 185);
      strikeZone = strike;
      LightUpGround();
    }
}

function BounceSideToSide(){
  if(x <= -500 || x >= 775){
        speed = -speed;
    }
}

function MoveAcrossScreen(){
  if(x >= 770){
        x = -400;
    }
}


var cloudTypes = function(){}

function randomNumberBetween (min, max) {
    return Math.random() * (max - min) + min;
}

var GameLoop = function(){
  clear();

  reqAnimFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

    reqAnimFrame(GameLoop);
    x += speed;

    //backwards and forwards
    //BounceSideToSide();
    MoveAcrossScreen();
    Strike();
    
    var cloud = DeathCloud(170, 80, 0 + x , 0 + y);  
    drawAccountant(400 , 490);

    if(ShouldIKillPerson()){
      KillPerson();
    }

    //var cloud = DeathCloud(170, 80, 70 + x , 70 + y);
    //if(x == -200)
    //  speed = 0;
}
GameLoop();

//function

function ShouldIKillPerson(){
  var isDead = strikeZone >= 600;
  strikeZone = -1000; 
  return isDead;
}

function KillPerson(){
  alert("Dead");
}

function  drawAccountant(posx, posy){

   positionX = posx;
   positionY = posy;

   // draw circle for head
   var centerX = posx;
   var centerY = 50;
   var radius = 8;

   ctx.beginPath();
   ctx.arc(centerX, centerY+positionY, radius, 0, 2 * Math.PI, false);
   ctx.fillStyle = "#000000";
   ctx.fill();
   ctx.lineWidth = 5;

    // torso
    ctx.beginPath();
    ctx.moveTo(centerX,50+positionY);
    ctx.lineTo(centerX,90 + positionY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; 
    ctx.lineCap = "round";
    ctx.stroke();

   // image right arm
    ctx.beginPath();
    ctx.moveTo(centerX, 560);
    ctx.lineTo(positionX-20,positionY +80);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; 
    ctx.lineCap = "round";
    ctx.stroke();

   // image left arm
    ctx.beginPath();
    ctx.moveTo(centerX, 560);
    ctx.lineTo(20+positionX,positionY + 80);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; 
    ctx.lineCap = "round";
    ctx.stroke();

   // image right leg
    ctx.beginPath();
    ctx.moveTo(centerX, 580);
    ctx.lineTo(positionX-50,positionY + 180);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; 
    ctx.lineCap = "round";
    ctx.stroke();


   // image left leg
    ctx.beginPath();
    ctx.moveTo(centerX, 580);
    ctx.lineTo(positionX+50,positionY + 180);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; 
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.restore();

};