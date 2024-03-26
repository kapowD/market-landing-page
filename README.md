# Web-ларёк | documentation

## Примечание

Во избежание наслаивания сеттеров и геттеров в UML, было принято решение ввести дополнительную нотацию. Постфиксом после поля в фигурных скобках указывается, есть ли у поля сеттер и геттер. Может указываться отельно либо сеттер, либо геттер, либо оба, либо это поле в целом может отсутствовать.
Примеры:

- `+someField: someType - {S, G}`
- `+someField: someType - {S}`
- `+someField: someType`

## Используемый стек

- HTML
- TypeScript
- SCSS
- WebPack
- ESLint

## Структура проекта

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

### Важные файлы

- src/pages/**index.html** — HTML-файл главной страницы
- src/types/**index.ts** — файл с типами
- src/**index.ts** — точка входа приложения
- src/scss/**styles.scss** — корневой файл стилей
- src/utils/**constants.ts** — файл с константами
- src/utils/**utils.ts** — файл с утилитами

## Установка и запуск

Для **установки** проекта необходимо выполнить команды:

```bash
npm install
```

Для **запуска проекта** в режиме разработки выполнить команду:

```bash
npm run start
```

**Сборка** проекта

```bash
npm run build
```

## UML-схема

![alt text](./UML.png)

## Реализация

Данное приложение было реализовано с помощью архитектуры MVP:

- **Model** - модель данных;
- **View** - модель отображения интерфейса;
- **Presenter** - связующая модель;

## БАЗОВЫЙ КОД

### Api

Отправляет и принимает данные с сервера

![alt text](./uml_images/image-26.png)

- `baseUrl` - приниамет базовый адрес
- `options`- данные для запросов,
- `handleResponse` - проверяет ответ сервера, может вернуть ошибку или данные
- `get` - получает данные
- `post` - отправляет данные

### ShopAPI

![alt text](./uml_images/image-27.png)

Предоставляет методы для взаимодействия с внешним апи

- `cdn` - CDN
- `getProductItem()` - получить данные товара
- `getProductList()` - получить данные каталога
- `orderProduct()` - отправить данные заказа

### EventEmitter

Представляет из себя паттерн Observer. Обеспечивает работу событий

![alt text](./uml_images/image-28.png)

<!-- - установка и снятие слушателя событий, а также вызов слушателя при возникновении события; -->

- `events` - типы событий и их обработчики
- `on()` - установить/Снять обработчик на событие
- `off()` - снять обработчик на событие
- `emit()` - инициировать событие с данными
- `onAll()` - слушать все события
- `offAll()` - сбросить все события
- `trigger()` - сделать коллбек триггер, генерирующий событие при вызове

<!-- ## Ключевые типы данных

### ICard

```ts
export interface ICard = {
id: string,
description?: string,
image: string,
title: string,
category: Category,
price: number
}
```

### IItemCatalogue

Описывает коллекцию каталога предметов, потображаемых на главной странцие

```ts
export interface ItemCatalogue {
	items: Set<IItem>;
	addItem: (item: IItem) => void;
	addItems: (items: IItem[]) => void;
	getItemByID: (id: IItem) => IItem;
	getItems: () => IItem[];
}
```

### IPayment

```ts
Описывает способ оплаты и адрес доставки
export interface IPayment {
paymentMethod: PaymentMethod
address: string
}
```

### IOrderForm

Описывает форму заказа данных о заказчике

```ts
export interface IOrderForm {
	email: string;
	phone: string;
}
```

### IOrderInfo

Описывает способ оплаты и позволяет ввести адрес доставки заказа. IPayment обеспечивает удобный способ представления и использования различных методов оплаты в приложении.

### FormErrors

Тип ошибки формы ввода

### IBasket

Тип для описания элемента корзины, содержащий информацию о товаре

```ts
export interface Basket {
	items: ICard[];
	addItem: (item: ICard) => void;
	removeItemById: (id: number) => void;
	clearBasket: () => void;
	getItemsNumber: () => number;
	getCost: () => number;
}
```

### IAppState

Тип данных, описывающий состояние приложения, включающий хранение карточек, выбранных товаров, предпросмотра, данных заказа и суммы заказа.

```ts
export interface IAppState {
	catalog: IItemCatalogue[];
	basket: IBasket;
	// preview: string | null;
	order: IOrder | null;
	// loading: boolean;
}
```

### IOrderResult

Описывает результат заказа с уникальным идентификатором и суммой. -->

## View

Каждый UI класс наследуется от `Component<T>` либо сам, либо от родителя. В качестве `Т` каждый класс принимает свой тип данных для рендера. Соответственно параллельно с каждым классом составляется интерфейс для данных рендера, который описывается радом.

<!-- ## Класс "Component"

Абстрактный класс для работы с DOM

```
"toggleClass" - Переключить класс
"setText" - Установить текстовое содержимое
"setDisabled" - Сменить статус блокировки
"setHidden" - Скрыть
"setVisible" - Показать
"setImage" - Установить изображение с алтернативным текстом
"render" - Вернуть корневой DOM-элемент
``` -->

### Component

Абстрактный класс, представляет базовый функционал для создания компонентов интерфейса

![alt text](./uml_images/image-9.png)

- `render()` - используется для обновления данных компонента. Он принимает объект data с частичными данными и применяет их к текущему экземпляру компонента. Возвращает корневой DOM-элемент компонента

### Page

Контейнер для управления информацией в элементах топбара и коллекциии каталога

![alt text](./uml_images/image.png)

#### Page UI Class

- `counter` - элемент счетчика на кнопке корзины
- `catalog` - контейнер для элементов каталога
- `wrapper` - контейнер всей страницы. В данном случае используется для блокировки прокрутки при открытии модального окна
- `basket` - кнопка корзины
- `set locked()` - выставляет состояние блокировки скролла

#### IPage render interface

- `counter` - количество объектов в корзине, для выставления в счетчик
- `catalog` - отренедренные элементы класса `CatalogItem` по темплейту `cardCatalogTemplate`
- `locked` - определение состояния блокировки скролла

### ItemCard

![alt text](./uml_images/image-1.png)

Базовый класс для компонент содержащий информацию о товаре  
Поскольку все классы, наследующие данный класс, должны иметь в рендере минимум те же поля, что в `IItemShort`, то тут стоит ограничитель по типу для `T`

#### ItemCard UI class

- `title` - контейнер заголовка карточки
- `price` - контейнер цены карточки
- `button` - кнопка карточки

#### ItemCard render interface

Идентичен модельному классу [IItemShort](#iitemshort)

### CatalogItem

![alt text](./uml_images/image-2.png)

Отвечает за отображения двух типов карточек - превью и каталог. В зависимости от выбраного template элемента рендерит карточку catalog/preview

#### CatalogItem UI Class

- `category`- элемент категории товара
- `image`- элемент изображение товара
- `description`- элемент текстового описания товара
- `set buttonState()` - устанваливает состояние кнопки на карточку

#### ICatalogItem render interface

Расширяет базовый тип [IItem](#iitem). Добавляется еще одно поле, использующееся при рендере - `buttonState`

- `buttonState` - состояние кнопки

### BasketCard

Карточка товара, находящаяся в корзине.

![alt text](./uml_images/image-3.png)

#### BasketCard UI Class

- `index` - элемент индекса товара

#### IBasketCard render interface

Расширяет базовый тип [IItemShort](#iitemshort) с добавлением поля индекса

- `index` - индекс товара

### Modal

Общий контейнер для всех модальных окон и вывода на них контента

![alt text](./uml_images/image-7.png)

### Modal UI Class

- `closeButton` - элемент кнопки закрытия модального окна
- `content` - контейнер для контента
- `open()` - метод открытия модального окна
- `close()` - метод закрытия модального окна

#### IModalData render interface

- `content` - контент который подается для отображения в модальном окне

### Form

Отображает формы на странице и управляет отображением состояния форм.

![alt text](./uml_images/image-13.png)

### Form UI Class

- `submit` - элемент конпки для подтверждения формы
- `error` - элемент вывода ошибки формы
- `set valid()` - выставляет значение валидности формы

#### IFormState render interface

Минимальный набор данных необходимый для рендера формы, которйы должен учитываться в наследуемых классах

- `valid` - состяние валидности
- `errors` - массив ошибок, который необходимо отрендерить

### Contact

![alt text](./uml_images/image-30.png)

Класс для работы с формой ввода почты и телефона. Получает значения полей get-методами, чтобы разблокировать кнопку отправки формы

#### Contact UI Class

- `email` - инпут элемент для ввода электронной почты
- `phone` - инпут элемент для ввода телефонного номера

#### IOrderForm render interface

Расширяет базовый тип [IOrderFormData](#iorderformdata) и базовый необходимый интерфейс [IFormState](#iformstate-render-interface)

### Payment

![alt text](./uml_images/image-29.png)

Предназначен для работы с формой "Способ оплаты". Он используется для управления элементами формы, связанными с выбором способа оплаты.

#### Payment UI Class

- `buttons` - массив кнопок, представляющих доступные способы оплаты
- `address` - элемент ввода для адреса доставки
- `isAddressField()` - проверяет, заполнено ли поле адреса
- `set payment(name)` - выставялет значение поля впособа оплаты
- `unselect()` - снимает выделение со способов оплаты
- `isSelected()` - проверка выбора способа опалты
- `getSelection()` - получить способ оплаты

#### render interface

Идентичен интерфейсу используемому в [Contact](#contact): [IOrderForm](#iorderform)

### Basket

Обеспечивает функциональность для управления отображением содержимого корзины в модальном окне, а также реагирование на пользовательские действия (Кажется это описание для модели)

![alt text](./uml_images/image-14.png)

#### Basket UI Class

- `list` - элемент представляющий список товаров в корзине
- `total` - элемент представляющий общую сумму товаров в корзине
- `button` - элемент представляющий кнопку корзины.
- `set enable` - метод для установки состояния кнопки корзины

#### IBasket render interface

- `items` - массив отрендереных элементов по классу [BasketCard](#basketcard)
- `total` - общая сумма заказа
- `enable` - состояние кнопки

### Success

Предназначен для отображения окна с уведомлением об успешном заказе

![alt text](./uml_images/image-11.png)

#### Success UI Class

- `description` - элемент представляющий описание успешного заказа
- `closeBtn` - элемент кнопки закрытия окна уведомления

#### ISuccess render interface

- `description` - описание успешного заказа

## Model layer

### Abstract Model

Абстрактный класс, служит базовым для всех моделей

![alt text](./uml_images/image-8.png)

- `emitChanges()` - используется для оповещения об изменениях в модели. Он принимает имя события event и необязательный параметр payload, который содержит дополнительные данные для передачи в событие

### AppState

![alt text](./uml_images/image-32.png)

Создается единожды содержит все модели данных

- `catalogue` - модель каталога товаров
- `basket` - модель корзины заказов
- `form` - модель формы заказа

### BasketModel

Модель данных корзины

![alt text](./uml_images/image-23.png)

- `items` - массив товаров в корзине
- `addItem()` - добавить товар в корзину
- `removeItemById()` - удалить товар из корзины по id
- `clearBasket()` - очищает корзину товаров
- `getCost()` - вычисляет общую стоимость товаров в заказе

### ItemCatalogueModel

Модель данных товара

![alt text](./uml_images/image-20.png)

- `items` - коллекция уникальных (множество) товаров на странцие
- `addItem()` - добавить товар в каталог
- `addItems()` - добавить товары в каталог
- `getItemById()` - получить товар по id
- `getItems()` - получить все товары

### OrderFormModel

Модель данных заказа

![alt text](./uml_images/image31.png)

- `softValidate()` - запускается для проверки доступности нажатия кнопки next
- `hardValidate()` - запускается для проверки на ошибки формы после нажатия кнопки next

## Ключевые типы данных

### IItemShort

Минимальный набор данных объекта из каталога

```ts
export interface IItemShort {
	id: string; // - сохраняемый в элементе Id карточки
	title: string; // - элемент заголовка карточки
	price: number; // - элемент цены карточки
}
```

### IItem

Расширяет [IItemShort](#iitemshort), приходит с бэкенда

```ts
export interface IItem extends IItemShort {
	description?: string; // - описание товара
	image: string; // - ссылка на изображение, хранящееся в images
	category: Category; // - категория товара типа Category
}
```

### Category

```ts
export type Category =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
```

### IOrderFormData

Данные о заказе, отправляются на бэкенд

```ts
export interface IOrderFormData {
	payment: string; // - данные об оплате
	address: string; // - данные адреса покупателя
	email: string; // - данные эмеила покупателя
	phone: string; // -  данные телефонного номера покупателя
	items: string[]; // массив id товаров из корзины
	total: number; // данные общей стоимости заказа
}
```

### IOrderResult

Результаты о формировании заказа, приходят с бэкенда

```ts
export interface IOrderResult {
	id: string; // id заказа
	total: number; // - данные общей стоимости заказа
}
```
