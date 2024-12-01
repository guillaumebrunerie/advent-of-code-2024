// First star: 3:11 (rank 866)
// Second star: 4:23 (rank 554)

const solveProblem = (data) => {
	// Parse data
	const lines = data.split("\n").slice(0, -1);
	const values = lines.map((line) => line.split("   ").map((x) => Number(x)));

	const first = values.map((v) => v[0]);
	const second = values.map((v) => v[1]);

	first.sort((a, b) => a - b);
	second.sort((a, b) => a - b);

	const r = first.map((v, i) => {
		return Math.abs(v - second[i]);
	});

	// Part 1

	console.log(r.reduce((acc, v) => acc + v, 0));

	// Part 2

	const r2 = first.map((v) => v * second.filter((w) => w == v).length);

	console.log(r2.reduce((acc, v) => acc + v, 0));
};

// Library code

const fs = require("fs");
const path = require("path");
const day = path.parse(__filename).name;

const files = [`${day}-test`, `${day}`];

files.forEach((file) => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
	});
});
