import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import * as RRD from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import store from './redux/store/store';

RRD.BrowserRouter = jest.fn(({ children }) => <Fragment>{children}</Fragment>);

describe('Проверка роутинга', () => {
	it('Если пользователь находится на странице /actions/add_card то показываем NewAccountForm', () => {
		const component = mount(
			<RRD.MemoryRouter initialEntries={['/actions/add_card']}>
				<Provider store={store}>
					<App />
				</Provider>
			</RRD.MemoryRouter>
		);

		expect(component.find('AddNewCardPage').length).toBe(1);
	});

	it('Если пользователь находится на странице /some_fake_page то показываем 404', () => {
		const component = mount(
			<RRD.MemoryRouter initialEntries={['/some_fake_page']}>
				<Provider store={store}>
					<App />
				</Provider>
			</RRD.MemoryRouter>
		);

		expect(component.find('NotFoundPage').length).toBe(1);
	});

	it('Если пользователь находится на странице /account/:accountId то показываем TimelinePage', () => {
		const component = mount(
			<RRD.MemoryRouter initialEntries={['/account/1']}>
				<Provider store={store}>
					<App />
				</Provider>
			</RRD.MemoryRouter>
		);

		expect(component.find('TimelinePage').length).toBe(1);
	});
});
