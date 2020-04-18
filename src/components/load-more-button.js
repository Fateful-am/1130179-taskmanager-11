import AbstractComponent from "./abstract-component.js";

/** Компонент кнопки "Load More"
 * @extends AbstractComponent
 */
export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
