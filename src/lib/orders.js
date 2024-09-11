import "../components/button.js";
import "../components/input.js";
import "../components/cart-item-card.js";
import { getCartsProducts, deleteCart } from "../utils/apiUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.getElementById("cart-container");

  const renderCartItems = async () => {
    cartContainer.innerHTML = "";

    try {
      const cartData = await getCartsProducts();

      cartData.items.forEach((item) => {
        if (item.orderId) {
          const cartItemCard = document.createElement("cart-item-card");

          cartItemCard.setAttribute("item-id", item._id);
          cartItemCard.setAttribute("product-image", item.orderId.productImage);
          cartItemCard.setAttribute("product-name", item.orderId.productName);
          cartItemCard.setAttribute("product-price", item.orderId.productPrice);
          cartItemCard.setAttribute(
            "product-description",
            item.orderId.productDescription
          );
          cartItemCard.setAttribute("product-color", item.orderId.color);
          cartItemCard.setAttribute("product-size", item.orderId.size);
          cartItemCard.setAttribute("quantity", item.quantity);

          cartItemCard.addEventListener("delete-item", async () => {
            try {
              await deleteCart({
                orderId: item.orderId._id,
              });

              cartContainer.removeChild(cartItemCard);
              alert("Item removed from cart")
            } catch (error) {
              console.error("Failed to delete cart item:", error);
            }
          });

          cartContainer.appendChild(cartItemCard);
        }
      });
    } catch (error) {
      console.error("Failed to fetch cart products:", error);
    }
  };

  await renderCartItems();
});
