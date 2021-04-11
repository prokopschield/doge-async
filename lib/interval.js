"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInterval = exports.Interval = void 0;
const queue_1 = require("./queue");
class Interval {
    constructor(callback, delay) {
        this.canceled = false;
        this.hasFailed = false;
        this.state = {};
        const descriptor = {
            fn: (state) => {
                if (this.canceled) {
                    descriptor.requeue = 0;
                }
                else {
                    const newState = callback(this.state);
                    if (newState) {
                        this.state = state = newState;
                    }
                }
                return state;
            },
            reject: (error) => {
                this.error = error;
                this.hasFailed = true;
            },
            requeue: delay,
        };
        queue_1.queue(descriptor, delay);
    }
    cancel() {
        this.canceled = true;
    }
}
exports.Interval = Interval;
function setInterval(fn, delay) {
    return new Interval(fn, delay);
}
exports.setInterval = setInterval;
