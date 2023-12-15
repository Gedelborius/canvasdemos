const vector = {
    x: 1,
    y: 0,

    setAngle: function (angle) {
        const length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    },
    getAngle: function () {
        return Math.atan2(this.y, this.x);
    },

    setLength: function (length) {
        const angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    },
    getLength: function () {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    },

    create: function (x, y) {
        const obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        return obj;
    },

    add: function (vector2) {
        return vector.create(
            this.x + vector2.x,
            this.y + vector2.y
        );
    },
    subtract: function (vector2) {
        return vector.create(
            this.x - vector2.x,
            this.y - vector2.y
        );
    },
    multiply: function (multiplier) {
        return vector.create(
            this.x * multiplier,
            this.y * multiplier
        );
    },
    divide: function (divider) {
        return vector.create(
            this.x / divider,
            this.y * divider
        );
    },


    addTo: function (vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
    },
    subtractFrom: function (vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
    },
    multiplyBy: function (multiplier) {
        this.x *= multiplier;
        this.y *= multiplier;
    },
    divideBy: function (divider) {
        this.x /= divider;
        this.y /= divider;
    }
}