export type Category =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
//+
export interface IItemShort {
	id: string;
	title: string;
	price: number;
}
//+
export interface IItem extends IItemShort {
	description?: string;
	image: string;
	category: Category;
}

export interface IItemCatalogueModel {
	items: Set<IItem>;
	// addItem: (item: IItem) => void;
	addItems: (items: IItem[]) => void;
	getItemByID: (id: string) => IItem | undefined;
	getItems: () => IItem[];
}

// + IOrderForm

export interface IFormData {
	payment: string;
	address: string;
	email: string;
	phone: string;
}
export interface IOrderFormData extends IFormData {
	items: string[];
	total: number;
}

export interface IBasketModel {
	items: IItem[];
	addItem: (item: IItem) => void;
	removeItemById: (id: string) => void;
	clearBasket: () => void;
	getItemsNumber: () => number;
	getCost: () => number;
	getItemByID: (id: string) => IItem | undefined;
	getItems: () => IItem[];
	getItemsId: () => string[];
}

export type FormErrors = Partial<Record<keyof IFormData, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAppState {
	catalog: IItemCatalogueModel;
	basket: IBasketModel;
	order: IOrderFormData;
}

export type FormType = 'contacts' | 'order';

export interface IOrderFormModel extends IOrderFormData {
	hardValidate(type: FormType): boolean;
	getFormData(): IOrderFormData;
	clearOrder(): void;
	setFormField(data: {
		field: keyof IFormData;
		value: string;
	}): IOrderFormModel;
}
//SECTION: VIEWS

export interface ISuccess {
	description: number;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IItemShort {
	id: string;
	title: string;
	price: number;
}

export interface ICatalogItem extends IItem {
	buttonState: boolean;
}

export interface IBasketCard extends IItemShort {
	index: number;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: FormErrors;
}

export interface IOrderForm extends IOrderFormData, IFormState {}

export interface IBasket {
	items: HTMLElement[];
	total: number;
	enable: boolean;
}
