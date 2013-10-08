"use strict";
var scene, StaticScene, TruckFollowScene;
(function() {
    var svg;
    var svgNS;

    StaticScene = function () {
        this.center = new Point(0, 0);
    }
    StaticScene.prototype.initialize = function() {
        svg = document.getElementById('field');
        svgNS = svg.getAttribute('xmlns');
    }
    StaticScene.prototype.draw = function(bodies) {
        var scene = this;
        if(!svg) scene.initialize();

        scene.drawGround();
        bodies.forEach(function(body) {
            scene.drawBody(body);
        });
    }
    StaticScene.prototype.drawGround = function() {
    }
    StaticScene.prototype.drawBody = function(obj) {
        if(!('rect' in obj)) obj.rect = createRect(obj.body, obj.style);
        var rect = obj.rect;
        var body = obj.body;

        rect.setAttribute('x', body.center.x - this.center.x);
        rect.setAttribute('y', body.center.y - this.center.y);
        rect.setAttribute('rx', 4);
        rect.setAttribute('ry', 4);
        rect.setAttribute('width', body.size.x);
        rect.setAttribute('height', body.size.y);
    }

    TruckFollowScene = function (truck) {
        StaticScene.call(this);
        this.truck = truck;
    }
    TruckFollowScene.prototype = Object.create(StaticScene.prototype);
    TruckFollowScene.prototype.constructor = TruckFollowScene;

    TruckFollowScene.prototype.draw = function(bodies) {
        this.center = this.truck.center;
        StaticScene.prototype.draw.call(this, bodies);
    }

    function createRect(body, style) {
        var rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute('style', style);
        svg.appendChild(rect);

        return rect;
    }
})();
