function Input(init) {
    var value;

    this.getValue = function() { return value; }
    this.setValue = function(v) {
        value = Math.max(Math.min(1.0, v), 0.0);
    }

    this.setValue(init || 0);
}

function Tractor(center, size, weight, velocity, orientation) {
    this.body = new Body(center, size, weight, velocity, orientation);
    this.accelerator = new Input();
}
