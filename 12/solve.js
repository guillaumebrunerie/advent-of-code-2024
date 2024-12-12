// First star: 17:52 (rank 1758) :(
// Second star: 24:27 (rank 329)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(""));

	const get = (i, j, values) => {
		if (i < 0 || i >= values.length || j < 0 || j >= values[i].length) {
			return null;
		}
		return values[i][j];
	};

	// Part 1

	const makeMask = () => values.map((line) => line.map(() => false));
	const fillRegionAt = (i, j, v, rMask) => {
		if (get(i, j, values) !== v || rMask[i][j]) {
			return;
		}
		rMask[i][j] = true;
		fillRegionAt(i - 1, j, v, rMask);
		fillRegionAt(i + 1, j, v, rMask);
		fillRegionAt(i, j - 1, v, rMask);
		fillRegionAt(i, j + 1, v, rMask);
	};
	const getRegionAt = (i, j) => {
		const rMask = makeMask();
		fillRegionAt(i, j, values[i][j], rMask);
		return rMask;
	};
	const totalMask = makeMask();
	const processRegion = (rMask) => {
		let area = 0;
		let perimeter = 0;
		let sideConnections = 0;
		for (let i = 0; i < rMask.length; i++) {
			for (let j = 0; j < rMask[i].length; j++) {
				if (rMask[i][j]) {
					totalMask[i][j] = true;
					area++;
					if (get(i, j - 1, rMask) !== true) {
						perimeter++;
						if (
							get(i - 1, j, rMask) === true &&
							get(i - 1, j - 1, rMask) !== true
						) {
							sideConnections++;
						}
						if (
							get(i + 1, j, rMask) === true &&
							get(i + 1, j - 1, rMask) !== true
						) {
							sideConnections++;
						}
					}
					if (get(i, j + 1, rMask) !== true) {
						perimeter++;
						if (
							get(i - 1, j, rMask) === true &&
							get(i - 1, j + 1, rMask) !== true
						) {
							sideConnections++;
						}
						if (
							get(i + 1, j, rMask) === true &&
							get(i + 1, j + 1, rMask) !== true
						) {
							sideConnections++;
						}
					}
					if (get(i - 1, j, rMask) !== true) {
						perimeter++;
						if (
							get(i, j - 1, rMask) === true &&
							get(i - 1, j - 1, rMask) !== true
						) {
							sideConnections++;
						}
						if (
							get(i, j + 1, rMask) === true &&
							get(i - 1, j + 1, rMask) !== true
						) {
							sideConnections++;
						}
					}
					if (get(i + 1, j, rMask) !== true) {
						perimeter++;
						if (
							get(i, j - 1, rMask) === true &&
							get(i + 1, j - 1, rMask) !== true
						) {
							sideConnections++;
						}
						if (
							get(i, j + 1, rMask) === true &&
							get(i + 1, j + 1, rMask) !== true
						) {
							sideConnections++;
						}
					}
				}
			}
		}
		const sides = perimeter - sideConnections / 2;

		return { part1: area * perimeter, part2: area * sides };
	};
	const getAnswer = () => {
		let sum1 = 0;
		let sum2 = 0;
		for (let i = 0; i < values.length; i++) {
			for (let j = 0; j < values[i].length; j++) {
				if (!totalMask[i][j]) {
					const rMask = getRegionAt(i, j);
					const { part1, part2 } = processRegion(rMask);
					sum1 += part1;
					sum2 += part2;
				}
			}
		}
		return { part1: sum1, part2: sum2 };
	};
	const { part1, part2 } = getAnswer();
	console.log(part1);

	// Part 2

	console.log(part2);
};

execute(solveProblem, [
	{ file: "12/testInput1", label: "Test input #1" },
	{ file: "12/testInput2", label: "Test input #2" },
	{ file: "12/testInput3", label: "Test input #3" },
	{ file: "12/testInput4", label: "Test input #4" },
	{ file: "12/testInput5", label: "Test input #5" },
	{ file: "12/input", label: "Actual input" },
]);
