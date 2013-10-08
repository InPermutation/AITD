"use strict";

var ol = window.onload;
window.onload = function() {
    ol();
    addBody(new Body(
        new Point(100, 20), // center
        new Size(30, 40), // size
        10000, // weight
        new Vector(0, 0), // velocity
        new Vector(0, 0) // orientation
    ), 'blue');
}
