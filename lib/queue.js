"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = exports.ExecutionQueue = void 0;
function ExecutionQueue({ onResolve, onReject, } = {
    onResolve: (state) => void state,
    onReject: (state) => void state,
}) {
    const _queue_internal = [];
    function process() {
        const currentList = _queue_internal.shift();
        if (currentList) {
            while (currentList.length) {
                let current = currentList.shift();
                if (typeof current === 'function') {
                    try {
                        onResolve(current());
                    }
                    catch (e) {
                        onReject(e);
                    }
                }
                else if (typeof current === 'object') {
                    if (current && current.fn) {
                        try {
                            const state = current.state;
                            const newState = current.fn(state);
                            if (newState) {
                                current.state = newState;
                            }
                            if (current.requeue) {
                                set(current, current.requeue);
                            }
                            else {
                                (current.resolve || onResolve)(current.state);
                            }
                        }
                        catch (e) {
                            (current.reject || onReject)(e, current.state);
                        }
                    }
                }
            }
        }
        setTimeout(process, 0x10);
    }
    function set(task, delay = 1) {
        delay = Math.ceil(delay >> 4);
        if (!_queue_internal[delay]) {
            _queue_internal[delay] = [
                task,
            ];
        }
        else
            _queue_internal[delay].push(task);
    }
    process();
    set.set = set.add = set;
    return set;
}
exports.ExecutionQueue = ExecutionQueue;
exports.queue = ExecutionQueue();
Object.assign(ExecutionQueue, exports.queue);
