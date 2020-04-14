import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilterTemplate} from "./components/filter.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

// Количество задач на странице
const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
// console.log(tasks);

// Отрисовка меню
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
// Отрисовка фильтров
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
// Отрисовка доски
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

// Отрисовка формы
render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
// Отрисовка сортировки
render(boardElement, createSortTemplate(), `afterbegin`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
// Отрисовка задач
tasks.slice(1, showingTasksCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

// Отрисовка кнопки "load more"
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
