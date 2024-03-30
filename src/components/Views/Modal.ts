import { Component } from '../base/Component';
import { IModalData } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this.container.addEventListener('mousedown', this.close.bind(this));
		this._content.addEventListener('mousedown', (event) =>
			event.stopPropagation()
		);
		this._closeButton.addEventListener('click', () => {
			this.close();
		});
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit('modal:opened');
	}

	close() {
		this.toggleClass(this.container, 'modal_active', false);
		this.events.emit('modal:closed');
		this.content = null;
	}

	get isOpened() {
		return this.container.classList.contains('modal_active');
	}
}
