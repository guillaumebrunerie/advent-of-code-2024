// First star: 5:46 (rank 230)
// Second star: 7:44 (rank 117)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split("").map((x) => x));
	const antennas = {};
	for (let y = 0; y < values.length; y++) {
		for (let x = 0; x < values[y].length; x++) {
			if (values[y][x] !== ".") {
				antennas[values[y][x]] ||= [];
				antennas[values[y][x]].push({ x, y });
			}
		}
	}

	// Part 1

	const height = values.length;
	const width = values[0].length;
	const antinodes = new Set();
	for (const [_, positions] of Object.entries(antennas)) {
		for (const p1 of positions) {
			for (const p2 of positions) {
				if (p1 == p2) {
					continue;
				}
				const dx = p2.x - p1.x;
				const dy = p2.y - p1.y;
				const a1 = { x: p2.x + dx, y: p2.y + dy };
				if (a1.x >= 0 && a1.x < width && a1.y >= 0 && a1.y < height) {
					antinodes.add(a1.x + "," + a1.y);
				}
				const a2 = { x: p1.x - dx, y: p1.y - dy };
				if (a2.x >= 0 && a2.x < width && a2.y >= 0 && a2.y < height) {
					antinodes.add(a2.x + "," + a2.y);
				}
			}
		}
	}
	console.log(antinodes.size);

	// Part 2

	const antinodes2 = new Set();
	for (const [_, positions] of Object.entries(antennas)) {
		for (const p1 of positions) {
			for (const p2 of positions) {
				if (p1 == p2) {
					continue;
				}
				const dx = p2.x - p1.x;
				const dy = p2.y - p1.y;
				let i = 1;
				while (true) {
					const a = { x: p1.x + i * dx, y: p1.y + i * dy };
					if (a.x >= 0 && a.x < width && a.y >= 0 && a.y < height) {
						antinodes2.add(a.x + "," + a.y);
						i++;
					} else {
						break;
					}
				}
				i = -1;
				while (true) {
					const a = { x: p1.x + i * dx, y: p1.y + i * dy };
					if (a.x >= 0 && a.x < width && a.y >= 0 && a.y < height) {
						antinodes2.add(a.x + "," + a.y);
						i--;
					} else {
						break;
					}
				}
			}
		}
	}
	console.log(antinodes2.size);
};

execute(solveProblem, [
	{ file: "8/testInput", label: "Test input" },
	{ file: "8/input", label: "Actual input" },
]);
