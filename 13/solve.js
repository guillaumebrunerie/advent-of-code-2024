// First star: 10:38 (rank 671)
// Second star: 11:36 (rank 122)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = (data + "\n").split("\n\n").slice(0, -1);
	const values = lines.map((line) => {
		const matchA = line.match(/Button A: X\+([0-9]+), Y\+([0-9]*)/);
		const matchB = line.match(/Button B: X\+([0-9]+), Y\+([0-9]*)/);
		const matchPrize = line.match(/Prize: X=([0-9]+), Y=([0-9]*)/);
		return {
			a: { x: parseInt(matchA[1]), y: parseInt(matchA[2]) },
			b: { x: parseInt(matchB[1]), y: parseInt(matchB[2]) },
			prize: {
				x: parseInt(matchPrize[1]),
				y: parseInt(matchPrize[2]),
			},
			prize2: {
				x: 10000000000000 + parseInt(matchPrize[1]),
				y: 10000000000000 + parseInt(matchPrize[2]),
			},
		};
	});

	// Part 1

	let sum = 0;
	let sum2 = 0;
	for (const v of values) {
		const a = v.a.x;
		const b = v.b.x;
		const c = v.a.y;
		const d = v.b.y;
		const disc = a * d - b * c;
		if (disc == 0) {
			continue;
		}
		const ai = d / disc;
		const bi = -b / disc;
		const ci = -c / disc;
		const di = a / disc;
		const ra = ai * v.prize.x + bi * v.prize.y;
		const rb = ci * v.prize.x + di * v.prize.y;
		if (
			Math.abs(ra - Math.round(ra)) < 0.001 &&
			Math.abs(rb - Math.round(rb)) < 0.001
		) {
			sum += Math.round(ra) * 3 + Math.round(rb);
		}
		const ra2 = ai * v.prize2.x + bi * v.prize2.y;
		const rb2 = ci * v.prize2.x + di * v.prize2.y;
		if (
			Math.abs(ra2 - Math.round(ra2)) < 0.001 &&
			Math.abs(rb2 - Math.round(rb2)) < 0.001
		) {
			sum2 += Math.round(ra2) * 3 + Math.round(rb2);
		}
	}

	console.log(sum);

	// Part 2

	console.log(sum2);
};

execute(solveProblem, [
	{ file: "13/testInput", label: "Test input" },
	{ file: "13/input", label: "Actual input" },
]);
