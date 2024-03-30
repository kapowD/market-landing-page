import { IFormState } from '../../../types';
import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';

export class Form<T extends IFormState> extends Component<T> {
	protected _submit: HTMLButtonElement;
	protected _error: HTMLElement;
	private containerName: string;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.containerName = container.getAttribute('name') || 'form';

		this._submit = ensureElement<HTMLButtonElement>(
			'.button[type=submit]',
			container
		);
		this._error = ensureElement<HTMLElement>('.form__errors', container);

		this.container.addEventListener('input', (e) => {
			console.log('Input event', this.containerName);
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.events.emit(`${this.containerName}:change`, { field, value });
		});

		this.container.addEventListener('submit', (e) => {
			e.preventDefault();
			this.events.emit(`${this.containerName}:submit`);
		});
	}

	set valid(value: boolean) {
		this.setDisabled(this._submit, !value);
	}

	set errors(value: string) {
		this.setText(this._error, value);
	}

	clear(): void {
		this.valid = false;
	}
}
