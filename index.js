class Stepper {
  constructor(steps, pins, signals) {
    this.state = 0; // current steps in revolution (0 ~ steps-1)
    this.direction = 1; // 1 for clockwise, -1 for anti-clockwise
    this.rpm = 10;
    this.steps = steps;
    this.pins = pins;
    for (var i = 0; i < this.pins.length; i++) {
      pinMode(this.pins[i], OUTPUT);
    }
    if (signals) {
      this.signals = signals;
    } else {
      if (this.pins.length === 2) {
        this.signals = [0b01, 0b11, 0b10, 0b00];
      } else if (this.pins.length === 4) {
        this.signals = [0b1010, 0b0110, 0b0101, 0b1001];
      } else {
        throw "Parameter signals required";
      }
    }
  }

  setSpeed(rpm) {
    this.rpm = rpm;
  }

  step(count) {
    this.direction = count > 0 ? 1 : -1;
    var cnt = Math.abs(count);
    var i = cnt;
    var phases = this.signals.length;
    var start = millis();
    var sm = (60 * 1000) / (this.steps * this.rpm); // 1 step in ms
    var tts = start;
    while (i > 0) {
      var now = millis();
      if (now >= tts) {
        if (this.direction === 1) {
          this.state++;
          if (this.state === this.steps) {
            this.state = 0;
          }
        } else {
          // -1
          if (this.state === 0) {
            this.state = this.steps;
          }
          this.state--;
        }
        i--;
        this.move(this.state % phases);
        tts = start + (cnt - i) * sm;
      }
    }
  }

  move(phase) {
    var bit = this.signals[phase];
    for (var i = 0; i < this.pins.length; i++) {
      digitalWrite(this.pins[i], (bit >> (this.pins.length - i - 1)) & 1);
    }
  }
}

exports.Stepper = Stepper;
