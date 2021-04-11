export declare class Interval {
    constructor(callback: Function, delay: number);
    canceled: boolean;
    hasFailed: boolean;
    cancel(): void;
    state: object;
    error?: any;
}
export declare function setInterval(fn: Function, delay: number): Interval;
