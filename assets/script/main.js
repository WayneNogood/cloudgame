/*******************************/
/* CONSTANTS
/*******************************/
var main = document.getElementById('main');
var ctx = main.getContext('2d');

var debug = document.getElementById('debug');
var ctxDebug = debug.getContext('2d');

var score = document.getElementById('score');
var ctxScore = score.getContext('2d');

var width = 900;
var infoWidth = 250;
var height = 600;
main.width = width;
main.height = height;
debug.width = infoWidth;
debug.height = height;
score.width = infoWidth;
score.height = height;

var moveLeft = -1;
var moveRight = +1;
var stop = 0;
var speed = 3;
var accountantSpeed = 2;
var accountantDirection = 0; // -1 0, +1

var defaultAccountantColor =  "#000000";
var deadAccountantColor = "#ff0000";
var accountantColor = defaultAccountantColor;
var deathCloudFill = '#bbb';
var deathCloudStroke = '#aaa'
var lightningFill = '#FFFF00';
var lightningStroke = '#F4FA58'

var strikeZone = -1000;
var accountantX = 40;

var deathCloudx = -400;
var deathCloudy = -10;
var lightningHeight = 170 + deathCloudy;
var lightningPosition = 270 ;
var deathCloudSpeed = 0.5;

var NumberOfDeaths = 0;
var NumberfDeathsAllowed = 3;

var startTime = new Date().getTime();

var level1 = 1;
var level2 = 1.5;
var currentLevel = level1;
var speedIncrementStepSize = 2000;
var lightningKillStrength = 20;
var widthOfDeathZone = 20;
var maxWidthOfDeathZone = 200;

var ShieldColour = "#00BFFF";
var maxShieldTime = 5000;
var sheildTimeElapsed = maxShieldTime;

DebugOn = true;

/*******************************/
/* Scoring
/*******************************/

var Score = function(){
  var currentTime = new Date().getTime();
  return Math.floor((currentTime - startTime) * currentLevel/ 10);
}


/*******************************/
/* level hardness controls
/*******************************/

var speedIncrement = function(){
  var currentTime = new Date().getTime();
  var time = currentTime - startTime;
  var isIncrementTime = time % speedIncrementStepSize;
 
  if(isIncrementTime < 10){   
    if(deathCloudSpeed < 4){//this hard codes the max speed to < 4
      deathCloudSpeed += 0.1;
    }
  }
}

var lightningEaseOfKill = function(){
  var currentTime = new Date().getTime();
  var time = currentTime - startTime;
  var isIncrementTime = time % lightningKillStrength;
 
  if(isIncrementTime < 10){   
    if(widthOfDeathZone < maxWidthOfDeathZone){//this hard codes the kill distance to +- 200
      widthOfDeathZone += 0.02;
    }
  }
}


/*******************************/
/* Weather effects
/*******************************/
/*******************************/
/* Death cloud
/*******************************/
var DeathCloud=function (z, a){
    var startx = 170;
    var starty = 80;
    ctx.beginPath();
    ctx.moveTo(startx + z, starty + a);
    ctx.bezierCurveTo(130 + z, 100 + a, 130 + z, 150 + a, 230 + z, 150 + a);
    ctx.bezierCurveTo(250 + z, 180 + a, 320 + z, 180 + a, 340 + z, 150 + a);
    ctx.bezierCurveTo(420 + z, 150 + a, 420 + z, 120 + a, 390 + z, 100 + a);
    ctx.bezierCurveTo(430 + z,  40 + a, 370 + z,  30 + a, 340 + z,  50 + a);
    ctx.bezierCurveTo(320 + z,   5 + a, 250 + z,  20 + a, 250 + z,  50 + a);
    ctx.bezierCurveTo(200 + z,   5 + a, 150 + z,  20 + a, 170 + z,  80 + a);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.fillStyle = deathCloudFill;
    ctx.fill();
    ctx.strokeStyle = deathCloudStroke;
    ctx.stroke();
} 


var cloudTypes = function(){}

/*******************************/
/* Ligntning
/*******************************/
var lightning = function(startx, starty){
  ctx.beginPath();
  ctx.moveTo(startx, starty);
  ctx.lineTo(startx + 55, starty + 105);
  ctx.lineTo(startx + 25, starty + 205);
  ctx.lineTo(startx + 65, starty + 405);
  ctx.lineTo(startx + 50, starty + 205);
  ctx.lineTo(startx + 85, starty + 105);
  ctx.lineTo(startx + 35, starty);
  ctx.lineWidth = 2;
  ctx.fillStyle = lightningFill;
  ctx.fill();
  ctx.strokeStyle = lightningStroke;
  ctx.stroke();
}

function Strike()
{
  var strike = randomNumberBetween(-300, width);
  
  if(deathCloudx >= strike && deathCloudx <= strike + 20){
    lightning(lightningPosition + deathCloudx, lightningHeight);
    strikeZone = strike + 335; // the point where it hits
    LightUpGround();
  }
}

function LightUpGround(){
  ctx.fillStyle = lightningFill;
  ctx.beginPath();
  ctx.rect(0, 590, width, 10);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = lightningStroke;
  ctx.stroke();
}

/*******************************/
/* MOVEMENT
/*******************************/
function BounceSideToSide(){
  if(deathCloudx <= -500 || deathCloudx >= 775){
        speed = -speed;
    }
}

function MoveAcrossScreen(){
  if(deathCloudx >= 770){
        deathCloudx = -400;
    }
}


function MoveAccountant() {
  accountantX += accountantSpeed * accountantDirection;
  if (accountantX < 0) accountantX = 0;
  if (accountantX > width) accountantX = width;
}

/*******************************/
/* Kill methods
/*******************************/
function ShouldIKillPerson(){
  var isDead = IsInStrikeZone() && IsProtected();
  strikeZone = -1000; 
  return isDead;
}

function AccountantShieldOn(){
  if(sheildTimeElapsed > 0){
      accountantColor = ShieldColour;
      sheildTimeElapsed -= 500;
      return;
  }
  accountantColor = defaultAccountantColor;
  AccountantShieldRenew();
}

function AccountantShieldRenew(){
  setTimeout(function () {
    sheildTimeElapsed = maxShieldTime;
  }, 10000);
}

function AccountantShieldOff(){
  accountantColor = defaultAccountantColor;
}

function KillPerson(){
  console.log("Dead");
  accountantColor = deadAccountantColor;
  NumberOfDeaths +=1;
  setTimeout(function () {
    accountantColor = defaultAccountantColor;
  }, 1000);
}

function IsInStrikeZone(){
  return strikeZone >= accountantX-widthOfDeathZone && strikeZone <= accountantX+widthOfDeathZone 
}
function IsProtected(){
  return accountantColor != ShieldColour;
}

/*******************************/
/* Accountant draw methods 
/*******************************/
function  drawAccountant(posx){

   positionX = posx;
   positionY = 490;

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
/* SCORE BOARD
/*******************************/


/*******************************/
/* DEBUG INFO
/*******************************/
function ShowDebugInformation(){
    
    var x = 15;
    var y = 17; 
    ctxDebug.clearRect ( 0 , 0 , infoWidth , height );

    ctxDebug.font = "12px sans-serif";
    ctxDebug.fillText("accountantDirection = " + accountantDirection, x, y);
    ctxDebug.fillText("accountantSpeed = " + accountantSpeed, x, y * 2);
    ctxDebug.fillText("accountantX = " + accountantX, x, y * 3);
    ctxDebug.fillText("deathCloudx = " + deathCloudx, x, y * 4);
    ctxDebug.fillText("deathCloudy = " + deathCloudy, x, y* 5);
    ctxDebug.fillText("lightningHeight = " + lightningHeight, x, y * 6);
    ctxDebug.fillText("lightningPosition = " + lightningPosition , x, y* 7);
    ctxDebug.fillText("DebugOn = " + DebugOn, x, y * 8);
    ctxDebug.fillText("NumberOfDeaths = " + NumberOfDeaths, x, y * 9);
    ctxDebug.fillText("NumberfDeathsAllowed = " + NumberfDeathsAllowed, x, y * 10);
    ctxDebug.fillText("deathCloudSpeed = " + deathCloudSpeed, x, y * 11);
    ctxDebug.fillText("strikeZone = " + strikeZone, x, y * 12);
    ctxDebug.fillText("startTime = " + startTime, x, y * 13);
    ctxDebug.fillText("score = " + Score(), x, y * 14);
    ctxDebug.fillText("currentLevel = " + currentLevel, x, y * 15);

    ctxDebug.fillText("speedIncrementStepSize = " + speedIncrementStepSize, x, y * 16);
    ctxDebug.fillText("widthOfDeathZone = " + widthOfDeathZone, x, y * 17);
    ctxDebug.fillText("lightningKillStrength = " + lightningKillStrength, x, y * 18);

}

/*******************************/
/* SCORING INFO
/*******************************/
function ShowScoringInformation(){
    
    var x = 15;
    var y = 25; 
    ctxScore.clearRect ( 0 , 0 , infoWidth , height );

    ctxScore.font = "20px sans-serif";
    ctxScore.fillText("Score: " + Score(), x, y);
    ctxScore.fillText("Lives Remaining: " + (NumberfDeathsAllowed - NumberOfDeaths), x, y * 2);
    ctxScore.fillText("Shield Time (a): " + (sheildTimeElapsed), x, y * 3);

}


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
  Mousetrap.bind("left", function() {accountantDirection = moveLeft}, "keydown");
  Mousetrap.bind("left", function() {accountantDirection = stop}, "keyup");
  Mousetrap.bind("right", function() {accountantDirection = moveRight}, "keydown");
  Mousetrap.bind("right", function() {accountantDirection = stop}, "keyup");
  Mousetrap.bind("a", function() {AccountantShieldOn()}, "keydown");
  Mousetrap.bind("a", function() {AccountantShieldOff()}, "keyup");

}


/*******************************/
/* MAIN
/*******************************/
var GameLoop = function(){
 if(NumberOfDeaths < NumberfDeathsAllowed){ 

  clear();
  
  reqAnimFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
  reqAnimFrame(GameLoop);

    speedIncrement();
    lightningEaseOfKill();

    deathCloudx += deathCloudSpeed ;
  
    //deathCloudy += 0.3;

    //backwards and forwards
    //BounceSideToSide();
    MoveAcrossScreen();
    Strike();
    DeathCloud(deathCloudx , deathCloudy);  

    MoveAccountant();
    drawAccountant(accountantX);

    if(ShouldIKillPerson()){
      KillPerson();
    }

  }
  else{
    ctx.fillStyle = deadAccountantColor;
    ctx.font = "60px sans-serif";
    ctx.fillText("Game Over", 300, 330);
    ctx.font = "40px sans-serif";
    ctx.fillStyle = '#000';
    ctx.fillText("Score: " + Score(), 350, 400);
  }
  
  ShowScoringInformation();

  ShowDebugInformation(DebugOn);
}



/*******************************/
/* RUN MAIN
/*******************************/
GameLoop();
BindMouseEvents();




