export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
