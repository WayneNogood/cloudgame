var shield = (function() {
	var SHIELD_MAX = 5000;
	var SHIELD_MIN = 251; // must be more than this to turn on
	var SHIELD_DEPLETION_SPEED = 1750; // units per second
	var SHIELD_RECHARGE_SPEED = 900; // units per second

	var shieldOn = false;
	var shieldValue = SHIELD_MAX;
	var lastTickTime = new Date();

	var me = {
		turnOn: function (f) {
			if (shieldValue > SHIELD_MIN) {
				shieldOn = true;
				lastTickTime = new Date();
				f && f();
			}
		},
		turnOff: function (f) {
			shieldOn = false;
			f && f();
		},
		tick: function (f) {
			var now = new Date();
			var elapsedTime = now-lastTickTime;
			lastTickTime = now;

			if (shieldOn) {
				shieldValue -= SHIELD_DEPLETION_SPEED*(elapsedTime/1000);
				shieldValue = Math.floor(shieldValue);

				// did the shield run out?
				if (shieldValue <= 0) {
					shieldValue = 0;
					f && f();
				}
			} else {
				if (shieldValue < SHIELD_MAX) {
					shieldValue += SHIELD_RECHARGE_SPEED*(elapsedTime/1000);
					shieldValue = Math.floor(shieldValue);
					if (shieldValue > SHIELD_MAX) {
						shieldValue = SHIELD_MAX;
					}
				}
			}
		},
		power: function() {
			return shieldValue;
		},
		isOn: function() {
			return shieldValue > 0;
		}

	};

	return me;
})();