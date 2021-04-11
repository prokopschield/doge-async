export declare class Timeout {
    constructor(callback: Function, delay: number);
    hasExecuted: boolean;
    canceled: boolean;
    hasFailed: boolean;
    cancel(): void;
    result?: any;
}
export declare function setTimeout(fn: Function, delay: number): Timeout;
