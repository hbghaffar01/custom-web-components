class CartItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const productImage = this.getAttribute("product-image");
    const productName = this.getAttribute("product-name");
    const productPrice = this.getAttribute("product-price");
    const productDescription = this.getAttribute("product-description");
    const productColor = this.getAttribute("product-color");
    const productSize = this.getAttribute("product-size");
    const quantity = this.getAttribute("quantity");

    this.shadowRoot.innerHTML = `
        <style>
          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 200px;
            margin: 10px;
            padding: 10px;
            text-align: center;
          }
          .card img {
            width: 200px;
            height: 200px;
            border-radius: 8px;
          }
          .card-content {
            margin-top: 10px;
          }
          .product-name {
            font-size: 18px;
            font-weight: bold;
          }
          .product-description {
            font-size: 14px;
            color: #666;
          }
          .product-details {
            font-size: 14px;
            margin: 5px 0;
          }
          custom-button {
            margin-top: 10px;
            cursor: pointer;
          }
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
          }
        </style>
        <div class="card">
          <img src="${productImage}" alt="${productName}" />
          <div class="card-content">
            <div class="product-name">${productName}</div>
            <div class="product-name">Price: $${productPrice}</div>
            <div class="product-description">${productDescription}</div>
            <div class="product-details">Color: ${productColor}</div>
            <div class="product-details">Size: ${productSize}</div>
            <div class="product-details">Quantity: ${quantity}</div>
            <div class="buttons-wrapper">
              <custom-button id="buyButton" text="Buy"></custom-button>
              <custom-button id="deleteButton" color="#dc3545" text="Remove"></custom-button>
            </div>
          </div>
        </div>
        <div class="modal" id="couponModal">
          <div class="modal-content">
            <label for="coupon">Apply Coupon <span class="required">*</span></label>
            <custom-input type="text" id="coupon" name="coupon"></custom-input>
            <div id="discount-info"></div>
            <custom-button id="applyCoupon" text="Apply Coupon && buy"></custom-button>
            <custom-button id="closeModal" text="Close"></custom-button>
          </div>
        </div>
      `;

    this.shadowRoot
      .getElementById("buyButton")
      .addEventListener("click", () => {
        this.openModal();
      });

    this.shadowRoot
      .getElementById("deleteButton")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("delete-item", {
            detail: { itemId: this.getAttribute("item-id") },
            bubbles: true,
            composed: true,
          })
        );
      });

    this.shadowRoot
      .getElementById("applyCoupon")
      .addEventListener("click", () => {
        const couponInput = this.shadowRoot.querySelector("#coupon");
        const couponCode = couponInput.shadowRoot
          .querySelector("input")
          .value.trim();
        const productPrice = parseFloat(this.getAttribute("product-price"));

        let finalPrice = productPrice;
        if (couponCode === "Dis10") {
          finalPrice = productPrice * 0.9; // 10% discount
        } else if (couponCode === "Dis20") {
          finalPrice = productPrice * 0.8; // 20% discount
        }

        this.shadowRoot.getElementById(
          "discount-info"
        ).innerText = `Final Price: $${finalPrice.toFixed(2)}`;

        alert("Purchased successfully!");
      });

    this.shadowRoot
      .getElementById("closeModal")
      .addEventListener("click", () => {
        this.closeModal();
      });
  }

  openModal() {
    const modal = this.shadowRoot.getElementById("couponModal");
    modal.style.display = "flex";
  }

  closeModal() {
    const modal = this.shadowRoot.getElementById("couponModal");
    modal.style.display = "none";
  }
}

customElements.define("cart-item-card", CartItemCard);
