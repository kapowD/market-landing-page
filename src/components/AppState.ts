import {IAppState, IBasketModel, IItemCatalogueModel, IOrderFormModel} from "../types";
import {IEvents} from "./base/events";
import {ItemCatalogueModel} from "./Models/ItemCatalogueModel";
import {BasketModel} from "./Models/BasketModel";
import {OrderFormModel} from "./Models/OrderFormModel";

export class AppState implements IAppState{
    public readonly basket: IBasketModel;
    public readonly catalog: IItemCatalogueModel;
    public readonly order: IOrderFormModel;

    constructor(events: IEvents) {
        this.catalog = new ItemCatalogueModel(events);
        this.basket = new BasketModel(events);
        this.order = new OrderFormModel(events);
    }

}
