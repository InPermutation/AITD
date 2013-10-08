"use strict";

function sane(n) {
    var attempt = Number(n || 0).valueOf();
    if(isNaN(attempt)) throw "Invalid number " + n;

    return attempt;
}
function Vector(x, y) {
    this.x = sane(x);
    this.y = sane(y);
}
Vector.prototype.toString = function() { return "(" + this.x + ", " + this.y + ")"; };

var Point = Vector; // displacement from Origin
var Size = Vector; // (width, height)

function Body(center, size, weight, velocity, orientation) {
    this.center = center; // Point
    this.size = size; // Size
    this.weight = weight; // Number
    this.velocity = velocity; // Vector
    this.orientation = orientation; // Vector
}
