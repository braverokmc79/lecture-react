import { qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    super(qs("#search-form-view"));
    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvent();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";

    this.on(this.resetElement, "click", () => {
      this.resetElement.style.display = "none";
    });
  }

  bindEvent() {
    this.on(this.inputElement, "keyup", () => this.handleKeyUp());
    this.on(this.element, "submit", (event) => this.handleSubmit(event));
  }

  handleKeyUp() {
    const { value } = this.inputElement;
    console.log(tag, "handleKeyUp", value);
    this.showResetButton(value.length > 0);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(tag, "handleSubmit");
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }
}
