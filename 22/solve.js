// First star: 14:03 (rank 2091) :(
// Second star: 45:28 (rank 1592) :(

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data
		.split("\n")
		.slice(0, -1)
		.map((line) => Number(line));

	// Part 1

	const mix = (a, s) => a ^ s;
	const prune = (a) => a % 16777216n;
	const step1 = (s) => prune(mix(s * 64n, s));
	const step2 = (s) => prune(mix(s / 32n, s));
	const step3 = (s) => prune(mix(s * 2048n, s));

	const steps = (s, n) => {
		if (n == 0) {
			return s;
		}
		return steps(step3(step2(step1(s))), n - 1);
	};

	console.log(
		lines.map((l) => steps(BigInt(l), 2000)).reduce((a, b) => a + b, 0n),
	);

	// Part 2

	const getCache = (s) => {
		const cache = new Map();
		let lastPrice;
		let price = s % 10n;
		const changes = [];
		for (let i = 0; i <= 2000; i++) {
			price = s % 10n;
			s = step3(step2(step1(s)));
			if (lastPrice != undefined) {
				const change = price - lastPrice;
				changes.push(change);
				if (changes.length == 5) {
					changes.shift();
				}
			}
			lastPrice = price;
			if (changes.length == 4) {
				if (!cache.has(changes.join(","))) {
					cache.set(changes.join(","), price);
				}
			}
			price = s % 10n;
		}
		return cache;
	};

	const caches = lines.map((l) => getCache(BigInt(l)));
	const testSequence = (key) => {
		let sum = 0n;
		for (let i = 0; i < caches.length; i++) {
			const cache = caches[i];
			const price = cache.get(key);
			if (price !== undefined) {
				sum += price;
			}
		}
		return sum;
	};

	let best = 0n;
	for (let a = -9; a <= 9; a++) {
		for (let b = -9; b <= 9; b++) {
			for (let c = -9; c <= 9; c++) {
				for (let d = -9; d <= 9; d++) {
					const key = `${a},${b},${c},${d}`;
					const sum = testSequence(key);
					if (sum > best) {
						best = sum;
					}
				}
			}
		}
	}
	console.log(best);
};

execute(solveProblem, [
	{ file: "22/testInput1", label: "Test input #1" },
	{ file: "22/testInput2", label: "Test input #2" },
	{ file: "22/input", label: "Actual input" },
]);
