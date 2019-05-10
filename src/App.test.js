import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store/store';

import * as request from './services/requestMock';
import accounts from './mocks/accountsMock.json';

request.getAccounts = jest.fn(() => Promise.resolve(accounts));

describe('Интеграционный тест', () => {
	/*
	 * Проверяем интеграцию модулей и загрузку данных
	 * для загрузки данных необходимо в компоненте реализовать метод fetchAccounts, который будет
	 * вызывать соответствующее API
	 * */
	let component;

	beforeAll(() => {
		component = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	it('После монтирования компонента происходит загрузка данных', () => {
		expect(request.getAccounts).toHaveBeenCalled();
	});

	it('После загрузки аккаунтов в App были переданы данные', () => {
		return component
			.find('App')
			.instance()
			.fetchAccounts()
			.then(() => {
				expect(component.find('App').instance().props.accounts).toEqual(
					accounts
				);
			});
	});
});
