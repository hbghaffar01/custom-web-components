import "../components/button.js";
import { addToCart, deleteProduct } from "../utils/apiUtils.js";

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isFetching = false;
  }

  static get observedAttributes() {
    return [
      "productimage",
      "productname",
      "productPrice",
      "productdescription",
      "productnumber",
      "color",
      "size",
      "orderid",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const image = this.getAttribute("productimage");
    const name = this.getAttribute("productname");
    const price = this.getAttribute("productPrice");
    const description = this.getAttribute("productdescription");
    const number = this.getAttribute("productnumber");
    const color = this.getAttribute("color");
    const size = this.getAttribute("size");
    const orderId = this.getAttribute("orderid");

    const buttonColor = this.isFetching ? "gray" : "#28a745";

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 250px;
          margin: 10px;
          padding: 10px;
          text-align: center;
        }
        .card img {
          width: 200px;
          height: 200px;
          border-radius: 4px;
        }
        .card h3 {
          font-size: 1.2em;
          margin: 10px 0;
        }
        .card p {
          color: #555;
          font-size: 0.9em;
          margin: 5px 0;
        }
        .card-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
      </style>
      <div class="card">
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <h4>price = ${price ? price : 'N/A'}</h4>
        <p>${description}</p>
        <p>Number: ${number}</p>
        <p>Size: ${size}</p>
        <p>Color: ${color}</p>
        <div class="card-footer">
          <custom-button id="add-to-cart-btn" text="Add to Cart" color="${buttonColor}"></custom-button>
          <custom-button id="delete-product" text="Delete" color="#dc3545"></custom-button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const addToCartButton = this.shadowRoot.querySelector("#add-to-cart-btn");
    const deleteButton = this.shadowRoot.querySelector("#delete-product");

    if (addToCartButton) {
      addToCartButton.addEventListener("button-click", async () => {
        const orderId = this.getAttribute("orderid");
        if (orderId) {
          const cartData = {
            orderId: orderId,
            quantity: 1,
          };

          this.isFetching = true;
          this.updateButtonState();

          try {
            await addToCart(cartData);
            alert("Added to cart successfully!");
          } catch (error) {
            console.error("Failed to add to cart:", error);
            alert("Failed to add to cart. Please try again.");
          } finally {
            this.isFetching = false;
            this.updateButtonState();
          }
        } else {
          console.error("Order ID is missing.");
        }
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("button-click", async () => {
        const orderId = this.getAttribute("orderid");
        if (orderId) {
          this.isFetching = true;
          this.updateButtonState();

          try {
            await deleteProduct(orderId);
            alert("Product deleted successfully!");
            this.remove();
          } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product. Please try again.");
          } finally {
            this.isFetching = false;
            this.updateButtonState();
          }
        } else {
          console.error("Order ID is missing.");
        }
      });
    }
  }

  updateButtonState() {
    const addToCartButton = this.shadowRoot.querySelector("#add-to-cart-btn");
    if (addToCartButton) {
      addToCartButton.setAttribute(
        "color",
        this.isFetching ? "gray" : "#28a745"
      );
      addToCartButton.style.pointerEvents = this.isFetching ? "none" : "auto";
    }
  }
}

customElements.define("product-card", ProductCard);