"use strict";

var ol = window.onload;
window.onload = function() {
    ol();
    var tractor = new Tractor(
        new Point(40, 25), // center
        new Size(60, 40), // size
        10000, // weight
        new Vector(0, 0), // velocity
        new Vector(0, 0) // orientation
    );
    addTractor(tractor, 'fill:blue;stroke:rgb(0,0,200);stroke-width:2;');
    tractor.accelerator.setValue(1.0);
    scene = new BodyFollowScene(tractor.body);

    setInterval(tick, 20);
}
