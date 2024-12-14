// First star: 14:38 (rank 1244) :(
// Second star: 26:45 (rank 516)

import { execute } from "../execute.js";
import { get, mod } from "../lib.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => {
		const match = line.match(/p=(-?[0-9]+),(-?[0-9]+) v=(-?[0-9]+),(-?[0-9]+)/);
		return {
			p: { x: parseInt(match[1]), y: parseInt(match[2]) },
			v: { x: parseInt(match[3]), y: parseInt(match[4]) },
		};
	});

	const width = 101;
	const height = 103;

	// Part 1

	let q1 = 0;
	let q2 = 0;
	let q3 = 0;
	let q4 = 0;

	for (const r of values) {
		const x = mod(r.p.x + r.v.x * 100, width);
		const y = mod(r.p.y + r.v.y * 100, height);
		if (x < width / 2 - 1) {
			if (y < height / 2 - 1) {
				q1++;
			} else if (y >= height / 2) {
				q2++;
			}
		} else if (x >= width / 2) {
			if (y < height / 2 - 1) {
				q3++;
			} else if (y >= height / 2) {
				q4++;
			}
		}
	}

	console.log(q1 * q2 * q3 * q4);

	// Part 2

	const runSteps = (steps) => {
		const map = new Array(height).fill(0).map(() => new Array(width).fill("·"));
		for (const r of values) {
			const x = mod(r.p.x + r.v.x * steps, width);
			const y = mod(r.p.y + r.v.y * steps, height);
			map[y][x] = "#";
		}
		return map;
	};

	const printMap = (map) => {
		console.log(map.map((row) => row.join("")).join("\n"));
	};

	// Solved it by looking at the output, noticing a pattern starting at step 8
	// and repeating every 101 steps, then running again only those, and finally
	// finding the Christmas tree.
	printMap(runSteps(6876));

	// Here is another solution
	const countAdjacent = (map) => {
		let count = 0;
		map.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell === "#") {
					if (get(y + 1, x, map) === "#") count++;
					if (get(y, x + 1, map) === "#") count++;
				}
			});
		});
		return count;
	};
	for (let i = 0; i < 10000; i++) {
		if (countAdjacent(runSteps(i)) > 200) {
			console.log(i);
		}
	}
};

execute(solveProblem, [
	// { file: "14/testInput1", label: "Test input #1" },
	{ file: "14/input", label: "Actual input" },
]);
