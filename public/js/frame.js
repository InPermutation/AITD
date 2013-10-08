"use strict";

var addBody, removeBody, drawFrame;
window.onload = function() {
    var bodies = [];
    var nextID = 1;
    var svg = document.getElementById('field');
    var svgNS = svg.getAttribute('xmlns');

    // public functions
    drawFrame = function() {
        return;// TODO: implement
        // physics
        for(var ix=0; ix<bodies.length; ix++) {
            var info = bodies[ix];
        }
        // draw
        for(var ix=0; ix<bodies.length; ix++) {
            var info = bodies[ix];
        }
    }
    addBody = function(body, color) {
        var id = nextID++;
        bodies.push({
            'body': body,
            'rect': createRect(body, color),
            'id': id
        }) - 1;
        return id;
    }
    removeBody = function(bodyID) {
        bodies = bodies.map(function(item) { return item.id != bodyID; });
    }
    // end public functions

    function createRect(body, color) {
        var rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute('style', 'fill:'+color);
        rect.setAttribute('x', body.center.x);
        rect.setAttribute('y', body.center.y);
        rect.setAttribute('width', body.size.x);
        rect.setAttribute('height', body.size.y);

        svg.appendChild(rect);

        return rect;
    }
};
