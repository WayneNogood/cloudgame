/*******************************/
/* CONSTANTS
/*******************************/
var width = 900,
height = 600,
c = document.getElementById('c'), 
ctx = c.getContext('2d');
c.width = width;
c.height = height;
var x = 400;
var y = 15;
var speed = 3;
var walkPace = -1;
var strikeZone = -1000;
var accountantX       = 800;
var accountantSpeed   = 2;
var accountantMoving  = 0; // -1 0, +1
var accountantColor   = "#000000";

/*******************************/
/* Weather effects
/*******************************/
/*******************************/
/* Death cloud
/*******************************/
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


var cloudTypes = function(){}

/*******************************/
/* Ligntning
/*******************************/
var lightning = function(x, y){
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 55, y + 105);
  ctx.lineTo(x + 25, y + 205);
  ctx.lineTo(x + 65, y + 405);
  ctx.lineTo(x + 50, y + 205);
  ctx.lineTo(x + 85, y + 105);
  ctx.lineTo(x + 35, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = '#FFFF00';
  ctx.fill();
  ctx.strokeStyle = '#F4FA58';
  ctx.stroke();
}

function Strike()
{
  strike = randomNumberBetween(-300, 900);
  
    if(x >= strike && x <= strike + 20){
      lightning(270 + x, 185);
      strikeZone = strike + 335; // the point where it hits
      LightUpGround();
    }
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

/*******************************/
/* MOVEMENT
/*******************************/
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


function MoveAccountant() {
  accountantX += accountantSpeed * accountantMoving;
  if (accountantX < 0) accountantX = 0;
  if (accountantX > 900) accountantX = 900;

}

/*******************************/
/* Kill methods
/*******************************/
function ShouldIKillPerson(){
  var isDead = strikeZone >= accountantX-50 && strikeZone <= accountantX + 50;
  strikeZone = -1000; 
  return isDead;
}

function KillPerson(){
  console.log("Dead");
  accountantColor = "#ff0000";
  setTimeout(function () {
    accountantColor = "#000000";
  }, 1000);
}

/*******************************/
/* Accountant draw methods 
/*******************************/
function  drawAccountant(posx, posy){

   positionX = posx;
   positionY = posy;

   // draw circle for head
   var centerX = posx;
   var centerY = 50;
   var radius = 8;

   ctx.beginPath();
   ctx.arc(centerX, centerY+positionY, radius, 0, 2 * Math.PI, false);
   ctx.fillStyle = accountantColor;
   ctx.fill();
   ctx.lineWidth = 5;

    // torso
    ctx.beginPath();
    ctx.moveTo(centerX,50+positionY);
    ctx.lineTo(centerX,90 + positionY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = accountantColor;
    ctx.lineCap = "round";
    ctx.stroke();

   // image right arm
    ctx.beginPath();
    ctx.moveTo(centerX, 560);
    ctx.lineTo(positionX-20,positionY +80);
    ctx.lineWidth = 3;
    ctx.strokeStyle = accountantColor;
    ctx.lineCap = "round";
    ctx.stroke();

   // image left arm
    ctx.beginPath();
    ctx.moveTo(centerX, 560);
    ctx.lineTo(20+positionX,positionY + 80);
    ctx.lineWidth = 3;
    ctx.strokeStyle = accountantColor;
    ctx.lineCap = "round";
    ctx.stroke();

   // image right leg
    ctx.beginPath();
    ctx.moveTo(centerX, 580);
    ctx.lineTo(positionX-50,positionY + 180);
    ctx.lineWidth = 3;
    ctx.strokeStyle = accountantColor;
    ctx.lineCap = "round";
    ctx.stroke();


   // image left leg
    ctx.beginPath();
    ctx.moveTo(centerX, 580);
    ctx.lineTo(positionX+50,positionY + 180);
    ctx.lineWidth = 3;
    ctx.strokeStyle = accountantColor;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.restore();
};

/*******************************/
/* Utillity
/*******************************/
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

function BindMouseEvents(){
  Mousetrap.bind("left", function() {accountantMoving = -1}, "keydown");
  Mousetrap.bind("left", function() {accountantMoving = 0}, "keyup");
  Mousetrap.bind("right", function() {accountantMoving = 1}, "keydown");
  Mousetrap.bind("right", function() {accountantMoving = 0}, "keyup");
}


/*******************************/
/* MAIN
/*******************************/
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

  MoveAccountant();
  drawAccountant(accountantX , 490);

  if(ShouldIKillPerson()){
    KillPerson();
  }
}



/*******************************/
/* RUN MAIN
/*******************************/
GameLoop();
BindMouseEvents();




