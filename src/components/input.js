class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._value = this.getAttribute("value") || "";
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    const inputElement = this.shadowRoot.querySelector("input");
    inputElement.value = this._value;
  }

  render() {
    const type = this.getAttribute("type") || "text";
    const placeholder = this.getAttribute("placeholder") || "";

    const isPassword = type === "password";
    const showPassword = isPassword ? "password" : "text";
    const buttonText = isPassword ? "Show" : "Hide";

    this.shadowRoot.innerHTML = `
        <style>
          .input-container {
            position: relative;
            display: flex;
            align-items: center;
          }
          input {
            width: 100%;
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            position: absolute;
            right: 10px;
            background: none;
            border: none;
            cursor: pointer;
            color: #007bff;
          }
          input:focus-visible {
            outline: none;
          }
        </style>
        <div class="input-container">
          <input type="${showPassword}" placeholder="${placeholder}" value="${
      this._value
    }" />
          ${isPassword ? `<button type="button">${buttonText}</button>` : ""}
        </div>
      `;
  }

  attachEventListeners() {
    const button = this.shadowRoot.querySelector("button");
    const input = this.shadowRoot.querySelector("input");

    if (button) {
      button.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        button.textContent = isPassword ? "Hide" : "Show";
      });
    }
  }

  get value() {
    const inputElement = this.shadowRoot.querySelector("input");
    return inputElement.value;
  }

  set value(val) {
    const inputElement = this.shadowRoot.querySelector("input");
    inputElement.value = val;
    this._value = val;
  }
}

customElements.define("custom-input", CustomInput);
