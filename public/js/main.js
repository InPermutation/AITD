"use strict";

var ol = window.onload;
window.onload = function() {
    ol();
    var tractor = new Body(
        new Point(40, 25), // center
        new Size(60, 40), // size
        10000, // weight
        new Vector(1, 0), // velocity
        new Vector(0, 0) // orientation
    );
    addBody(tractor, 'fill:blue;stroke:rgb(0,0,200);stroke-width:2;');
    scene = new TruckFollowScene(tractor);

    setInterval(tick, 20);
}
