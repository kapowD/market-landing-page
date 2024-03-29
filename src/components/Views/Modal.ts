import {Component} from "../base/Component";
import {IModalData} from "../../types";
import {ensureElement} from "../../utils/utils";
import {IEvents} from "../base/events";


export class Modal extends Component<IModalData>{
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', () => {
            this.close()
        });
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:opened');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.events.emit('modal:closed');
    }

    get isOpened() {
        return this.container.classList.contains('modal_active')
    }

}
