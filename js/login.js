import displayMessage from "./common/displayMessage.js";
import { messages } from "./constants/messages.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { LOGIN_URL } from "./constants/url.js";
import createNav from "./components/createNav.js";
import toTop from "./components/toTop.js";

document.querySelector("#totop").addEventListener("click", toTop);

createNav();

const form = document.querySelector("#login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "You need to fill in both fields", ".message-container");
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  const url = LOGIN_URL;

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "products.html";
    }

    if (json.error) {
      displayMessage("warning", messages.loginError, ".message-container");
    }
  } catch (error) {
    displayMessage("error", messages.formError, ".message-container");
  }
}
