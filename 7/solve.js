// First star: 4:12 (rank 311)
// Second star: 6:07 (rank 259)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const equations = lines.map((line) => {
		const [a, b] = line.split(": ");
		return {
			result: Number(a),
			terms: b.split(" ").map(Number),
		};
	});

	// Part 1

	const isSatisfiable = (result, terms) => {
		if (terms.length == 1) {
			return result == terms[0];
		}
		return (
			isSatisfiable(result, [terms[0] + terms[1], ...terms.slice(2)]) ||
			isSatisfiable(result, [terms[0] * terms[1], ...terms.slice(2)])
		);
	};
	const goodEquations = equations.filter((equation) =>
		isSatisfiable(equation.result, equation.terms),
	);

	console.log(
		goodEquations.reduce((acc, equation) => acc + equation.result, 0),
	);

	// Part 2

	const isSatisfiable2 = (result, terms) => {
		if (terms.length == 1) {
			return result == terms[0];
		}
		return (
			isSatisfiable2(result, [terms[0] + terms[1], ...terms.slice(2)]) ||
			isSatisfiable2(result, [terms[0] * terms[1], ...terms.slice(2)]) ||
			isSatisfiable2(result, [
				Number(`${terms[0]}${terms[1]}`),
				...terms.slice(2),
			])
		);
	};
	const goodEquations2 = equations.filter((equation) =>
		isSatisfiable2(equation.result, equation.terms),
	);

	console.log(
		goodEquations2.reduce((acc, equation) => acc + equation.result, 0),
	);
};

execute(solveProblem, [
	{ file: "7/testInput", label: "Test input" },
	{ file: "7/input", label: "Actual input" },
]);
