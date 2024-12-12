// First star: mm:ss (rank rrr)
// Second star: mm:ss (rank rrr)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(",").map((x) => Number(x)));

	const get = (i, j, values) => {
		if (i < 0 || i >= values.length || j < 0 || j >= values[i].length) {
			return null;
		}
		return values[i][j];
	};

	// Part 1

	console.log("");

	// Part 2

	console.log("");
};

execute(solveProblem, [
__TEST_INPUTS__
	{ file: "__DAY__/input", label: "Actual input" },
]);
