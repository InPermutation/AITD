"use strict";

var addBody, removeBody, tick;
window.onload = function() {
    var bodies = [];
    var nextID = 1;
    // public functions
    var frame = 0;
    tick = function() {
        if(frame === 0) {
            frame = window.requestAnimationFrame(drawFrame);
        } // else { already requested animation frame }
        if(bodies.length === 0) return;

        // physics
        for(var ix=0; ix<bodies.length; ix++) {
            var info = bodies[ix];
            var body = info.body;

            drag(body);

            body.center = body.center.add(body.velocity);
        }
    }
    addBody = function(body, style) {
        var id = nextID++;
        bodies.push({
            'body': body,
            'style': style,
            'id': id
        }) - 1;
        return id;
    }
    removeBody = function(bodyID) {
        bodies = bodies.map(function(item) { return item.id != bodyID; });
    }
    // end public functions

    function drawFrame() {
        // reset `frame` requestID
        frame = 0;
        scene.draw(bodies);
    }

    // 1D approximation
    var rho = 1.0; // tune this
    var CD = 1.15;
    function drag(body) {
        // FD = 1/2*rho*v*v*CD*A
        var FD_over_v = -rho/2*CD*area(body);
        var FD = body.velocity.scale(FD_over_v);

        applyForce(FD, body);
    }
    function area(body) {
        return body.size.y;
    }
    function applyForce(force, body) {
        // F=m*a => a = F / m
        var a = force.scale(1.0/body.weight);

        body.velocity = body.velocity.add(a);
    }
 };
