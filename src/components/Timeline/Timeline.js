import React from 'react';

import TimelineItem from '../TimelineItem/TimelineItem';

const Timeline = ({ items }) =>
	items.map(item => <TimelineItem key={item.id} {...item} />);

export default Timeline;
