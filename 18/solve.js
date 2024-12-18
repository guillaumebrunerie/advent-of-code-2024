// First star: 5:14 (rank 199)
// Second star: 9:35 (rank 258)

import { execute } from "../execute.js";

const solveProblem = (data, { width, bytes }) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(",").map((x) => Number(x)));

	// Part 1

	const testByte = (bytes) => {
		const walls = values.slice(0, bytes);

		let positions = [{ x: 0, y: 0 }];
		const visited = new Set();
		let steps = 0;
		let noSolution = false;
		while (true) {
			if (positions.some((p) => p.x === width - 1 && p.y === width - 1)) {
				break;
			}
			if (positions.length == 0) {
				noSolution = true;
				break;
			}
			const newPositions = [];
			for (const p of positions) {
				for (const [dx, dy] of [
					[0, 1],
					[1, 0],
					[0, -1],
					[-1, 0],
				]) {
					const x = p.x + dx;
					const y = p.y + dy;
					if (x < 0 || x >= width || y < 0 || y >= width) {
						continue;
					}
					if (walls.some((w) => w[0] === p.x && w[1] === p.y)) {
						continue;
					}
					const key = x + "," + y;
					if (visited.has(key)) {
						continue;
					}
					visited.add(key);
					newPositions.push({ x, y });
				}
			}
			positions = newPositions;
			steps++;
		}
		return { steps, noSolution };
	};
	console.log(testByte(bytes).steps);

	// Part 2

	for (let byte = 0; byte < values.length; byte++) {
		if (testByte(byte).noSolution) {
			console.log(values[byte - 1].join(","));
			break;
		}
	}
};

execute(solveProblem, [
	{ file: "18/testInput", label: "Test input", width: 7, bytes: 12 },
	{ file: "18/input", label: "Actual input", width: 71, bytes: 1024 },
]);
