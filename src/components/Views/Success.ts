import {Component} from "../base/Component";
import {ISuccess} from "../../types";
import {ensureElement} from "../../utils/utils";
import {IEvents} from "../base/events";

export class Success extends Component<ISuccess>{
    protected _description: HTMLElement;
    protected closeBtn: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._description = ensureElement<HTMLElement>('.order-success__description', container);
        this.closeBtn = ensureElement<HTMLButtonElement>('.order-success__close', container);

        this.closeBtn.addEventListener('click', () => {
            events.emit('success:close');
        })
    }

    set description(value: number){
        this.setText(this._description, `Списано ${value} синапсов`);
    }

    clear(): void{
        this.setText(this._description, '');
    }
}
