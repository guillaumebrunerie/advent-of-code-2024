// First star: 12:45 (rank 1573) :(
// Second star: 15:04 (rank 1266) :(

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split("").map((x) => Number(x)));

	// Part 1

	const trailHeads = [];
	values.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 0) {
				trailHeads.push({ x, y });
			}
		});
	});
	const computeTrailHeadScore = (values, t, i) => {
		const { x, y } = t;
		if (
			y < 0 ||
			y >= values.length ||
			x < 0 ||
			x >= values[0].length ||
			values[y][x] != i
		) {
			return [];
		}
		if (i == 9) {
			return [`${x},${y}`];
		}
		return [
			...computeTrailHeadScore(values, { x: x + 1, y }, i + 1),
			...computeTrailHeadScore(values, { x: x - 1, y }, i + 1),
			...computeTrailHeadScore(values, { x, y: y + 1 }, i + 1),
			...computeTrailHeadScore(values, { x, y: y - 1 }, i + 1),
		];
	};
	let sum = 0;
	for (const t of trailHeads) {
		let set = new Set();
		for (const a of computeTrailHeadScore(values, t, 0)) {
			set.add(a);
		}
		sum += set.size;
	}
	console.log(sum);

	// Part 2

	const computeTrailHeadScore2 = (values, t, i) => {
		const { x, y } = t;
		if (
			y < 0 ||
			y >= values.length ||
			x < 0 ||
			x >= values[0].length ||
			values[y][x] != i
		) {
			return 0;
		}
		if (i == 9) {
			return 1;
		}
		return (
			computeTrailHeadScore2(values, { x: x + 1, y }, i + 1) +
			computeTrailHeadScore2(values, { x: x - 1, y }, i + 1) +
			computeTrailHeadScore2(values, { x, y: y + 1 }, i + 1) +
			computeTrailHeadScore2(values, { x, y: y - 1 }, i + 1)
		);
	};
	let sum2 = 0;
	for (const t of trailHeads) {
		sum2 += computeTrailHeadScore2(values, t, 0);
	}
	console.log(sum2);
};

execute(solveProblem, [
	{ file: "10/testInput1", label: "Test input #1" },
	{ file: "10/testInput2", label: "Test input #2" },
	{ file: "10/input", label: "Actual input" },
]);
