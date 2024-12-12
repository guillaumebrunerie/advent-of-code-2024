// First star: 6:54 (rank 1161) :(
// Second star: 16:48 (rank 1016) :(

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	let stones = data.slice(0, -1).split(" ");

	// Part 1

	const singleBlink = (stone) => {
		if (stone == "0") {
			return ["1"];
		} else if (stone.length % 2 == 0) {
			return [
				`${Number(stone.slice(0, stone.length / 2))}`,
				`${Number(stone.slice(stone.length / 2))}`,
			];
		} else {
			return [`${Number(stone) * 2024}`];
		}
	};

	const singleStoneLength = (stone, blinks) => {
		if (blinks == 0) {
			return 1;
		} else {
			return multipleStonesLength(singleBlink(stone), blinks - 1);
		}
	};
	const cache = {};
	const singleStoneLengthM = (stone, blinks) => {
		const key = `${stone}-${blinks}`;
		return (cache[key] ??= singleStoneLength(stone, blinks));
	};

	const multipleStonesLength = (stones, blinks) => {
		return stones.reduce((acc, stone) => {
			return acc + singleStoneLengthM(stone, blinks);
		}, 0);
	};

	console.log(multipleStonesLength(stones, 25));

	// Part 2

	console.log(multipleStonesLength(stones, 75));
};

execute(solveProblem, [
	{ file: "11/testInput", label: "Test input" },
	{ file: "11/input", label: "Actual input" },
]);
