import { Component } from '../../base/Component';
import { IItemShort } from '../../../types';
import { ensureElement } from '../../../utils/utils';

export class ItemCard<T extends IItemShort> extends Component<T> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		try {
			this._title = ensureElement<HTMLElement>(`.card__title`, container);
		} catch (e) {
			console.warn(e);
		}
		try {
			this._price = ensureElement<HTMLElement>(`.card__price`, container);
		} catch (e) {
			console.warn(e);
		}
		try {
			this._button = ensureElement<HTMLElement>(`.card__button`, container);
		} catch (e) {
			console.warn(e);
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		const str = value > 0 ? `${value} синапсов` : 'Бесценно';
		this.setText(this._price, str);
	}
}
