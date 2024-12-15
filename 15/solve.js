// First star: 13:32 (rank 337)
// Second star: 44:11 (rank 505)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const [mapStr, dirsStr] = data.split("\n\n");
	const dirs = dirsStr.replaceAll("\n", "");
	const lines = mapStr.split("\n");
	const map = lines.map((line) => line.split(""));

	const solveWithScale = (scale) => {
		let robotX = 0;
		let robotY = 0;
		const boxes = [];
		const walls = [];
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				if (map[y][x] === "@") {
					robotX = scale * x;
					robotY = y;
				} else if (map[y][x] === "O") {
					boxes.push({ x: scale * x, y });
				} else if (map[y][x] === "#") {
					for (let dx = 0; dx < scale; dx++) {
						walls.push({ x: scale * x + dx, y });
					}
				}
			}
		}

		const getDeltasDir = (dir) => {
			if (dir === "^") return { dx: 0, dy: -1 };
			if (dir === "v") return { dx: 0, dy: 1 };
			if (dir === "<") return { dx: -1, dy: 0 };
			if (dir === ">") return { dx: 1, dy: 0 };
		};

		const boxAt = (x, y) => {
			return boxes.find(
				(box) => x >= box.x && x < box.x + scale && box.y === y,
			);
		};

		const movingBoxes = (dir, x, y) => {
			const { dx, dy } = getDeltasDir(dir);
			x += dx;
			y += dy;
			if (walls.some((wall) => wall.x === x && wall.y === y)) {
				return null;
			}
			const box = boxAt(x, y);
			if (!box) {
				return [];
			}
			if (dx == 0) {
				const bs = [];
				for (let dx = 0; dx < scale; dx++) {
					const b = movingBoxes(dir, box.x + dx, box.y);
					if (!b) {
						return null;
					}
					bs.push(b);
				}
				return [...new Set([box, ...bs.flat()])];
			} else if (dx == 1) {
				const bs = movingBoxes(dir, box.x + scale - 1, box.y);
				return bs ? [box, ...bs] : null;
			} else if (dx == -1) {
				const bs = movingBoxes(dir, box.x, box.y);
				return bs ? [box, ...bs] : null;
			}
		};

		const move = (dir) => {
			const { dx, dy } = getDeltasDir(dir);
			const boxes = movingBoxes(dir, robotX, robotY);
			if (!boxes) {
				return;
			}
			robotX += dx;
			robotY += dy;
			for (const box of boxes) {
				box.x += dx;
				box.y += dy;
			}
		};

		// const printMap = () => {
		// 	for (let y = 0; y < map.length; y++) {
		// 		for (let x = 0; x < map[y].length * 2; x++) {
		// 			if (robotY === y && robotX === x) {
		// 				process.stdout.write("@");
		// 			} else if (boxAt(x, y)) {
		// 				process.stdout.write("|");
		// 			} else if (walls.some((wall) => wall.x === x && wall.y === y)) {
		// 				process.stdout.write("#");
		// 			} else {
		// 				process.stdout.write(".");
		// 			}
		// 		}
		// 		console.log();
		// 	}
		// };

		for (const dir of dirs) {
			move(dir);
		}

		let sum = 0;
		for (const box of boxes) {
			sum += box.y * 100 + box.x;
		}
		return sum;
	};

	// Part 1

	console.log(solveWithScale(1));

	// Part 2

	console.log(solveWithScale(2));
};

execute(solveProblem, [
	{ file: "15/testInput1", label: "Test input #1" },
	{ file: "15/testInput2", label: "Test input #2" },
	{ file: "15/testInput3", label: "Test input #3" },
	{ file: "15/input", label: "Actual input" },
]);
