import {Form} from "./Form";
import {IOrderForm} from "../../../types";
import {IEvents} from "../../base/Events";
import {ensureElement} from "../../../utils/utils";

export class Contacts extends Form<IOrderForm>{
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._phone = ensureElement<HTMLInputElement>(`.form__input[name="phone"]`, container);
        this._email = ensureElement<HTMLInputElement>(`.form__input[name="email"]`, container);
    }

    set phone(value: string){
        this._phone.value = value;
    }

    set email(value: string){
        this._email.value = value;
    }

    clear(): void{
        super.clear();
        this._phone.value = '';
        this._email.value = '';
    }
}
