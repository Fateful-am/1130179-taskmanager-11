import AbstractComponent from "./abstract-component.js";

/** Компонент Задач
 * @extends AbstractComponent
 */
export default class Tasks extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
