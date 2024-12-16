// First star: 22:14 (rank 1494) :(
// Second star: 26:17 (rank 540)

import { execute } from "../execute.js";
import { mod } from "../lib.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(""));

	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;
	for (let i = 0; i < values.length; i++) {
		const line = values[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];
			if (char === "S") {
				startX = j;
				startY = i;
				line[j] = ".";
				break;
			} else if (char === "E") {
				endX = j;
				endY = i;
				line[j] = ".";
				break;
			}
		}
	}

	const tryForward1 = ({ x, y, dir, score, path }) => {
		const result = [];
		let i = 0;
		let currentPath = [];
		while (true) {
			x += Math.round(Math.cos((dir * Math.PI) / 2));
			y += Math.round(Math.sin((dir * Math.PI) / 2));
			i++;
			currentPath.push({ x, y });
			if (values[y][x] === ".") {
				result.push({
					x,
					y,
					dir,
					score: score + i,
					path: [...path, ...currentPath],
				});
			} else {
				break;
			}
		}
		return result;
	};

	const tryForward = (allPos) => allPos.flatMap(tryForward1);

	const tryRotate1 = ({ x, y, dir, score, path }) => {
		return [
			{ x, y, dir: mod(dir - 1, 4), score: score + 1000, path },
			{ x, y, dir: mod(dir + 1, 4), score: score + 1000, path },
		];
	};

	const tryRotate = (allPos) => allPos.flatMap(tryRotate1);

	const mask = values.map((line) => line.map(() => false));
	let positions = [
		{
			x: startX,
			y: startY,
			dir: 0,
			score: 0,
			path: [{ x: startX, y: startY }],
		},
	];
	let bestScore;
	while (true) {
		// Only works if we know we need to start by rotating, but it’s the case
		positions = tryRotate(positions);
		positions = tryForward(positions);
		positions = positions.filter((p) => !mask[p.y][p.x]);
		positions.forEach(({ x, y }) => {
			mask[y][x] = true;
		});
		const finalPositions = positions.filter(
			({ x, y }) => x === endX && y === endY,
		);
		if (finalPositions.length > 0) {
			bestScore = Math.min(...finalPositions.map((p) => p.score));
			break;
		}
	}

	// Part 1

	console.log(bestScore);

	// Part 2

	const sitplaces = values.map((line) => line.map(() => false));
	const finalPositions = positions.filter(
		({ x, y, score }) => x === endX && y === endY && score === bestScore,
	);
	finalPositions.forEach(({ path }) =>
		path.forEach(({ x, y }) => {
			sitplaces[y][x] = true;
		}),
	);
	let sum = 0;
	for (let i = 0; i < sitplaces.length; i++) {
		for (let j = 0; j < sitplaces[i].length; j++) {
			if (sitplaces[i][j]) {
				sum += 1;
			}
		}
	}
	console.log(sum);
};

execute(solveProblem, [
	{ file: "16/testInput1", label: "Test input #1" },
	{ file: "16/testInput2", label: "Test input #2" },
	{ file: "16/input", label: "Actual input" },
]);
