var weather = (function() {


        function cloud() {
            return {

                c: function () {
                    return "fluffy";
                }
            };
        }

        function lightning() {
            return {

                c: function () {
                    return "flash";
                }
            };
        }

        return {cloud: cloud, lightning: lightning};


})();