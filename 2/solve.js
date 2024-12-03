// First star: 5:48 (rank 764)
// Second star: 8:24 (rank 539)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(" ").map((x) => Number(x)));

	// Part 1

	const isSafe = (v) => {
		const deltas = v.flatMap((x, i) => (i == 0 ? [] : [x - v[i - 1]]));
		return (
			deltas.every((d) => d == 1 || d == 2 || d == 3) ||
			deltas.every((d) => d == -1 || d == -2 || d == -3)
		);
	};
	console.log(values.filter((v) => isSafe(v)).length);

	// Part 2

	console.log(
		values.filter((v) =>
			v.some((_, i) => {
				const v2 = [...v];
				v2.splice(i, 1);
				return isSafe(v2);
			}),
		).length,
	);
};

execute(solveProblem, [
	{ file: "2/testInput", label: "Test input" },
	{ file: "2/input", label: "Actual input" },
]);
