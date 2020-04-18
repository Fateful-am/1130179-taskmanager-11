/**
 * Константы для вставки DOM-элементов
 * @type {{BEFOREEND: InsertPosition, AFTERBEGIN: InsertPosition}}
 */
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Генерация DOM-элемента на основе шаблона
 * @param {String} template - Шаблон элемента
 * @return {Element} - DOM-элемент
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Отрисовка элемнта в контейнере
 * @param {Element} container - Контейнер для элемента
 * @param {AbstractComponent} component - Компонент для отрисовки
 * @param {InsertPosition} place - Место вставки элемента в контейнер
 */
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

/**
 * Заменяет один элемент на другой в родительском контейнере
 * @param {Element} parent - Родительский контейнер
 * @param {Element} newElement - Новый элемент
 * @param {Element} oldElement - Старый элемент
 */
export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

/**
 * Удаляет элемент из разметки
 * @param {AbstractComponent} component - Компонент для удаления
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
