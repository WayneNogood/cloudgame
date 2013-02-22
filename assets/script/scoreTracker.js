//if(typeof(Storage)!=="undefined")
//{
//

    var scoreTracker = (function() {

        var score = 0;
        var highScore = 0;
        var localStorageAccess = false;
        var highScoreStorageValue = "NogoodCloudHighScore";

        function getDataFromLocalStorage(item){
            if(localStorage.getItem(item) === null)
                return 0;
            return localStorage.NogoodCloudHighScore;
        }

        function setDataFromLocalStorage(item, value){
            localStorage.setItem(item, value);
        }

        var me = {

            init: function(){
                localStorageAccess = typeof(Storage)!== "undefined";
                if(localStorageAccess){
                    highScore = getDataFromLocalStorage(highScoreStorageValue);
                }
                else
                    highScore = "N/A";
            },

            setScore: function(f, g){
                var currentTime = new Date().getTime();
                score = Math.floor((currentTime - f) * g/ 10);
                return score;
            },

            getScore: function(){
                return score;
            },

            canSaveHighestScore: function(){
                return localStorageAccess;
            },

            getHighestScore: function(){
                if(localStorageAccess){
                    if(score > getDataFromLocalStorage(highScoreStorageValue)){
                        setDataFromLocalStorage(highScoreStorageValue, score);
                        return score;
                    }
                    return getDataFromLocalStorage(highScoreStorageValue);
                }
                return undefined;
            },

            setHighestScore: function(f){
                if(localStorageAccess)
                    setDataFromLocalStorage(highScoreStorageValue, highScore);
                return undefined;
            }
        };

        return me;
    })();

