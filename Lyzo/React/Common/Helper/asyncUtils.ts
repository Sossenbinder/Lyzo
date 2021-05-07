import { range } from "./arrayUtils";

export const delay = async (seconds: number) => {
	let resolver: ((value: unknown) => void);
	const promise = new Promise(res => resolver = res);

	window.setTimeout(() => resolver(null), seconds);

	return promise;
}

export const asyncForEachParallel = async <T>(source: Array<T>, action: (item: T) => Promise<void>, parallelismDegree: number = 25) => {

	const asyncExecutors = range(parallelismDegree)
		.map(() => parallelExecutor(source, action));

	await Promise.all(asyncExecutors);
}

const parallelExecutor = async <T>(source: Array<T>, action: (item: T) => Promise<void>) => {
	while (source.length > 0) {
		const workItem = source.shift();
		await action(workItem);
	}
}