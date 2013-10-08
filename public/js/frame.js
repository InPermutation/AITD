"use strict";

var addBody, removeBody, tick;
window.onload = function() {
    var bodies = [];
    var nextID = 1;
    var svg = document.getElementById('field');
    var svgNS = svg.getAttribute('xmlns');

    // public functions
    var frame = 0;
    tick = function() {
        if(bodies.length === 0) return;

        // physics
        for(var ix=0; ix<bodies.length; ix++) {
            var info = bodies[ix];
            var body = info.body;
            body.center.x += body.velocity.x;
            body.center.y += body.velocity.y;
        }
        if(frame === 0) {
            frame = window.requestAnimationFrame(drawFrame);
        } // else { already requested animation frame }
    }
    addBody = function(body, style) {
        var id = nextID++;
        bodies.push({
            'body': body,
            'rect': createRect(body, style),
            'id': id
        }) - 1;
        return id;
    }
    removeBody = function(bodyID) {
        bodies = bodies.map(function(item) { return item.id != bodyID; });
    }
    // end public functions

    function createRect(body, style) {
        var rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute('style', style);
        rect.setAttribute('x', body.center.x);
        rect.setAttribute('y', body.center.y);
        rect.setAttribute('rx', 4);
        rect.setAttribute('ry', 4);
        rect.setAttribute('width', body.size.x);
        rect.setAttribute('height', body.size.y);

        svg.appendChild(rect);

        return rect;
    }
    function updateAttr(rect, attr, val) {
        if(rect.getAttribute(attr) != val) {
            rect.setAttribute(attr, val);
        }
    }
    function updateRect(body, rect) {
        updateAttr(rect, 'x', body.center.x);
        updateAttr(rect, 'y', body.center.y);
    }
    function drawFrame() {
        // reset `frame` requestID
        frame = 0;
        // draw
        for(var ix=0; ix<bodies.length; ix++) {
            var info = bodies[ix];
            updateRect(info.body, info.rect);
        }
    }
 };
