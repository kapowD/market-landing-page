//SECTION: MODELS

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

export interface IItemCatalogue {
	items: Set<IItem>;
	addItem: (item: IItem) => void;
	addItems: (items: IItem[]) => void;
	getItemByID: (id: IItem) => IItem;
	getItems: () => IItem[];
}

export enum PaymentMethod {
	ONLINE = 'online',
	ON_ARRIVAL = 'on_arrival',
}

// + IOrderForm 
export interface IFormInfo {
	paymentMethod: PaymentMethod;
	address: string;
	email: string;
	phone: string;
}
// + IOrderForm 
export interface IOrder extends IFormInfo {
	items: string[];
	total: number;
}

export interface IBasket {
	items: IItem[];
	addItem: (item: IItem) => void;
	removeItemById: (id: number) => void;
	clearBasket: () => void;
	getItemsNumber: () => number;
	getCost: () => number;
}

export type FormErrors = Partial<Record<keyof IFormInfo, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAppState {
	catalog: IItemCatalogue[];
	basket: IBasket;
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

//SECTION: VIEWS

export interface ISuccess{
    description: string;
}

export interface IPage{
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}