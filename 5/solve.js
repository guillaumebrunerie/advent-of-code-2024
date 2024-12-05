// First star: 6:38 (rank 593)
// Second star: 8:16 (rank 298)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const [part1, part2] = data.split("\n\n");
	const rules = part1.split("\n").map((line) => line.split("|").map(Number));
	const updates = part2
		.split("\n")
		.slice(0, -1)
		.map((line) => line.split(",").map(Number));

	// Part 1

	const orderedUpdates = updates.filter((update) => {
		for (const [a, b] of rules) {
			const i = update.indexOf(a);
			const j = update.indexOf(b);
			if (i > -1 && j > -1 && j < i) {
				return false;
			}
		}
		return true;
	});
	console.log(
		orderedUpdates
			.map((update) => update[(update.length - 1) / 2])
			.reduce((a, b) => a + b, 0),
	);

	// Part 2

	const unorderedUpdates = updates.filter(
		(update) => !orderedUpdates.includes(update),
	);
	for (const update of unorderedUpdates) {
		update.sort((a, b) => {
			if (rules.some(([x, y]) => x === a && y === b)) {
				return -1;
			} else if (rules.some(([x, y]) => x === b && y === a)) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	console.log(
		unorderedUpdates
			.map((update) => update[(update.length - 1) / 2])
			.reduce((a, b) => a + b, 0),
	);
};

execute(solveProblem, [
	{ file: "5/testInput1", label: "Test input #1" },
	{ file: "5/input", label: "Actual input" },
]);
