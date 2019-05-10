import React from 'react';

import { getCurrencyChar } from '../../utils/currencies';

export default ({ value, currency }) => {
	const [amount, smalls] = String(value).split('.');
	const currencyChar = getCurrencyChar(currency);

	return (
		<span>
			<span>{amount}</span>
			{smalls && <span>,{smalls}</span>}
			{currencyChar && <span>{currencyChar}</span>}
		</span>
	);
};
