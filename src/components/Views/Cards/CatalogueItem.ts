import { ItemCard } from './ItemCard';
import { Category, ICatalogItem } from '../../../types';
import { IEvents } from '../../base/events';

export class CatalogueItem extends ItemCard<ICatalogItem> {
	protected _description: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;

	static remapCategory2Class: Map<Category, string> = new Map([
		['софт-скил', 'soft'],
		['хард-скил', 'hard'],
		['кнопка', 'button'],
		['дополнительное', 'additional'],
		['другое', 'other'],
	]);

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		try {
			this._description = container.querySelector('.card__description');
		} catch (e) {
			console.warn(e);
		}
		try {
			this._image = container.querySelector('.card__image');
		} catch (e) {
			console.warn(e);
		}
		try {
			this._category = container.querySelector('.card__category');
		} catch (e) {
			console.warn(e);
		}

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('catalogue:buy', { id: this.container.dataset.id });
				this.buttonState = false;
			});
		} else {
			this.container.addEventListener('click', () => {
				this.events.emit('catalogue:select', { id: this.container.dataset.id });
			});
		}
	}

	set buttonState(val: boolean){
        this.setDisabled(this._button, !val)
    }

	set category(value: Category) {
		this.setText(this._category, value);
		this._category.classList.add(
			`card__category_${CatalogueItem.remapCategory2Class.get(value)}`
		);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.title = value;
	}
}
