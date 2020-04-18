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
 * @param {Element} element - Элемент для отрисовки
 * @param {InsertPosition} place - Место вставки элемента в контейнер
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
