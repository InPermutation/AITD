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
    scene = new BodyFollowScene(tractor.body);

    setInterval(function() {
        if(tractor.body.center.x > 500 + tractor.body.size.x/2) {
            // coast to a stop
            tractor.accelerator.setValue(0);
        } else {
            // proportional control
            var tV = 1.0;
            var error = (tV - tractor.body.velocity.x) / tV;
            tractor.accelerator.setValue(error*10);
        }
    }, 20);
    setInterval(tick, 20);
}
