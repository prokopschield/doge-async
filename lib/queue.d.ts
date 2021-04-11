export interface Descriptor {
    fn: (state?: object) => object | void | null;
    state?: object;
    resolve?: (state?: object) => void;
    reject?: (error?: any, state?: object) => void;
    requeue?: number;
}
export declare function ExecutionQueue({ onResolve, onReject, }?: {
    onResolve: (state?: object) => void;
    onReject: (error?: any, state?: object) => void;
}): (task: Descriptor | Function, delay: number) => void;
export declare const queue: (task: Descriptor | Function, delay: number) => void;
