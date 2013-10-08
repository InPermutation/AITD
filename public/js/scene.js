var scene;

function StaticScene() {
    this.center = new Point(0, 0);
}
StaticScene.prototype.draw = function(bodies) {
    var scene = this;
    scene.drawGround();
    bodies.forEach(function(body) {
        scene.drawBody(body);
    });
}
StaticScene.prototype.drawGround = function() {
}
StaticScene.prototype.drawBody = function(obj) {
    var rect = obj.rect;
    var body = obj.body;
    rect.setAttribute('x', body.center.x);
    rect.setAttribute('y', body.center.y);
    rect.setAttribute('rx', 4);
    rect.setAttribute('ry', 4);
    rect.setAttribute('width', body.size.x);
    rect.setAttribute('height', body.size.y);
}


