import displayMessage from "./common/displayMessage.js";
import { messages } from "./constants/messages.js";
import { BASE_URL } from "./constants/url.js";
import renderFeatured from "./components/featured.js";
import { addToCart } from "./components/addToCart.js";
import createNav from "./components/createNav.js";
import toTop from "./components/toTop.js";

createNav();

document.querySelector("#totop").addEventListener("click", toTop);

const getFeatured = async () => {
  const url = BASE_URL + "products";

  try {
    const response = await fetch(url);
    const products = await response.json();

    renderFeatured(products);

    const buttons = document.querySelectorAll(".cart__btn");

    buttons.forEach(function (button) {
      button.addEventListener("click", addToCart);
    });
  } catch (error) {
    displayMessage("error", messages.noResults, ".featured__container");
  }
};
getFeatured();

const bannerContainer = document.querySelector(".banner__item");

const bannerImg = async () => {
  const url = BASE_URL;

  try {
    const response = await fetch(url);
    const result = await response.json();
    //const imageUrl = "https://under-my-umbrella.herokuapp.com";

    bannerContainer.innerHTML = `
    <img class="banner__img" src="${result.hero_banner.url}" alt="${result.hero_banner.alternativeText}">`;
  } catch (error) {
    displayMessage("error", messages.noBannerImg, ".banner__item");
  }
};
bannerImg();
