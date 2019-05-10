import { getOperations } from '../../services/requestMock';

export const LOAD_OPERATIONS = 'LOAD_OPERATIONS';
export const LOAD_OPERATIONS_FAILURE = 'LOAD_OPERATIONS_FAILURE';
export const LOAD_OPERATIONS_SUCCESS = 'LOAD_OPERATIONS_SUCCESS';

export const loadOperationsAction = { type: LOAD_OPERATIONS };
export const loadOperationsFailureAction = { type: LOAD_OPERATIONS_FAILURE };
export const loadOperationsSuccess = payload => ({
	type: LOAD_OPERATIONS_SUCCESS,
	payload,
});

export const loadOperations = id => dispatch => {
	return getOperations(id)
		.then(data => dispatch(loadOperationsSuccess(data)))
		.catch(() => dispatch(loadOperationsFailureAction));
};
