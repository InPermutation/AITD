"use strict";
var scene, StaticScene, BodyFollowScene;
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

    StaticScene.prototype.getGroundRect = function() {
        return this.groundRect = this.groundRect || createRect('fill:black;');
    }
    StaticScene.prototype.getGroundBody = function() {
        return this.groundBody = this.groundBody || new Body(
            new Point(500, 0), // center
            new Size(1000, 100), // size
            1, // weight
            new Vector(0, 0), // velocity
            new Vector(0, 0) // orientation
        );
    }

    StaticScene.prototype.drawGround = function() {
        this.updateRect(this.getGroundRect(), this.getGroundBody());
    }
    StaticScene.prototype.screenPtFromBody = function(body) {
        return this.viewportCenter
            .add(body.center)
            .subtract(this.center)
            .subtract(body.size.scale(1/2));
    }
    StaticScene.prototype.drawBody = function(obj) {
        if(!('rect' in obj)) obj.rect = createRect(obj.style);
        this.updateRect(obj.rect, obj.body);
    }
    StaticScene.prototype.updateRect = function(rect, body) {
        var screenPt = this.screenPtFromBody(body);

        updateAttribute(rect, 'x', screenPt.x);
        updateAttribute(rect, 'y', screenPt.y);
        updateAttribute(rect, 'rx', 4);
        updateAttribute(rect, 'ry', 4);
        updateAttribute(rect, 'width', body.size.x);
        updateAttribute(rect, 'height', body.size.y);
    }

    BodyFollowScene = function (truck) {
        StaticScene.call(this);
        this.truck = truck;
    }
    BodyFollowScene.prototype = Object.create(StaticScene.prototype);
    BodyFollowScene.prototype.constructor = BodyFollowScene;

    BodyFollowScene.prototype.draw = function(bodies) {
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
