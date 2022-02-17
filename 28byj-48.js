// 2048 steps for a revolution
const steps = 2048;

// pins for control wires
const pins = [10, 11, 12, 13];

// The sequence of controls signals for 28BYJ-48
const signals = [0b1000, 0b0100, 0b0010, 0b0001];

const { Stepper } = require("./index");
const stepper = new Stepper(steps, pins, signals);

global.stepper = stepper;
stepper.setSpeed(12); // 12 rpm
stepper.step(2048); // turn 360 degree in clockwise
delay(1000); // wait 1 sec
stepper.step(-2048); // turn 360 degree in anti-clockwise
