import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createNav() {
  const { pathname } = document.location;
  const navContainer = document.querySelector(".nav__container");
  const username = getUsername();

  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }"><span><i class="login__icon bi bi-person-fill"></i></span><span>Log in</span></a>`;

  if (username) {
    authLink = `
    <div>
      <a href="add.html" class="nav__link ${pathname === "/add.html" ? "active" : ""}">Add Product</a> 
    </div>
    <div> 
      <a href="products.html" class="nav__link ${pathname === "/products.html" ? "active" : ""}">Edit Product</a>
    </div>
    <div>
      <button id="logout__btn" class="btn nav__link">Logout</button>
    </div>
    `;
  }

  navContainer.innerHTML = `    
    <div class="nav__top nav__top--login">
      ${authLink} 
    </div>`;

  logoutButton();
}
