export const get = (i, j, values) => {
	if (i < 0 || i >= values.length || j < 0 || j >= values[i].length) {
		return null;
	}
	return values[i][j];
};

export const mod = (a, b) => ((a % b) + b) % b;
