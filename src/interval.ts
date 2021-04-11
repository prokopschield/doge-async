import {
	queue,
} from './queue';

export class Interval {
	constructor (callback: Function, delay: number) {
		const descriptor = {
			fn: (state?: object) => {
				if (this.canceled) {
					descriptor.requeue = 0;
				} else {
					const newState = callback(this.state);
					if (newState) {
						this.state = state = newState;
					}
				}
				return state;
			},
			reject: (error: any) => {
				this.error = error;
				this.hasFailed = true;
			},
			requeue: delay,
		};
		queue(descriptor, delay)
	}
	canceled: boolean = false;
	hasFailed: boolean = false;
	cancel () {
		this.canceled = true;
	}
	state: object = {};
	error?: any;
}

export function setInterval (fn: Function, delay: number) {
	return new Interval(fn, delay);
}
