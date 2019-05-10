import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import store from '../redux/store/store';
import Timeline from '../components/Timeline/Timeline';
import TimelinePage from './TimelinePage';
import * as request from '../services/requestMock';
import operations from '../mocks/operationsMock.json';

request.getOperations = jest.fn(() => Promise.resolve(operations[1]));

const getRouteProps = accountId => ({
	match: {
		params: {
			accountId,
		},
	},
});

describe('Тест страницы TimelinePage', () => {
	/*
	 * Проверяем загрузку данных на странице и передачу данных в Timeline
	 * для загрузки данных необходимо в компоненте реализовать метод fetchOperations, который будет
	 * вызывать соответствующее API
	 * */

	let component;
	let instance;

	beforeAll(() => {
		component = mount(
			<Provider store={store}>
				<TimelinePage {...getRouteProps(1)} />
			</Provider>
		);

		instance = component.find('TimelinePage').instance();
	});

	it('После монтирования компонента происходит загрузка данных', () => {
		expect(request.getOperations).toHaveBeenCalled();
	});

	it('После загрузки операций, состояние TimelinePage изменилось', () => {
		return instance.fetchOperations().then(() => {
			expect(instance.props.operations).toEqual(operations[1]);
		});
	});

	it('Если есть операции то передаем их в Timeline', () => {
		return instance.fetchOperations().then(() => {
			component.update();

			expect(component.find(Timeline).props().items).toBe(operations[1]);
		});
	});
});
