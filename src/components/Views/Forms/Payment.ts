import {Form} from "./Form";
import {IOrderForm} from "../../../types";
import {IEvents} from "../../base/Events";
import {ensureAllElements, ensureElement} from "../../../utils/utils";

export class Payment extends Form<IOrderForm>{
    protected buttons: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.buttons = ensureAllElements<HTMLButtonElement>(`.button_alt`, container);
        this._address = ensureElement<HTMLInputElement>(`.form__input`, container);

        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.selectPayment(button.name);
                this.events.emit('order:change', {field: 'payment', value: button.name});
            })
        })
    }

    selectPayment(name: string): void{
        this.buttons.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === name);
        })
    }

    unselectPayment(): void{
        this.selectPayment("");
    }

    set payment(name: string){
        this.selectPayment(name);
    }

    set address(value: string){
        this._address.value = value;
    }

    clear(): void{
        super.clear();
        this.unselectPayment();
        this._address.value = '';
    }

    // getPaymentSelection(): string{
    //     return this.buttons.find(button => button.classList.contains('button_alt-active'))?.name || "";
    // }
}
