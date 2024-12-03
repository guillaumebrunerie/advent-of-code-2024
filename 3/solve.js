// First star: 3:55 (rank 959)
// Second star: 6:03 (rank 353)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const readNumber = (str, i) => {
		let n = "";
		while (str[i] >= "0" && str[i] <= "9") {
			n += str[i];
			i++;
		}
		return [parseInt(n), n.length];
	};

	const calculate = (isPart2) => {
		let sum = 0;
		let enabled = true;
		for (let i = 0; i < data.length; i++) {
			if (
				(enabled || !isPart2) &&
				data[i] == "m" &&
				data[i + 1] == "u" &&
				data[i + 2] == "l" &&
				data[i + 3] == "("
			) {
				const [n, k] = readNumber(data, i + 4);
				if (data[i + 4 + k] == ",") {
					const [m, k2] = readNumber(data, i + 5 + k);
					if (data[i + 5 + k + k2] == ")") {
						sum += n * m;
					}
				}
			}
			if (data.slice(i).startsWith("do()")) {
				enabled = true;
			}
			if (data.slice(i).startsWith("don't()")) {
				enabled = false;
			}
		}
		return sum;
	};

	// Part 1

	console.log(calculate(false));

	// Part 2

	console.log(calculate(true));
};

execute(solveProblem, [
	{ file: "3/testInput1", label: "Test input #1" },
	{ file: "3/testInput2", label: "Test input #2" },
	{ file: "3/input", label: "Actual input" },
]);
