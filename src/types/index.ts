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
	addItem: (item: IItem) => void;
	addItems: (items: IItem[]) => void;
	getItemByID: (id: IItem) => IItem;
	getItems: () => IItem[];
}

// + IOrderForm
export interface IOrderFormData {
	payment: string;
	address: string;
	email: string;
	phone: string;
	items: string[];
	total: number;
}

export interface IBasketModel {
	items: IItem[];
	addItem: (item: IItem) => void;
	removeItemById: (id: number) => void;
	clearBasket: () => void;
	getItemsNumber: () => number;
	getCost: () => number;
}

export type FormErrors = Partial<Record<keyof IOrderFormData, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAppState {
	catalog: IItemCatalogueModel;
	basket: IBasket;
	order: IOrderFormData;
}

export interface IOrderFormModel extends IOrderFormData{
	softValidate():boolean;
	hardValidate():boolean;
}
//SECTION: VIEWS

export interface ISuccess {
	description: string;
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

export interface ICatalogItem {
	buttonState: boolean;
}

export interface IBasketCard {
	index: number;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IOrderForm extends IOrderFormData, IFormState {}

export interface IBasket {
	items: HTMLElement[];
	total: number;
	enable: boolean;
}
