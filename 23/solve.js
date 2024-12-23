// First star: 6:27 (rank 576)
// Second star: 19:47 (rank 729)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split("-"));

	const sets = new Map();
	const add = (a, b) => {
		let set = sets.get(a);
		if (!set) {
			set = new Set();
			sets.set(a, set);
		}
		set.add(b);
	};
	for (const [a, b] of values) {
		add(a, b);
		add(b, a);
	}

	// Part 1

	const keys = [...sets.keys()];
	let sum = 0;
	for (const a of keys) {
		for (const b of keys) {
			if (b <= a) {
				continue;
			}
			for (const c of keys) {
				if (c <= b) {
					continue;
				}
				if (a.startsWith("t") || b.startsWith("t") || c.startsWith("t")) {
					if (sets.get(a).has(b) && sets.get(b).has(c) && sets.get(c).has(a)) {
						sum++;
					}
				}
			}
		}
	}

	console.log(sum);

	// Part 2

	const addComputer1 = (lan) => {
		const result = [];
		for (const a of keys) {
			if (a <= lan.at(-1)) {
				continue;
			}
			const map = sets.get(a);
			if (lan.every((x) => map.has(x))) {
				result.push([...lan, a]);
			}
		}
		return result;
	};
	const addComputer = (lans) => lans.flatMap((lan) => addComputer1(lan));

	let computers = [...keys].map((k) => [k]);
	while (computers.length > 1) {
		computers = addComputer(computers);
	}
	console.log(computers.join(","));
};

execute(solveProblem, [
	{ file: "23/testInput", label: "Test input" },
	{ file: "23/input", label: "Actual input" },
]);
