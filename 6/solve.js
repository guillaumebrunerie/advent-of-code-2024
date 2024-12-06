// First star: 7:40 (rank 665)
// Second star: 14:49 (rank 357)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split(""));

	let initialX = 0;
	let initialY = 0;
	for (let i = 0; i < values.length; i++) {
		for (let j = 0; j < values[i].length; j++) {
			if (values[i][j] == "^") {
				values[i][j] = ".";
				initialX = j;
				initialY = i;
			}
		}
	}
	const get = (map, i, j) => {
		if (i < 0 || i >= map.length || j < 0 || j >= map[i].length) {
			return null;
		}
		return map[i][j];
	};

	// Part 1
	{
		let x = initialX;
		let y = initialY;
		let dir = 0;
		const map = [...values.map((row) => [...row])];
		while (x >= 0 && y >= 0 && x < map.length && y < map[0].length) {
			map[y][x] = "X";
			const dx = Math.round(Math.sin((dir * Math.PI) / 2));
			const dy = Math.round(-Math.cos((dir * Math.PI) / 2));
			const frontX = x + dx;
			const frontY = y + dy;
			if (get(map, frontY, frontX) == "#") {
				dir += 1;
			} else {
				x = frontX;
				y = frontY;
			}
		}

		let count = 0;
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (map[i][j] == "X") {
					count++;
				}
			}
		}
		console.log(count);
	}

	// Part 2

	const createsLoop = (obstacleX, obstacleY) => {
		if (obstacleX == initialX && obstacleY == initialY) {
			return false;
		}
		const map = [...values.map((row) => [...row])];
		map[obstacleY][obstacleX] = "#";

		let x = initialX;
		let y = initialY;
		let dir = 0;
		const visited = new Set();
		while (
			x >= 0 &&
			y >= 0 &&
			x < map.length &&
			y < map[0].length &&
			!visited.has(`${x},${y},${dir % 4}`)
		) {
			map[y][x] = "X";
			visited.add(`${x},${y},${dir % 4}`);
			const dx = Math.round(Math.sin((dir * Math.PI) / 2));
			const dy = Math.round(-Math.cos((dir * Math.PI) / 2));
			const frontX = x + dx;
			const frontY = y + dy;
			if (get(map, frontY, frontX) == "#") {
				dir += 1;
			} else {
				x = frontX;
				y = frontY;
			}
		}
		return visited.has(`${x},${y},${dir % 4}`);
	};

	let count2 = 0;
	for (let i = 0; i < values.length; i++) {
		for (let j = 0; j < values[i].length; j++) {
			if (createsLoop(j, i)) {
				count2++;
			}
		}
	}

	console.log(count2);
};

execute(solveProblem, [
	{ file: "6/testInput1", label: "Test input #1" },
	{ file: "6/input", label: "Actual input" },
]);
