class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["text", "type", "color", "href", "transparent", "block"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const text = this.getAttribute("text") || "Click me";
    const type = this.getAttribute("type") || "button";
    const color = this.getAttribute("color") || "#007bff";
    const href = this.getAttribute("href");
    const isLink = href !== null;
    const transparent = this.hasAttribute("transparent");
    const block = this.hasAttribute("block");

    this.shadowRoot.innerHTML = `
      <style>
        .button {
          background-color: ${transparent ? "transparent" : color};
          border: ${transparent ? "none" : `1px solid ${color}`};
          color: ${transparent ? "inherit" : "#fff"};
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
          ${block ? "width: 100%;" : "width: auto;"}
        }
        a {
          color: ${transparent ? color : "#fff"};
        }
        .button:hover {
          background-color: ${
            transparent ? "transparent" : this.darkenColor(color, 10)
          };
        }
      </style>
      ${
        isLink
          ? `<a href="${href}" class="button">${text}</a>`
          : `<button type="${type}" class="button">${text}</button>`
      }
    `;
  }

  attachEventListeners() {
    const element = this.shadowRoot.querySelector(".button");
    if (!element) return;

    element.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("button-click", { bubbles: true, composed: true })
      );
    });
  }

  darkenColor(color, percent) {
    const f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      "#" +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  }
}

customElements.define("custom-button", CustomButton);