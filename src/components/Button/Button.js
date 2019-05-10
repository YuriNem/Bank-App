import React from 'react';

import styles from './Button.module.css';

const noop = () => {};

export default ({ onClick = noop, children, ...rest }) => (
	<button className={styles.button} onClick={onClick} {...rest}>
		{children}
	</button>
);
