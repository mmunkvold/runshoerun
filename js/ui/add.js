import displayMessage from "../common/displayMessage.js";
import { messages } from "../constants/messages.js";
import createNav from "../components/createNav.js";
import { getFromStorage, getToken } from "../utils/storage.js";
import { BASE_URL } from "../constants/url.js";
import { updateCart } from "../components/addToCart.js";
import toTop from "../components/toTop.js";

document.querySelector("#totop").addEventListener("click", toTop);

const token = getToken();
if (!token) {
  location.href = "/";
}
//let cart = JSON.parse(localStorage.getItem("cartList")) || [];
let cart = getFromStorage("cartList");
updateCart(cart);

createNav();

const form = document.querySelector("#add-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const image = document.querySelector("#image");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const imageValue = image.value;

  if (titleValue.length === 0 || priceValue.length === 0 || descriptionValue.length === 0 || imageValue.length === 0) {
    return displayMessage("warning", "You need to fill in name of product, price, description and add an image", ".message-container");
  }

  addProduct(titleValue, priceValue, descriptionValue, featuredValue, imageValue);
}

async function addProduct(title, price, description, featured) {
  const url = BASE_URL + "products";

  const formData = new FormData();

  const file = image.files[0];

  const data = { title, price, description, featured };

  formData.append("files.image", file, file.name);
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.created_at) {
      displayMessage("success", messages.productSubmitted, ".message-container");
      form.reset();
    }

    if (json.error) {
      displayMessage("error", messages.serverError, ".message-container");
    }
  } catch (error) {
    displayMessage("error", messages.serverError, ".message-container");
  }
}
