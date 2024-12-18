// First star: 14:13 (rank 557)
// Second star: 39:57 (rank 57) :)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	let a = data.match(/Register A: (\d+)/)[1];
	let b = data.match(/Register B: (\d+)/)[1];
	let c = data.match(/Register C: (\d+)/)[1];
	const program = data
		.match(/Program: ([\d,]+)/)[1]
		.split(",")
		.map(Number);
	let i = 0;

	// Part 1

	const getCombo = (x) => {
		switch (x) {
			case 4:
				return a;
			case 5:
				return b;
			case 6:
				return c;
			default:
				return x;
		}
	};

	let isFirst = true;
	while (i < program.length) {
		const opcode = program[i];
		const operand = program[i + 1];
		switch (opcode) {
			case 0:
				a = Math.trunc(a / Math.pow(2, getCombo(operand)));
				i += 2;
				break;
			case 1:
				b = b ^ operand;
				i += 2;
				break;
			case 2:
				b = getCombo(operand) % 8;
				i += 2;
				break;
			case 3:
				if (a != 0) {
					i = operand;
				} else {
					i += 2;
				}
				break;
			case 4:
				b = b ^ c;
				i += 2;
				break;
			case 5:
				if (isFirst) {
					isFirst = false;
				} else {
					process.stdout.write(",");
				}
				process.stdout.write("" + (getCombo(operand) % 8));
				i += 2;
				break;
			case 6:
				b = Math.trunc(a / Math.pow(2, getCombo(operand)));
				i += 2;
				break;
			case 7:
				c = Math.trunc(a / Math.pow(2, getCombo(operand)));
				i += 2;
				break;
		}
	}
	console.log();

	// Part 2

	const oneStep = (a) =>
		a % 8 ^ 0b011 ^ Math.trunc(a / Math.pow(2, a % 8 ^ 0b101)) % 8;

	const findAsOutputting = (numbers) => {
		if (numbers.length == 0) {
			return [0];
		} else {
			const result = [];
			for (const a0 of findAsOutputting(numbers.slice(1))) {
				for (const a1 of [0, 1, 2, 3, 4, 5, 6, 7]) {
					a = a0 * 8 + a1;
					if (oneStep(a) == numbers[0]) {
						result.push(a);
					}
				}
			}
			return result;
		}
	};
	console.log(Math.min(...findAsOutputting(program)));
};

execute(solveProblem, [
	{ file: "17/testInput", label: "Test input" },
	{ file: "17/input", label: "Actual input" },
]);
