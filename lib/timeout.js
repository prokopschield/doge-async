"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimeout = exports.Timeout = void 0;
const queue_1 = require("./queue");
class Timeout {
    constructor(callback, delay) {
        this.hasExecuted = false;
        this.canceled = false;
        this.hasFailed = false;
        queue_1.queue({
            fn: () => {
                if (!this.hasExecuted && !this.canceled) {
                    return callback();
                }
            },
            resolve: (state) => this.result = state,
            reject: (error) => {
                this.result = error;
                this.hasFailed = true;
            },
        }, delay);
    }
    cancel() {
        this.canceled = true;
    }
}
exports.Timeout = Timeout;
function setTimeout(fn, delay) {
    return new Timeout(fn, delay);
}
exports.setTimeout = setTimeout;
