//if(typeof(Storage)!=="undefined")
//{
//

    var scoreTracker = (function() {

        var score = 0;
        var NogoodCloudHighScore = "highScore";
        var canSaveHighestScore = false;

        var me = {

            init: function(){
                canSaveHighestScore = typeof(Storage)!=="undefined";
            },
            updateScore: function(f){
                if(score > getHighestScore())
                return score += f;
            },

            getHighestScore: function(){
                if(canSaveHighestScore)
                    return localStorage.NogoodCloudHighScore;
                return undefined;
            },

            setHighestScore: function(f){
                if(canSaveHighestScore)
                    return localStorage.NogoodCloudHighScore = f;
                return undefined;
            }
        };

        return me;
    })();

