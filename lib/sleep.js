"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
function sleep(time = 1) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.sleep = sleep;
