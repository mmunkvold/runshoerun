import { addToCart } from "./addToCart.js";

export default function renderProducts(products) {
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = "";

  products.forEach((product) => {
    const imageUrl = "http://localhost:1337";
    const { id, title, price, image } = product;

    productContainer.innerHTML += `
    <div class="product">
      <a href="detail.html?id=${id}">
        <div class="product__img" style='background-image: url("${imageUrl}${image.url}")'></div>
        <h2>${title}</h2>
      </a>
      <div class="center--btn">
        <button class="cart__btn" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${imageUrl}${image.url}">
          <i class="icon bi bi-basket2"></i>${price.toFixed(2)}
        </button>
     </div>
    </div>`;
  });
  const buttons = document.querySelectorAll(".cart__btn");

  buttons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}
