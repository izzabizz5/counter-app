import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.min = 10;
    this.max = 25;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },

    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      div {
        padding: 0;
        margin: 0;
      }
      button {
        display: inline-flex;
        padding: 8px;
        border-radius: 6px;
        border-color: 2px var(--simple-colors-fixed-theme-accent-9);
        margin: 0 8px;
      }

      button:hover,
      button:focus {
        background-color: var(--simple-colors-default-theme-light-green-3);
      }

      h1 {
        text-align: center;
        font-size: 100px;
      }
      h1.warning {
        color: yellow;
      }
      h1.critical {
        color: orange;
      }
      h1.max {
        color: red;
      }

    `];
  }

  decrement (){
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  increment (){
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  colors (){
    if (this.counter == 18) {
      return "warning";
    } else if (this.counter == 21) {
      return "critical";
    } else if (this.counter == this.max || this.counter == this.min) {
      return "max";
    } else {
      return "";
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('counter') && this.counter == 21) {
      this.makeItRain();
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    return html`
<div class="wrapper">
  <div>${this.title}</div>
  <confetti-container id="confetti">
    <h1 class="${this.colors()}">${this.counter}</h1>
  </confetti-container>
  <button ?disabled="${this.min === this.counter}" @click=${this.decrement}>-</button>
  <button ?disabled="${this.max === this.counter}" @click=${this.increment}>+</button>
  <slot></slot>
</div>
`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);