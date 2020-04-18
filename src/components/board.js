import AbstractComponent from "./abstract-component.js";

/** Компонент  доски объявлений*/
export default class Board extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="board container"></section>`
    );
  }
}
