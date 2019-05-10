import React, { Fragment } from 'react';
import withTitle from '../decorators/withTitle';

import NewAccountForm from '../components/NewAccountForm/NewAccountForm';

const AddNewCardPage = ({ handleSubmit }) => (
	<Fragment>
		<h2>Привязка банковской карты</h2>
		<NewAccountForm handleSubmit={handleSubmit} />
	</Fragment>
);

export default withTitle(() => 'Добавить карту')(AddNewCardPage);
