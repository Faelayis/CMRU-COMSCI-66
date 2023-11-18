/* eslint-disable unicorn/no-null */
export const toBigInt = (value) => {
	if (value === null) {
		return null;
	} else if (value === undefined) {
		return null;
	} else if (!value) {
		return null;
	}

	return BigInt(value);
};
