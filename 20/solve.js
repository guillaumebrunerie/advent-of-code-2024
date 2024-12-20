// First star: 1:26:37 (rank 4324) :(
// Second star: 1:43:18 (rank 2616) :(

import { execute } from "../execute.js";

const solveProblem = (data, { threshold }) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(""));

	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;
	const walls = [];
	for (let i = 0; i < values.length; i++) {
		const line = values[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];
			if (char === "S") {
				startX = j;
				startY = i;
			} else if (char === "E") {
				endX = j;
				endY = i;
			} else if (char === "#") {
				walls.push({ x: j, y: i });
			}
		}
	}

	const storedScores = new Map();
	const getScore = (startX, startY) => {
		if (storedScores.has(`${startX},${startY}`)) {
			return storedScores.get(`${startX},${startY}`);
		} else {
			throw new Error("No score");
		}
	};

	const calculateScores = (startX, startY, score, path) => {
		if (storedScores.has(`${startX},${startY}`)) {
			return;
		}
		storedScores.set(`${startX},${startY}`, { score, path });
		for (const [dx, dy] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]) {
			const x = startX + dx;
			const y = startY + dy;
			if (walls.some((w) => w.x === x && w.y === y)) {
				continue;
			}
			calculateScores(x, y, score + 1, [{ x, y }, ...path]);
		}
	};
	calculateScores(endX, endY, 1, []);

	const solve = (cheatDuration) => {
		const { score: baseScore, path } = getScore(startX, startY);
		let count = 0;
		for (const startCheat of path) {
			for (let y = 0; y < values.length; y++) {
				for (let x = 0; x < values[0].length; x++) {
					const dx = Math.abs(x - startCheat.x);
					const dy = Math.abs(y - startCheat.y);
					if (dx + dy > cheatDuration) {
						continue;
					}
					const endCheat = { x, y };
					if (endCheat.x == startCheat.x && endCheat.y == startCheat.y) {
						continue;
					}
					if (walls.some((w) => w.x === endCheat.x && w.y === endCheat.y)) {
						continue;
					}
					const newScoreD = getScore(endCheat.x, endCheat.y).score;
					const newScore = newScoreD + path.indexOf(startCheat) + dx + dy - 1;
					if (baseScore - newScore >= threshold) {
						count++;
					}
				}
			}
		}
		return count;
	};

	// Part 1

	console.log(solve(2));

	// Part 2

	console.log(solve(20));
};

execute(solveProblem, [
	{ file: "20/testInput", label: "Test input", threshold: 50 },
	{ file: "20/input", label: "Actual input", threshold: 100 },
]);
