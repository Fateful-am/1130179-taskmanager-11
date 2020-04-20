import AbstractComponent from "./abstract-component.js";

/** Компонент доски объявлений
 * @extends AbstractComponent
 */
export default class Board extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="board container"></section>`
    );
  }
}
