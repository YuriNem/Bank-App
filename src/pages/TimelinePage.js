import React, { Component } from 'react';
import { connect } from 'react-redux';

import Timeline from '../components/Timeline/Timeline';
import withTitle from '../decorators/withTitle';

import { loadOperations } from '../redux/operations/actions';

const getAccountId = props => +props.match.params.accountId;
const createPageTitle = ({ match, accounts = [] }) => {
	if (!accounts || accounts.length === 0) {
		return 'Подождите, идет загрузка...';
	}

	const accountId = getAccountId({ match });
	const account = accounts.find(a => a.id === accountId);

	if (!account) {
		return 'Аккаунт отсутствует';
	}

	return `История операций: ${account.title}`;
};

class TimelinePage extends Component {
	componentDidMount() {
		this.fetchOperations();
	}

	componentDidUpdate(prevProps) {
		const prevAccountId = getAccountId(prevProps);
		const accountId = getAccountId(this.props);

		if (prevAccountId !== accountId) {
			this.fetchOperations();
		}
	}

	fetchOperations() {
		const accountId = getAccountId(this.props);

		return this.props.loadOperations(accountId);
	}

	render() {
		const { operations } = this.props;

		if (!operations) {
			return <h2>Подождите, идет загрузка</h2>;
		}

		return operations.length > 0 ? (
			<div>
				<h2>Список операций</h2>
				<Timeline items={operations} />
			</div>
		) : (
			<h2>По данному аккаунту нет операций</h2>
		);
	}
}

const TimelinePageWithTitle = withTitle(createPageTitle)(TimelinePage);

const mapDispatchToProps = dispatch => ({
	loadOperations: accountId => dispatch(loadOperations(accountId)),
});

const mapStateToProps = state => ({
	operations: state.operations,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimelinePageWithTitle);
