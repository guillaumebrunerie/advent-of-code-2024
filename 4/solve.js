// First star: 4:15 (rank 427)
// Second star: 7:33 (rank 194) (should have been 6:33, made a typo when entering the answer...)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(""));

	// Part 1

	const get = (i, j) => {
		if (i < 0 || i >= values.length || j < 0 || j >= values[i].length) {
			return null;
		}
		return values[i][j];
	};
	let count = 0;
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (dx == 0 && dy == 0) {
				continue;
			}
			for (let i = 0; i < values.length; i++) {
				for (let j = 0; j < values[i].length; j++) {
					if (
						get(i, j) == "X" &&
						get(i + dx, j + dy) == "M" &&
						get(i + 2 * dx, j + 2 * dy) == "A" &&
						get(i + 3 * dx, j + 3 * dy) == "S"
					) {
						count++;
					}
				}
			}
		}
	}
	console.log(count);

	// Part 2

	let count2 = 0;
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (dx == 0 || dy == 0) {
				continue;
			}
			for (let i = 0; i < values.length; i++) {
				for (let j = 0; j < values[i].length; j++) {
					if (
						get(i, j) == "A" &&
						get(i + dx, j + dx) == "M" &&
						get(i - dx, j - dx) == "S" &&
						get(i - dy, j + dy) == "M" &&
						get(i + dy, j - dy) == "S"
					) {
						count2++;
					}
				}
			}
		}
	}
	console.log(count2);
};

execute(solveProblem, [
	{ file: "4/testInput", label: "Test input" },
	{ file: "4/input", label: "Actual input" },
]);
