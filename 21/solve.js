// First star: 4:41:33 (rank 3731) (time includes a pause of 2 hours in the middle)
// Second star: 4:43:18 (rank 2009) (time includes a pause of 2 hours in the middle)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const input = data.split("\n").slice(0, -1);

	// Part 1

	const keypad1 = {
		7: [0, 0],
		8: [1, 0],
		9: [2, 0],
		4: [0, 1],
		5: [1, 1],
		6: [2, 1],
		1: [0, 2],
		2: [1, 2],
		3: [2, 2],
		gap: [0, 3],
		0: [1, 3],
		A: [2, 3],
	};

	const keypad2 = {
		gap: [0, 0],
		"^": [1, 0],
		A: [2, 0],
		"<": [0, 1],
		v: [1, 1],
		">": [2, 1],
	};

	const move = (pos1, pos2, gap) => {
		if (pos1[0] == gap[0] && pos1[1] == gap[1]) {
			// Can't move over the gap
			return [];
		}
		if (pos1[0] == pos2[0] && pos1[1] == pos2[1]) {
			// Already at the destination
			return [[]];
		}
		const result = [];
		// Try all possible moves
		if (pos1[0] < pos2[0]) {
			result.push(
				...move([pos1[0] + 1, pos1[1]], pos2, gap).map((x) => [">", ...x]),
			);
		}
		if (pos1[0] > pos2[0]) {
			result.push(
				...move([pos1[0] - 1, pos1[1]], pos2, gap).map((x) => ["<", ...x]),
			);
		}
		if (pos1[1] < pos2[1]) {
			result.push(
				...move([pos1[0], pos1[1] + 1], pos2, gap).map((x) => ["v", ...x]),
			);
		}
		if (pos1[1] > pos2[1]) {
			result.push(
				...move([pos1[0], pos1[1] - 1], pos2, gap).map((x) => ["^", ...x]),
			);
		}
		return result;
	};

	const cache = new Map();
	const getMovesLength = (depth, pos1, pos2, gap) => {
		const key = `${depth} ${pos1[0]} ${pos1[1]} ${pos2[0]} ${pos2[1]} ${gap[0]} ${gap[1]}`;
		if (cache.has(key)) {
			return cache.get(key);
		}
		const moves = move(pos1, pos2, gap).map((m) => [...m, "A"]);
		if (depth == 0) {
			return moves[0].length;
		}
		const f = (moves1) => {
			let result = 0;
			for (let i = 1; i < moves1.length; i++) {
				result += getMovesLength(
					depth - 1,
					keypad2[moves1[i - 1]],
					keypad2[moves1[i]],
					keypad2.gap,
				);
			}
			return result;
		};
		const result = Math.min(...moves.map((m) => f(["A", ...m])));
		cache.set(key, result);
		return result;
	};

	const solveSingleCode = (code, depth) => {
		let sum = 0;
		code = "A" + code;
		for (let i = 1; i < code.length; i++) {
			sum += getMovesLength(
				depth,
				keypad1[code[i - 1]],
				keypad1[code[i]],
				keypad1.gap,
			);
		}
		return sum;
	};

	const solve = (codes, depth) => {
		const a = codes.map((code) => {
			const number = code.startsWith("0") ? code.slice(1) : code;
			const shortest = solveSingleCode(code, depth);
			return shortest * parseInt(number);
		});
		return a.reduce((a, b) => a + b, 0);
	};

	console.log(solve(input, 2));

	// Part 2

	console.log(solve(input, 25));
};

execute(solveProblem, [
	{ file: "21/testInput", label: "Test input" },
	{ file: "21/input", label: "Actual input" },
]);
