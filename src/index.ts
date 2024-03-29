import './scss/styles.scss';
import {cloneTemplate, ensureElement} from "./utils/utils";
import {AppState} from "./components/AppState";
import {EventEmitter} from "./components/base/events";
import {ShopAPI} from "./components/base/ShopAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {IBasket, IItem, FormType, IFormData, IOrderForm, FormErrors} from "./types";
import {Page} from "./components/Views/Page";
import {Modal} from "./components/Views/Modal";
import {CatalogueItem} from "./components/Views/Cards/CatalogueItem";
import {BasketCard} from "./components/Views/Cards/BasketCard";
import {Basket} from "./components/Views/Basket";
import {Form} from "./components/Views/Forms/Form";
import {Payment} from "./components/Views/Forms/Payment";
import {Contacts} from "./components/Views/Forms/Contacts";
import {Success} from "./components/Views/Success";

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


//SECTION: Model initialization
const events = new EventEmitter();
const appState = new AppState(events);
const api = new ShopAPI(CDN_URL, API_URL);

api.getProductList().then((items) => {
    appState.catalog.addItems(items);
}).catch((error) => {
    console.error("Fatal error: can't load product list from API")
    console.error(error);
});

//SECTION: View initialization

const page = new Page(document.body, events);

const modal_container = ensureElement<HTMLElement>('#modal-container');
const modal = new Modal(modal_container, events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

const formTypes: FormType[] = ['contacts', 'order'];

const paymentTemplateClone = cloneTemplate(orderTemplate);
const payment: Payment = new Payment(paymentTemplateClone, events);

const contactsTemplateClone = cloneTemplate(contactsTemplate);
const contacts: Contacts = new Contacts(contactsTemplateClone, events);

const formName2Object = new Map<FormType, Form<IOrderForm>>([
    ['contacts', contacts],
    ['order', payment]
]);

const successTemplateClone = cloneTemplate(successTemplate);
const success = new Success(successTemplateClone, events);

//SECTION: Local util functions
function getBasketInfo(): IBasket{
    const items = appState.basket.getItems();
    const cards = items.map((item, index) => {
        const card = new BasketCard(cloneTemplate(cardBasketTemplate), events);
        return card.render({...item, index: index+1});
    });

    const total = appState.basket.getCost();
    const enable = items.length > 0;

    return {items: cards, total, enable};
}

function wipeData(){
    appState.basket.clearBasket();
    appState.order.clearOrder();
    contacts.clear();
    payment.clear();
}

//SECTION: Model data events

events.on('catalogue:change', (data: {items: Set<IItem>}) => {
    console.log("Catalogue change:", data.items);
    page.catalog = [...data.items].map((item) => {
        const card = new CatalogueItem(cloneTemplate(cardCatalogTemplate), events);
        return card.render(item);
    });
});

events.on('basket:change', (data: {items: IItem[]}) => {
    console.log("Basket change:", data.items);
    page.counter = data.items.length;
    if(modal.isOpened){
        console.log("Refreshing basket render")
        basket.render(getBasketInfo());
    }
});

for(const type of formTypes){
    events.on(`${type}:errors`, (data: FormErrors) => {
        console.log("Form errors:", data, 'on', type);
        const str = Object.keys(data).map((key: keyof IFormData) => data[key]).join('; ');
        formName2Object.get(type).errors = str;
    })
}


//SECTION: View user events

//1 SECTION: Catalogue events

events.on('catalogue:select', (data: {id: string}) => {
    const item = appState.catalog.getItemByID(data.id);
    const existing = appState.basket.getItemByID(data.id);

    // const item = appState.catalog.getItemByID(data.id);
    const card = new CatalogueItem(cloneTemplate(cardPreviewTemplate), events);
    card.buttonState = existing === undefined;
    modal.render({content: card.render(item)});
    modal.open();
});

events.on('catalogue:buy', (data: {id: string}) => {
    const item = appState.catalog.getItemByID(data.id);
    appState.basket.addItem(item);
    modal.close()
});

//2 SECTION: Modal events

events.on('modal:opened', () => {
    console.log("Modal opened");
    page.locked = true;
});
events.on('modal:closed', () => {
    console.log("Modal closed");
    page.locked = false;
});

//3 SECTION: Basket events

events.on('basket:open', () => {
    const element = basket.render(getBasketInfo())
    modal.render({content: element});
    modal.open();
});

events.on('basket:delete', (data: {id: string}) => {
    console.log("Delete item:", data.id);
    appState.basket.removeItemById(data.id);
})

events.on('basket:order', () => {
    appState.order.items = appState.basket.getItemsId();
    appState.order.total = appState.basket.getCost();

    modal.render({content: payment.render(appState.order.getFormData())});
    modal.open();
});

//4 SECTION: Form events

for(const type of formTypes){
    events.on(`${type}:change`, (data: {field: keyof IFormData, value: string}) => {
        console.log(data.field, " form change ", data.value);
        if(appState.order.setFormField(data).softValidate(type)){
            formName2Object.get(type).valid = true;
        } else {
            formName2Object.get(type).valid = false;
        }
    });

    events.on(`${type}:submit`, () => {
        console.log("Submit form ", type);
        if(appState.order.hardValidate(type)){
            if(type === 'order'){
                modal.render({content: contacts.render(appState.order.getFormData())});
            } else if(type === 'contacts'){
                api.orderProducts(appState.order.getFormData()).then((result) => {
                    wipeData();
                    modal.render({content: success.render({description: result.total})});
                }).catch((error) => {
                    console.error("Error during order processing");
                    console.error(error);
                    events.emit('contacts:errors', {email: `Ошибка при обработке заказа: ${error}`})
                });
            }
        }
    });
}

events.on('success:close', () => {
    modal.close();
});
