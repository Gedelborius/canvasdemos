const vector = {
    _x: 1,
    _y: 0,

    // x y
    setX: function(x) {
        this._x = x;
    },
    getX: function() {
        return this._x;
    },
    setY: function (y) {
        this._y = y;
    },
    getY: function () {
        return this._y;
    },

    // angle
    setAngle: function(angle) {
        const length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },
    getAngle: function() {
        return Math.atan2(this._y, this._x);
    },


    // length
    setLength: function(length) {
        const angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },
    getLength: function() {
        return Math.sqrt(this._x**2 + this._y ** 2);
    },

    // create
    create: function(x,y) {
        const obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    // operations
    add: function(vector2) {
        return vector.create(this._x + vector2.getX(),this._y + vector2.getY());
    },
    subtract: function(vector2) {
        return vector.create(this._x - vector2.getX(), this._y - vector2.getY());
    },
    multiply: function(multiplier) {
        return vector.create(this._x * multiplier, this._y * multiplier);
    },
    divide: function(divider) {
        return vector.create(this._x / divider, this._y * divider);
    },


    addTo: function(vector2) {
        this._x += vector2.getX();
        this._y += vector2.getY();
    },
    subtractFrom: function(vector2) {
        this._x -= vector2.getX();
        this._y -= vector2.getY();
    },
    multiplyBy: function(multiplier) {
        this._x *= multiplier;
        this._y *= multiplier;
    },
    divideBy: function(divider) {
        this._x /= divider;
        this._y /= divider;
    }
}