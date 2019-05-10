export const month = value => +value > 0 && +value < 13;

export const notEmpty = value => value !== '' && !value.includes('_');

export const notExpired = (month, year) => {
	const now = new Date();
	const currentYear = now.getFullYear() % 100;
	const currentMonth = now.getMonth() + 1;

	if (+year > currentYear) {
		return true;
	}

	if (+year === currentYear) {
		return +month >= currentMonth;
	}

	return false;
};
