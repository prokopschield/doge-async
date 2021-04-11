export interface Descriptor {
	fn: (state?: object) => object|void|null;
	state?: object;
	resolve?: (state?: object) => void;
	reject?: (error?: any, state?: object) => void;
	requeue?: number;
}

export function ExecutionQueue ({
	onResolve,
	onReject,
}: {
	onResolve: (state?: object) => void;
	onReject: (error?: any, state?: object) => void;
} = {
	onResolve: (state?: object) => void state,
	onReject: (state?: object) => void state,
}): (task: Descriptor|Function, delay: number) => void {

	const _queue_internal: Array<Descriptor|Function>[] = [];

	function process () {
		const currentList = _queue_internal.shift();
		if (currentList) {
			while (currentList.length) {
				let current = currentList.shift();
				if (typeof current === 'function') {
					try {
						onResolve(
							current()
						);
					} catch(e) {
						onReject(e);
					}
				} else if (typeof current === 'object') {
					if (current && current.fn) {
						try {
							const state = current.state;
							const newState = current.fn(state);
							if (newState) {
								current.state = newState;
							}
							if (current.requeue) {
								set(current, current.requeue);
							} else {
								(current.resolve || onResolve)(current.state);
							}
						} catch (e) {
							(current.reject || onReject)(e, current.state);
						}
					}
				}
			}
		}
		setTimeout(process, 0x10);
	}

	function set (task: Descriptor|Function, delay: number = 1) {
		delay = Math.ceil(delay >> 4);
		if (!_queue_internal[delay]) {
			_queue_internal[delay] = [
				task,
			];
		} else _queue_internal[delay].push(task);
	}

	process();

	set.set = set.add = set;
	return set;
}

export const queue = ExecutionQueue();
Object.assign(ExecutionQueue, queue);
