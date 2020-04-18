import {createElement} from "../utils.js";

/** Абстрактный класс для компонентов */
export default class AbstractComponent {
  /**
   * Конструктор класса
   */
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);

    }
    this._element = null;
  }

  /**
   * @abstract
   * Должен возыращать шаблон компонента
   */
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  /**
   * Возвращвет элемент компонента
   * @return {Element} - DOM-элемент
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Удаляет элемент из разметки
   */
  removeElement() {
    this._element = null;
  }
}
