import {IBasketModel, IItem} from "../../types";
import {Model} from "../base/Model";
import {IEvents} from "../base/events";

export class BasketModel extends Model<IBasketModel> implements IBasketModel{
    items: IItem[] = []//TODO: Private

    constructor(events: IEvents) {
        super({}, events);
    }

    addItem(item: IItem): void {
        this.items.push(item)
        this.emitBasketChange()
    }

    removeItemById(id: string): void {
        this.items = this.items.filter(item => item.id !== id)
        this.emitBasketChange()
    }

    clearBasket(): void {
        this.items = []
        this.emitBasketChange()
    }

    getCost(): number {
        return this.items.map(item => item.price).reduce((acc, price) => acc + price, 0)
    }

    getItemsNumber(): number {
        return this.items.length
    }

    getItemByID(id: string): IItem | undefined {
        return this.items.find(item => item.id === id)
    }

    getItems(): IItem[] {
        return this.items
    }

    getItemsId(): string[] {
        return this.items.map(item => item.id)
    }

    private emitBasketChange(){
        this.emitChanges('basket:change', {items: this.items})
    }
}
