import { readFileSync } from "fs";

export const execute = (solveProblem, files) => {
	for (const { file, label } of files) {
		const data = readFileSync(`./${file}.txt`, "utf8");
		console.log(label);
		solveProblem(data);
		console.log();
	}
};
