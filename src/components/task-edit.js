import {COLORS, DAYS, MONTH_NAMES} from "../const.js";
import AbstractComponent from "./abstract-component.js";
import {formatTime} from "../utils/common.js";

/** Компонент редактирования задачи
 * @extends AbstractComponent
 */
export default class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  _createColorsMarkup(colors, currentColor) {
    return colors
      .map((color, index) => {
        const checkedFlag = currentColor === color ? `checked` : ``;
        return (
          `<input
          type="radio"
          id="color-${color}-${index}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${checkedFlag}
        />
        <label
          for="color-${color}--${index}"
          class="card__color card__color--${color}"
          >${color}</label>`
        );
      })
      .join(`\n`);
  }

  _createRepeatingDaysMarkup(days, repeatingDays) {
    return days
      .map((day, index) => {
        const isChecked = repeatingDays[day];
        const checkedFlag = isChecked ? `checked` : ``;
        return (
          `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-${index}"
          name="repeat"
          value="${day}"
          ${checkedFlag}
        />
        <label class="card__repeat-day" for="repeat-${day}-${index}"
          >${day}</label>`
        );
      })
      .join(`\n`);
  }

  getTemplate() {
    const {description, dueDate, color, repeatingDays} = this._task;

    const isExpired = dueDate instanceof Date && dueDate < Date.now();
    const isDateShowing = !!dueDate;

    const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
    const time = isDateShowing ? formatTime(dueDate) : ``;

    const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
    const repeatClass = isRepeatingTask ? `card--repeat` : ``;
    const deadlineClass = isExpired ? `card--deadline` : ``;

    const colorsMarkup = this._createColorsMarkup(COLORS, color);
    const repeatingDaysMarkup = this._createRepeatingDaysMarkup(DAYS, repeatingDays);

    const cardDateStatus = isDateShowing ? `yes` : `no`;
    const cardRepeatStatus = isRepeatingTask ? `yes` : `no`;

    const cardDateDeadline = isDateShowing ?
      `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${date} ${time}"
        />
      </label>
    </fieldset>`
      : ``;

    const cardRepeatDays = isRepeatingTask ?
      `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${repeatingDaysMarkup}
      </div>
    </fieldset>`
      : ``;

    return (
      `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${cardDateStatus}</span>
                </button>
                ${cardDateDeadline}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${cardRepeatStatus}</span>
                </button>
                ${cardRepeatDays}
                </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
    );
  }
}
