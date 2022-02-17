# Stepper

Kaluma library to control unipolar or bipolar stepper motors.

# Wiring

Here is a wiring example with 28BYJ-48 stepper motor and ULN2003A driver.

| Raspberry Pi Pico | ULN2003A (28BYJ-48) |
| ----------------- | ------------------- |
| VBUS              | +                   |
| GND               | -                   |
| GP10              | IN1                 |
| GP11              | IN2                 |
| GP12              | IN3                 |
| GP13              | IN4                 |

![wiring](https://github.com/niklauslee/stepper/blob/main/images/wiring.png?raw=true)

# Install

```sh
npm install https://github.com/niklauslee/stepper
```

# Usage

Here is an example:

```js
// 2048 steps for a revolution
const steps = 2048;

// pins for control wires
const pins = [10, 11, 12, 13];

// The sequence of controls signals for 28BYJ-48
const signals = [0b1000, 0b0100, 0b0010, 0b0001];

const {Stepper} = require('stepper');
const stepper = new Stepper(steps, pins, signals);

global.stepper = stepper;
stepper.setSpeed(12); // 12 rpm
stepper.step(2048);   // turn 360 degree in clockwise
delay(1000);          // wait 1 sec
stepper.step(-2048);  // turn 360 degree in anti-clockwise
```

# API

## Class: Stepper

### new Stepper(steps, pins[, signals])

- **`steps`** `<number>` Number of steps for a revolution.
- **`pins`** `Array<number>` Pins wired to the stepper motor.
- **`signals`** `Array<number>` The sequence of control signals. Optional.

Create an instance of Stepper class.

The `steps` parameter is the number of steps for a revolution.

You can provide control signals according to your stepper motor specification. Otherwise a default sequence of control signals are used for 2 pins and 4 pins. The default sequence of control signals are the same with Arduino's Stepper library.

__Default control signals for 4 control wires__

| Step | C0 | C1 | C2 | C4 |
| ---- | -- | -- | -- | -- |
| 1    | 1  | 0  | 1  | 0  |
| 2    | 0  | 1  | 1  | 0  |
| 3    | 0  | 1  | 0  | 1  |
| 4    | 1  | 0  | 0  | 1  |

__Default control signals for 2 control wires__

| Step | C0 | C1 |
| ---- | -- | -- |
| 1    | 0  | 1  |
| 2    | 1  | 1  |
| 3    | 1  | 0  |
| 4    | 0  | 0  |

### setSpeed(rpm)

- **`rpm`** `<number>` Default: `10`.

Sets the speed in revolutions per minute. This should be given less than the maximum speed of the stepper motor.

### step(count)

- **`count`** `<number>` Number of steps to move in clockwise. If a negative number is given, move in anti-clockwise.

Move as the given number of steps.
