import {
	queue,
} from './queue';

export class Timeout {
	constructor (callback: Function, delay: number) {
		queue({
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
		}, delay)
	}
	hasExecuted: boolean = false;
	canceled: boolean = false;
	hasFailed: boolean = false;
	cancel () {
		this.canceled = true;
	}
	result?: any;
}

export function setTimeout (fn: Function, delay: number) {
	return new Timeout(fn, delay);
}
