import { IBasketCard } from '../../../types';
import { ItemCard } from './ItemCard';
import { IEvents } from '../../base/Events';
import { ensureElement } from '../../../utils/utils';

export class BasketCard extends ItemCard<IBasketCard> {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		try {
			this._index = ensureElement<HTMLElement>(
				`.basket__item-index`,
				container
			);
		} catch (e) {
			console.warn(e);
		}

		this._button = ensureElement<HTMLButtonElement>(
			`.basket__item-delete`,
			container
		);

		this._button.addEventListener('click', () => {
			this.events.emit('basket:delete', { id: this.container.dataset.id });
		});
	}

	set index(value: number) {
		this.setText(this._index, String(value));
	}
}
