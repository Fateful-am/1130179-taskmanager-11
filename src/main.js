import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilterTemplate} from "./components/filter.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";

// Количество задач на странице
const TASK_COUNT = 3;

/**
 * Функция рендеренга компонентов
 * @param {Element} container Контейнер для шаблона
 * @param {String} template HTML-компонент для вставки
 * @param {InsertPosition} place Место вставки
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// Отрисовка меню
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
// Отрисовка фильтров
render(siteMainElement, createFilterTemplate(), `beforeend`);
// Отрисовка доски
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

// Отрисовка формы
render(taskListElement, createTaskEditTemplate(), `beforeend`);
// Отрисовка сортировки
render(boardElement, createSortingTemplate(), `afterbegin`);
// Отрисовка задач
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

// Отрисовка кнопки "load more"
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
