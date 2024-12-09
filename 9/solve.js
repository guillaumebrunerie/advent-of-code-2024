// First star: 19:23 (rank 1871)
// Second star: 42:30 (rank 1380)

import { execute } from "../execute.js";

const solveProblem = (data) => {
	// Parse data
	const parsedData = data.split("").map(Number);
	const layout = [];
	let pos = 0;
	for (let i = 0; i < parsedData.length; i += 2) {
		layout.push({
			id: i / 2,
			file: parsedData[i],
			empty: parsedData[i + 1] || 0,
			pos,
			previous: i / 2 - 1,
		});
		pos += parsedData[i] + parsedData[i + 1];
	}

	// Part 1
	const compactedLength = layout.reduce((acc, curr) => acc + curr.file, 0);
	const wasEmpty = (n) => {
		let pos = 0;
		let offset = 0;
		for (let i = 0; i < layout.length; i++) {
			if (n < pos + layout[i].file) {
				return { empty: false, id: i };
			}
			pos += layout[i].file;
			if (n < pos + layout[i].empty) {
				return { empty: true, offset: offset + (n - pos) };
			}
			pos += layout[i].empty;
			offset += layout[i].empty;
		}
	};
	const getCompactedDigit = (n) => {
		let { empty, id, offset } = wasEmpty(n);
		if (!empty) {
			return id;
		} else {
			for (let i = layout.length - 1; i >= 0; i--) {
				if (offset < layout[i].file) {
					return i;
				} else {
					offset -= layout[i].file;
				}
			}
		}
	};
	console.log(
		Array(compactedLength)
			.fill(0)
			.map((_, i) => getCompactedDigit(i) * i)
			.reduce((acc, curr) => acc + curr, 0),
	);

	// Part 2
	for (let i = layout.length - 1; i >= 0; i--) {
		// i is the one we're moving
		for (const l of layout.toSorted((a, b) => a.pos - b.pos)) {
			const j = l.id; // j is where we're moving it
			if (layout[j].pos >= layout[i].pos) {
				break;
			}
			if (layout[j].empty >= layout[i].file) {
				layout[i].pos = layout[j].pos + layout[j].file;
				layout[i].empty = layout[j].empty - layout[i].file;
				layout[j].empty = 0;
				const previousLayout = layout.find((l) => l.id === layout[i].previous);
				previousLayout.empty += layout[i].file;
				const previousLayout2 = layout.find((l) => l.previous === j);
				previousLayout2.previous = i;
				layout[i].previous = j;
				break;
			}
		}
	}
	let sum = 0;
	for (let i = 0; i < 200000; i++) {
		const file = layout.find((l) => l.pos <= i && i < l.pos + l.file);
		if (file) {
			sum += file.id * i;
		}
	}

	console.log(sum);
};

execute(solveProblem, [
	{ file: "9/testInput", label: "Test input" },
	{ file: "9/input", label: "Actual input" },
]);
