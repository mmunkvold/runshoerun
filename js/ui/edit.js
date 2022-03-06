import displayMessage from "../common/displayMessage.js";
import { messages } from "../constants/messages.js";
import createNav from "../components/createNav.js";
import { getToken, getFromStorage, saveToStorage } from "../utils/storage.js";
import { BASE_URL } from "../constants/url.js";
import deleteButton from "../components/deleteButton.js";
import { updateCart } from "../components/addToCart.js";
import toTop from "../components/toTop.js";

document.querySelector("#totop").addEventListener("click", toTop);

const token = getToken();
if (!token) {
  location.href = "login.html";
}

let cart = getFromStorage("cartList");

updateCart(cart);
createNav();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = BASE_URL + "products/" + id;
const form = document.querySelector("#edit-form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const thumbnail = document.querySelector("#thumbnail");
const thumbnail_url = "http://localhost:1337";
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const featured = document.querySelector("#featured");

let newImage = false;

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    title.value = details.title;
    price.value = details.price;
    description.value = details.description;
    thumbnail.src = thumbnail_url + details.image["formats"]["thumbnail"].url;
    idInput.value = details.id;
    featured.checked = details.featured;

    deleteButton(details.id);
  } catch (error) {
    displayMessage("error", error, ".message-container");
  } finally {
    form.style.display = "block";
  }
})();

image.onchange = imageChanged();
function imageChanged() {
  newImage = true;
}

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  const file = image.files[0];
  const idValue = idInput.value;
  const featuredValue = featured.checked;

  if (titleValue.length === 0 || priceValue.length === 0 || descriptionValue.length === 0) {
    return displayMessage("warning", "You need to fill in title, price and description", ".message-container");
  }

  updateProduct(titleValue, priceValue, descriptionValue, idValue, file, featuredValue);
}

async function updateProduct(title, price, description, id, file, featured) {
  const url = BASE_URL + "products/" + id;

  const formData = new FormData();

  if (newImage) {
    formData.append("files.image", file);
  }

  const data = { title, price, description, featured };
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", messages.productUpdated, ".message-container");
    }

    if (json.error) {
      displayMessage("error", messages.serverError, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
