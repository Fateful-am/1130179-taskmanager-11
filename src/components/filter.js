import {createElement} from "../utils.js";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  _createFilterMarkup(filter, isChecked) {
    const {name, count} = filter;
    const checkedFlag = isChecked ? `checked` : ``;
    const disabledFlag = count === 0 ? `disabled` : ``;
    return (
      `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${checkedFlag}
      ${disabledFlag}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label>`
    );
  }

  getTemplate() {
    const filterMarkup = this._filters.map((it, i) => this._createFilterMarkup(it, i === 0)).join(`\n`);

    return (
      `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
