import {
	LOAD_ACCOUNTS,
	LOAD_ACCOUNTS_FAILURE,
	LOAD_ACCOUNTS_SUCCESS,
	CHANGE_ACCOUNT_TITLE,
	ADD_ACCOUNT,
	REMOVE_EXTERNAL_ACCOUNT,
} from './actions';

export default function reducer(state = [], action) {
	switch (action.type) {
		case LOAD_ACCOUNTS:
			return null;
		case LOAD_ACCOUNTS_FAILURE:
			return null;
		case LOAD_ACCOUNTS_SUCCESS:
			return action.payload;
		case CHANGE_ACCOUNT_TITLE:
			return state.map(card =>
				card.id === action.payload.id
					? { ...card, customTitle: action.payload.customTitle }
					: card
			);
		case ADD_ACCOUNT:
			return [...state, action.payload];
		case REMOVE_EXTERNAL_ACCOUNT:
			return state.filter(
				card => !(card.id === action.payload.id && card.type === 'external')
			);
		default:
			return state;
	}
}
