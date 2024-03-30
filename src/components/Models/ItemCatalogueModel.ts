import { Model } from '../base/Model';
import { IItem, IItemCatalogueModel } from '../../types';
import { IEvents } from '../base/Events';

export class ItemCatalogueModel
	extends Model<IItem>
	implements IItemCatalogueModel
{
	items: Set<IItem> = new Set<IItem>(); //TODO: Private

	constructor(events: IEvents) {
		super({}, events);
	}

	addItems(items: IItem[]): void {
		items.forEach((item) => this.items.add(item));
		this.emitCatalogChange();
	}

	getItemByID(id: string): IItem | undefined {
		return Array.from(this.items).find((item) => item.id === id);
	}

	getItems(): IItem[] {
		return Array.from(this.items);
	}

	private emitCatalogChange() {
		this.emitChanges('catalogue:change', { items: this.items });
	}
}
