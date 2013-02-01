var accountant = (function() {

    var accountantSpeed = 2;
    var accountantDirection = 0; // -1 0, +1

    var defaultAccountantColor =  "#000000";
    var deadAccountantColor = "#ff0000";
    var accountantColor = defaultAccountantColor;
    var accountantX = 40;
    var accountantY = 0;
    var width = 900;

    var me = {

        create: function () {
            positionX = accountantX;
            positionY = 490;

            // draw circle for head
            var centerX = positionX;
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
        },
        color: function(f){

        },
        move: function(f){
            accountantX += accountantSpeed * accountantDirection;
            if (accountantX < 0) accountantX = 0;
            if (accountantX > width) accountantX = width;
        },
        speed: function(f){

        },
        direction: function(f){
            accountantDirection = f;
        },
        getpositionX: function(){
            return accountantX;
        },
        getpositionY: function(){
            return accountantY;
        },
        getBaseColour: function(){
            return defaultAccountantColor;
        },
        getAccountantColor: function(){
            return accountantColor;
        },
        setAccountantColor: function(f){
            accountantColor = f;
        },
        getDeadColour: function(f){
            return deadAccountantColor;
        }
    };

    return me;
})();