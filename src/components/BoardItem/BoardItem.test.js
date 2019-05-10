import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import BoardItem from './BoardItem';
import Money from '../Money/Money';
import { Provider } from 'react-redux';
import store from '../../redux/store/store';

describe('BoardItem', () => {
	/*
    Необходимо добавить вывод количества средств на счете пользователя (подключить компонент Money).
    Если счет имеет тип external (привязанная карта стороннего банка), то мы не можем знать остаток средств и не отображаем.
    Доработать отображение названия счета. Если у счета есть customTitle, то отображаем его, иначе - title.
   */

	it('Поле customTitle заполнено, отображаем customTitle', () => {
		const component = shallow(
			<Provider store={store}>
				<BoardItem customTitle="customTitle" title="defaultTitle" />
			</Provider>
		);

		expect(component.html().includes('customTitle')).toBe(true);
		expect(component.html().includes('defaultTitle')).toBe(false);
	});

	it('Поле customTitle не заполнено, отображаем title', () => {
		const component = shallow(
			<Provider store={store}>
				<BoardItem title="defaultTitle" />
			</Provider>
		);

		expect(component.html().includes('defaultTitle')).toBe(true);
	});

	it('Для карт сторонних банков не отображаем остаток средств', () => {
		const component = shallow(
			<Provider store={store}>
				<BoardItem title="Привязанная карта" amount={20000} type="external" />
			</Provider>
		);

		expect(component.find(Money).length).toBe(0);
	});

	it('Для счетов, кроме external, показываем баланс', () => {
		const types = ['credit', 'debit', 'deposit', 'loan', 'saving'];

		types.forEach(type => {
			const money = +new Date();
			const component = mount(
				<Provider store={store}>
					<BoardItem
						title="Аккаунт"
						currency="RUB"
						amount={money}
						type={type}
					/>
				</Provider>
			);

			expect(component.find(Money).length).toBe(1);
			expect(component.html().includes(`<span>${money}</span>`)).toBe(true);
		});
	});
});
