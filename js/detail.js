import displayMessage from "./common/displayMessage.js";
import { messages } from "./constants/messages.js";
import { addToCart } from "./components/addToCart.js";
import createNav from "./components/createNav.js";
import toTop from "./components/toTop.js";

document.querySelector("#totop").addEventListener("click", toTop);

createNav();

//const title = document.querySelector("title");

const detailProductContainer = document.querySelector(".detail-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://under-my-umbrella.herokuapp.com/products" + id;

async function getSingleProduct() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    document.title = results.title + " | Run Shoe, Run!";
    renderSingleProduct(results);

    const buttons = document.querySelectorAll(".cart__btn");

    buttons.forEach(function (button) {
      button.addEventListener("click", addToCart);
    });
  } catch (error) {
    displayMessage("error", messages.serverError, ".detail-container");
  }
}
getSingleProduct();

function renderSingleProduct(results) {
  const imageUrl = "https://under-my-umbrella.herokuapp.com";
  const { id, title, price, image, description } = results;

  detailProductContainer.innerHTML = `
  <div class="detail__wrapper">
    <div class="detail__img__container">
      <div class="detail__img" style='background-image: url("${imageUrl}${image.url}")' alt="${title}">
      </div>
    </div>
    <div>
      <h1>${title}</h1>
      <h2>Product Details</h2>
      <p>${description}</p>
      <button class="cart__btn" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${imageUrl}${
    image.url
  }"><i class="icon bi bi-basket2"></i>${price.toFixed(2)}
      </button>
      <hr>
      <br>
      <a href="edit.html?id=${id}" id="edit-link">edit product</a><br><small> (you need to be logged in)</small>
    </div>
  </div>`;
}
