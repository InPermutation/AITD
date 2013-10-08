"use strict";

var ol = window.onload;
window.onload = function() {
    ol();
    var body = new Body(
        new Point(100, 20), // center
        new Size(30, 40), // size
        10000, // weight
        new Vector(0, 0), // velocity
        new Vector(0, 0) // orientation
    );
    addBody(body, 'fill:blue;stroke:rgb(0,0,200);stroke-width:2;');

    setInterval(function() {
        body.velocity.x += 0.001;
    }, 10);
    setInterval(tick, 20);
}
