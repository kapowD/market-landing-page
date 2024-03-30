import { Api } from './base/API';
import { IOrderFormData, IOrderResult, IItem } from '../types';

export interface IShopAPI {
	getProductList: () => Promise<IItem[]>;
	getProductItem: (id: string) => Promise<IItem>;
	orderProducts: (order: IOrderFormData) => Promise<IOrderResult>;
}

export class ShopAPI extends Api implements IShopAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<IItem> {
		return this.get(`/product/${id}`).then((item: IItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IItem[]> {
		return this.get('/product').then(
			(data: { items: IItem[]; total: number }) =>
				data.items.map((item) => ({
					...item,
					image: this.cdn + item.image,
				}))
		);
	}

	orderProducts(order: IOrderFormData): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
