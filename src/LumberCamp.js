var LumberCamp = function (y, x, obj) {
    this.y = y;
    this.x = x;
    this.label = '<div class="lumberCamp"></div>';
    this.woodPerTick = 0.0014;
    this.cost = 25;
    this.type = "LumberCamp";

    if (typeof obj !== "undefined") {
        for (var prop in obj) {
            // for safety you can use the hasOwnProperty function
            this[prop] = obj[prop];
        }
    }
};

LumberCamp.prototype.generateWood = function() {
    state.woodCount = state.woodCount + (this.woodPerTick);
};