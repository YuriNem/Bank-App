import React, { Component } from 'react';

export default getTitle => WrappedComponent => {
	return class CustomTitleComponent extends Component {
		componentDidMount() {
			document.title = getTitle(this.props);
		}

		componentDidUpdate() {
			document.title = getTitle(this.props);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};
