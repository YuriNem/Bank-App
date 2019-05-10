import React from 'react';
import cn from 'classnames';

import { connect } from 'react-redux';
import {
	removeExternalAccount,
	changeAccountTitle,
} from '../../redux/accounts/actions';

import Money from '../Money/Money';

import { getCurrencyChar } from '../../utils/currencies';

import styles from './BoardItem.module.css';

class BoardItem extends React.Component {
	state = {
		active: false,
		input: '',
	};

	onActive = () => {
		const { customTitle, title } = this.props;

		this.setState({ active: true, input: customTitle || title });
	};

	changeInput = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	offActive = () => {
		const { input } = this.state;
		const { changeAccountTitle, id } = this.props;

		changeAccountTitle({ customTitle: input, id });
		this.setState({ active: false, input: '' });
	};

	render() {
		const { active, input } = this.state;
		const {
			type,
			customTitle,
			title,
			currency,
			amount,
			removeExternalAccount,
			id,
		} = this.props;
		const showCurrencyIcon = type === 'debit' || type === 'credit';
		const renderMoney = type !== 'external';

		return (
			<div className={styles.item}>
				<div className={cn(styles.logo, styles[`logo_${type}`])}>
					{showCurrencyIcon && getCurrencyChar(currency)}
				</div>
				<div className={styles.title}>
					{active ? (
						<input
							type="text"
							value={input}
							name="input"
							onChange={this.changeInput}
						/>
					) : (
						customTitle || title
					)}
					{!active ? (
						<button className={styles.editButton} onClick={this.onActive} />
					) : (
						<button className={styles.checkButton} onClick={this.offActive} />
					)}
					{type === 'external' ? (
						<button
							className={styles.removeButton}
							onClick={() => removeExternalAccount({ id })}
						/>
					) : null}
					{renderMoney && (
						<div>
							<Money value={amount} currency={currency} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	removeExternalAccount: ({ id }) => dispatch(removeExternalAccount({ id })),
	changeAccountTitle: ({ customTitle, id }) =>
		dispatch(changeAccountTitle({ customTitle, id })),
});

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BoardItem);
