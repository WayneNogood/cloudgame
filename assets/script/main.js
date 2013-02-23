/*******************************/
/* CONSTANTS
/*******************************/
var main = document.getElementById('main');
var ctx = main.getContext('2d');

var debug = document.getElementById('debug');
var ctxDebug = debug.getContext('2d');

var score = document.getElementById('score');
var ctxScore = score.getContext('2d');
var moveLeft = -1;
var moveRight = +1;
var stop = 0;
var width = 900;
var infoWidth = 250;
var height = 600;
main.width = width;
main.height = height;
debug.width = infoWidth;
debug.height = height;
score.width = infoWidth;
score.height = height;
var speed = 3;
var deathCloudFill = '#bbb';
var deathCloudStroke = '#aaa';
var lightningFill = '#FFFF00';
var lightningStroke = '#F4FA58';

var strikeZone = -1000;


var deathCloudX = -400;
var deathCloudY = -10;
var lightningHeight = 170 + deathCloudY;
var lightningPosition = 270 ;
var deathCloudSpeed = 0.5;

var NumberOfDeaths = 0;
var NumberOfDeathsAllowed = 3;

var startTime = new Date().getTime();

var level1 = 1;
var level2 = 1.5;
var currentLevel = level1;
var speedIncrementStepSize = 2000;
var lightningKillStrength = 20;
var widthOfDeathZone = 20;
var maxWidthOfDeathZone = 200;


DebugOn = true;


/*******************************/
/* level hardness controls
/*******************************/

var speedIncrement = function(){
  var currentTime = new Date().getTime();
  var time = currentTime - startTime;
  var isIncrementTime = time % speedIncrementStepSize;
  var increment = 0.1;
    if(deathCloudSpeed < 0){//negative
        increment = -0.1;
    }
    //need to deal with -ve speed when incrementing
  if(isIncrementTime < 10){   
    if(deathCloudSpeed < 4){//this hard codes the max speed to < 4
      deathCloudSpeed += increment;
    }
  }
};

var lightningEaseOfKill = function(){
  var currentTime = new Date().getTime();
  var time = currentTime - startTime;
  var isIncrementTime = time % lightningKillStrength;
 
  if(isIncrementTime < 10){   
    if(widthOfDeathZone < maxWidthOfDeathZone){//this hard codes the kill distance to +- 200
      widthOfDeathZone += 0.02;
    }
  }
};


/*******************************/
/* Weather effects
/*******************************/
/*******************************/
/* Death cloud
/*******************************/
var DeathCloud=function (z, a){
    var startX = 170;
    var startY = 80;
    ctx.beginPath();
    ctx.moveTo(startX + z, startY + a);
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
};


var cloudTypes = function(){};

/*******************************/
/* Lightning
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
};

function Strike()
{
  var strike = randomNumberBetween(-300, width);
  
  if(deathCloudX >= strike && deathCloudX <= strike + 20){
    lightning(lightningPosition + deathCloudX, lightningHeight);
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

  if(deathCloudX <= -300 || deathCloudX >= 610){
      deathCloudSpeed = -deathCloudSpeed;
    }
}

function MoveAcrossScreen(){
  if(deathCloudX >= 770){
        deathCloudX = -400;
    }
}

/*******************************/
/* Kill methods
/*******************************/
function ShouldIKillPerson(){
  var isDead = IsInStrikeZone() &! IsProtected();
  strikeZone = -1000; 
  return isDead;
}

function AccountantShieldOn(){
  shield.turnOn(function() {
      accountant.setAccountantColor(accountant.getProtectedColour());
  });
}

function AccountantShieldOff() {
  shield.turnOff(shieldOff);
}

function shieldOff() {
    accountant.setAccountantColor(accountant.getBaseColour());
}

function IsProtected(){
    return shield.isOn();
}

function IsInStrikeZone(){
    return strikeZone >= accountant.getPositionX()-widthOfDeathZone && strikeZone <= accountant.getPositionX()+widthOfDeathZone
}

function KillPerson(){
  accountant.setAccountantColor(accountant.getDeadColour());
  NumberOfDeaths +=1;
  setTimeout(function () {
      accountant.setAccountantColor(accountant.getBaseColour());
  }, 1000);
}

/*******************************/
/* SCORE BOARD
/*******************************/


/*******************************/
/* DEBUG INFO
/*******************************/
function ShowDebugInformation(show){
    
    var x = 15;
    var y = 17;
    if(show){
        ctxDebug.clearRect ( 0 , 0 , infoWidth , height );

        ctxDebug.font = "12px sans-serif";
        //ctxDebug.fillText("accountantDirection = " + accountant.direction, x, y);
        ctxDebug.fillText("accountantSpeed = " + accountant.speed(), x, y * 2);
        ctxDebug.fillText("accountantX = " + accountant.getPositionX(), x, y * 3);
        ctxDebug.fillText("deathCloudX = " + deathCloudX, x, y * 4);
        ctxDebug.fillText("deathCloudY = " + deathCloudY, x, y* 5);
        ctxDebug.fillText("lightningHeight = " + lightningHeight, x, y * 6);
        ctxDebug.fillText("lightningPosition = " + lightningPosition , x, y* 7);
        ctxDebug.fillText("DebugOn = " + DebugOn, x, y * 8);
        ctxDebug.fillText("NumberOfDeaths = " + NumberOfDeaths, x, y * 9);
        ctxDebug.fillText("NumberOfDeathsAllowed = " + NumberOfDeathsAllowed, x, y * 10);
        ctxDebug.fillText("deathCloudSpeed = " + deathCloudSpeed, x, y * 11);
        ctxDebug.fillText("strikeZone = " + strikeZone, x, y * 12);
        ctxDebug.fillText("startTime = " + startTime, x, y * 13);
        ctxDebug.fillText("score = " + scoreTracker.getScore(), x, y * 14);
        ctxDebug.fillText("currentLevel = " + currentLevel, x, y * 15);
        ctxDebug.fillText("speedIncrementStepSize = " + speedIncrementStepSize, x, y * 16);
        ctxDebug.fillText("widthOfDeathZone = " + widthOfDeathZone, x, y * 17);
        ctxDebug.fillText("lightningKillStrength = " + lightningKillStrength, x, y * 18);
    }
}

/*******************************/
/* SCORING INFO
/*******************************/
function ShowScoringInformation(){

    scoreTracker.init();
    var x = 15;
    var y = 25; 
    ctxScore.clearRect ( 0 , 0 , infoWidth , height );

    ctxScore.font = "20px sans-serif";
    scoreTracker.setScore(startTime, currentLevel);
    ctxScore.fillText("Score: " + scoreTracker.getScore(), x, y);
    ctxScore.fillText("Lives Remaining: " + (NumberOfDeathsAllowed - NumberOfDeaths), x, y * 2);
    ctxScore.fillText("Shield Time (a): " + (shield.power()), x, y * 3);
    ctxScore.fillText("Highest Score: " + scoreTracker.getHighestScore(), x, y * 4);
}


/*******************************/
/* Utility
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
  Mousetrap.bind("left", function() {accountant.direction(moveLeft)}, "keydown");
  Mousetrap.bind("left", function() {accountant.direction(stop)}, "keyup");
  Mousetrap.bind("right", function() {accountant.direction(moveRight)}, "keydown");
  Mousetrap.bind("right", function() {accountant.direction(stop)}, "keyup");
  Mousetrap.bind("a", function() {AccountantShieldOn()}, "keydown");
  Mousetrap.bind("a", function() {AccountantShieldOff()}, "keyup");

}


/*******************************/
/* MAIN
/*******************************/
var GameLoop = function(){
 if(NumberOfDeaths < NumberOfDeathsAllowed){

    clear();
    reqAnimFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    reqAnimFrame(GameLoop);

    speedIncrement();
    lightningEaseOfKill();

    deathCloudX += deathCloudSpeed ;

    //take out hard coded comparison
    //add more variation
    if(scoreTracker.getScore() < 4000){
        MoveAcrossScreen();
    }
    else{
        BounceSideToSide();
    }
    Strike();
    DeathCloud(deathCloudX , deathCloudY);

    shield.tick(shieldOff);

    accountant.move();
    accountant.create();

    if(ShouldIKillPerson()){
      KillPerson();
    }

  }
  else{
    ctx.fillStyle = accountant.getDeadColour();
    ctx.font = "60px sans-serif";
    ctx.fillText("Game Over", 300, 330);
    ctx.font = "40px sans-serif";
    ctx.fillStyle = '#000';
    ctx.fillText("Score: " + scoreTracker.getScore(), 350, 400);
     if(scoreTracker.getScore() == scoreTracker.getHighestScore()){
        ctx.fillText("New High Score!!! ", 350, 470);
     }

 }
  
  ShowScoringInformation();
  ShowDebugInformation(DebugOn);

};



/*******************************/
/* RUN MAIN
/*******************************/
BindMouseEvents();
GameLoop();





