import { updateCart } from "./components/addToCart.js";
import createNav from "./components/createNav.js";
import toTop from "./components/toTop.js";

document.querySelector("#totop").addEventListener("click", toTop);

createNav();
updateCart(null, true);
