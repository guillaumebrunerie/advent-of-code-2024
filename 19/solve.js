// First star: 5:03 (rank 448)
// Second star: 6:36 (rank 322)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);

	const towels = lines[0].split(", ");
	const patterns = lines.slice(2);

	// Part 1

	const patternWays = new Map();
	const waysForPattern = (pattern) => {
		if (patternWays.has(pattern)) {
			return patternWays.get(pattern);
		}
		let ways = 0;
		if (pattern === "") {
			ways = 1;
		} else {
			for (const towel of towels) {
				if (pattern.startsWith(towel)) {
					ways += waysForPattern(pattern.slice(towel.length));
				}
			}
		}
		patternWays.set(pattern, ways);
		return ways;
	};

	console.log(patterns.filter((p) => waysForPattern(p) > 0).length);

	// Part 2

	console.log(patterns.reduce((a, p) => a + waysForPattern(p), 0));
};

execute(solveProblem, [
	{ file: "19/testInput", label: "Test input" },
	{ file: "19/input", label: "Actual input" },
]);
