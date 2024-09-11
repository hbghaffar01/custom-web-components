import "../components/button.js";
import "../components/input.js";
import "../components/product-card.js";
import "../components/carousel.js";
import { getUser, createOrder, getAllProducts } from "../utils/apiUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const renderProducts = async () => {
    const productContainer = document.getElementById("product-container");
    if (productContainer) {
      productContainer.innerHTML = "";
      try {
        const allProducts = await getAllProducts();
        const carousel = document.createElement("carousel-component");

        allProducts.forEach((product) => {
          const card = document.createElement("product-card");
          card.setAttribute("orderid", product._id);
          card.setAttribute("productimage", product.productImage);
          card.setAttribute("productname", product.productName);
          card.setAttribute("productPrice", product.productPrice);
          card.setAttribute("productdescription", product.productDescription);
          card.setAttribute("productnumber", product.productNumber);
          card.setAttribute("color", product.color);
          card.setAttribute("size", product.size);
          carousel.appendChild(card);
        });

        productContainer.appendChild(carousel);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    } else {
      console.error("Product container element not found");
    }
  };

  try {
    const userData = await getUser();
    const welcomeMessage = document.getElementById("welcome-message");

    if (welcomeMessage) {
      welcomeMessage.textContent =
        userData && userData.username
          ? `Welcome ${userData.username}`
          : "Welcome to the Dashboard";
    } else {
      console.error("Welcome message element not found");
    }

    await renderProducts();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
      welcomeMessage.textContent = "Welcome to the Dashboard";
    }
  }

  const createOrderBtn = document.getElementById("create-order-btn");
  const orderModal = document.getElementById("orderModal");
  const closeModalBtn = document.querySelector(".modal .close");
  const submitOrderBtn = document.getElementById("create");
  const orderForm = document.getElementById("orderForm");

  if (
    createOrderBtn &&
    orderModal &&
    closeModalBtn &&
    submitOrderBtn &&
    orderForm
  ) {
    createOrderBtn.addEventListener("click", () => {
      orderModal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", () => {
      orderModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === orderModal) {
        orderModal.style.display = "none";
      }
    });

    submitOrderBtn.addEventListener("click", async (event) => {
      event.preventDefault();

      const orderData = {
        productName: document.querySelector("#productName").value,
        productPrice: document.querySelector("#productPrice").value,
        productDescription: document.querySelector("#productDescription").value,
        productImage: document.querySelector("#productImage").value,
        productNumber: document.querySelector("#productNumber").value,
        uniqueId: document.querySelector("#uniqueId").value,
        color: document.querySelector("#color").value,
        size: document.querySelector("#size").value,
      };
      try {
        await createOrder(orderData);
        document.querySelector("#productName").value = "";
        document.querySelector("#productPrice").value = "";
        document.querySelector("#productDescription").value = "";
        document.querySelector("#productImage").value = "";
        document.querySelector("#productNumber").value = "";
        document.querySelector("#uniqueId").value = "";
        document.querySelector("#color").value = "";
        document.querySelector("#size").value = "";

        orderModal.style.display = "none";

        await renderProducts();
      } catch (error) {
        console.error("Failed to create order:", error);
        alert("Failed to create order. Please try again.");
      }
    });
  } else {
    console.error("Modal elements or form elements not found");
  }
});