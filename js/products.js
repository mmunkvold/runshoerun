import { BASE_URL } from "./constants/url.js";
import renderProducts from "./components/renderProducts.js";
import searchProducts from "./components/searchProducts.js";
import displayMessage from "./common/displayMessage.js";
import { messages } from "./constants/messages.js";
import createNav from "./components/createNav.js";
import toTop from "./components/toTop.js";

document.querySelector("#totop").addEventListener("click", toTop);

createNav();

const getProducts = async () => {
  const url = BASE_URL + "products";

  try {
    const response = await fetch(url);
    const products = await response.json();

    renderProducts(products);
    searchProducts(products, ".search-container");
  } catch (error) {
    displayMessage("error", messages.noResults, ".product-container");
  }
};
getProducts();
