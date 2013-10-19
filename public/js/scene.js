"use strict";
var scene, StaticScene, TruckFollowScene;
(function() {
    var svg;
    var svgNS;

    StaticScene = function () {
        this.center = new Point(0, 0);
        this.viewportCenter = new Point(0, 0);
    }
    StaticScene.prototype.initialize = function() {
        svg = document.getElementById('field');
        svgNS = svg.getAttribute('xmlns');
    }
    StaticScene.prototype.adjustViewport = function() {
        //http://stackoverflow.com/a/15459233/3140
        var e = window, a = 'inner';
        if (!( 'innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        var w = e[a+'Width'];
        var h = e[a+'Height'];

        updateAttribute(svg, 'width', w);
        updateAttribute(svg, 'height', h);

        this.viewportCenter = new Point(w/2, h/2);
    }
    StaticScene.prototype.draw = function(bodies) {
        var scene = this;
        if(!svg) scene.initialize();

        scene.adjustViewport();
        scene.drawGround();
        bodies.forEach(function(body) {
            scene.drawBody(body);
        });
    }
    StaticScene.prototype.drawGround = function() {
    }
    StaticScene.prototype.transform = function(point) {
        return this.viewportCenter.add(point).subtract(this.center);
    }
    StaticScene.prototype.drawBody = function(obj) {
        if(!('rect' in obj)) obj.rect = createRect(obj.style);
        var rect = obj.rect;
        var body = obj.body;
        var transformBody = this.transform(body.center);

        updateAttribute(rect, 'x', transformBody.x);
        updateAttribute(rect, 'y', transformBody.y);
        updateAttribute(rect, 'rx', 4);
        updateAttribute(rect, 'ry', 4);
        updateAttribute(rect, 'width', body.size.x);
        updateAttribute(rect, 'height', body.size.y);
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

    function createRect(style) {
        var rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute('style', style);
        svg.appendChild(rect);

        return rect;
    }
    function updateAttribute(el, attrName, val) {
        if(el.getAttribute(attrName) != val) {
            el.setAttribute(attrName, val);
        }
    }
})();
