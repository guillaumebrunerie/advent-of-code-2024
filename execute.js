import { readFileSync } from "fs";

export const execute = (solveProblem, files) => {
	for (const { file, label, ...props } of files) {
		const data = readFileSync(`./${file}.txt`, "utf8");
		console.log(label);
		try {
			solveProblem(data, props);
		} catch (error) {
			console.error(error);
		}
		console.log();
	}
};
