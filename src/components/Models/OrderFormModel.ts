import { IEvents } from '../base/Events';
import { Model } from '../base/Model';
import {
	FormErrors,
	FormType,
	IFormData,
	IOrderFormData,
	IOrderFormModel,
} from '../../types';

export class OrderFormModel
	extends Model<IOrderFormData>
	implements IOrderFormModel
{
	phone = '';
	address = '';
	email = '';
	payment = '';

	constructor(events: IEvents) {
		super({}, events);
	}

	items: string[];
	total: number;

	hardValidate(type: FormType): boolean {
		console.log('hardValidate on', type);
		const errorMessage: FormErrors = {};
		if (type === 'contacts') {
			const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
			if (this.email.length === 0) {
				errorMessage.email = 'Электронная почта должна быть заполнена';
			} else if (!emailRegex.test(this.email)) {
				errorMessage.email = 'Электронная почта в неверном формате';
			}

			const phoneRegex = /^\+7\d{10}$/;
			if (this.phone.length === 0) {
				errorMessage.phone = 'Номер телефона должен быть заполнен';
			} else if (!phoneRegex.test(this.phone)) {
				errorMessage.phone =
					'Номер телефона должен быть в формате +7XXXXXXXXXX';
			}
		} else if (type === 'order') {
			if (this.payment.length === 0) {
				errorMessage.payment = 'Тип оплаты должен быть выбран';
			} else if (this.payment !== 'cash' && this.payment !== 'card') {
				errorMessage.payment =
					'Тип оплаты должен быть либо наличными, либо картой';
			}

			// eslint-disable-next-line
			const addressRegex = /^[a-zA-Zа-яА-Я0-9\s\d,-\/№]+$/u;
			if (this.address.length === 0) {
				errorMessage.address = 'Адрес доставки должен быть заполнен';
			} else if (!addressRegex.test(this.address)) {
				errorMessage.address =
					'Адрес должен содержать только буквы, цифры и знаки препинания';
			}
		}

		console.log('Emitting error messages', errorMessage);

		this.emitChanges(`${type}:errors`, errorMessage);
		return Object.keys(errorMessage).length === 0;
	}

	getFormData(): IOrderFormData {
		return {
			email: this.email,
			phone: this.phone,
			address: this.address,
			payment: this.payment,
			items: this.items,
			total: this.total,
		};
	}

	setFormField(data: {
		field: keyof IFormData;
		value: string;
	}): IOrderFormModel {
		this[data.field] = data.value;
		return this;
	}

	clearOrder(): void {
		this.email = '';
		this.phone = '';
		this.address = '';
		this.payment = '';
		this.items = [];
		this.total = 0;
	}
}
