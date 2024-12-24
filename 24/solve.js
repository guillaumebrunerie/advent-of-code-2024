// First star: 9:54 (rank 332)
// Second star: 1:03:44 (rank 112)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const blocks = data.split("\n\n");
	const inputs = blocks[0].split("\n").map((line) => {
		const [variable, value] = line.split(": ");
		return { variable, value: Number(value) };
	});
	const connections = Object.fromEntries(
		blocks[1]
			.slice(0, -1)
			.split("\n")
			.map((line) => {
				const [from, output] = line.split(" -> ");
				const [i1, op, i2] = from.split(" ");
				return [output, { i1, op, i2 }];
			}),
	);

	const cache = {};
	for (const { variable, value } of inputs) {
		cache[variable] = value;
	}
	const computeValue = (v) => {
		if (v in cache) {
			return cache[v];
		}
		const { i1, op, i2 } = connections[v];
		const v1 = computeValue(i1);
		const v2 = computeValue(i2);
		let result;
		switch (op) {
			case "AND":
				result = v1 & v2;
				break;
			case "OR":
				result = v1 | v2;
				break;
			case "XOR":
				result = v1 ^ v2;
				break;
		}
		cache[v] = result;
		return result;
	};
	let total = 0;
	let i = 0;
	while (true) {
		const zVar = `z${`${i}`.padStart(2, "0")}`;
		if (!(zVar in connections)) {
			break;
		}
		const value = computeValue(zVar);
		total += value * Math.pow(2, i);
		i++;
	}

	// Part 1

	console.log(total);

	// Part 2 (done by hand)
};

execute(solveProblem, [
	{ file: "24/testInput1", label: "Test input #1" },
	{ file: "24/testInput2", label: "Test input #2" },
	{ file: "24/input", label: "Actual input" },
]);
