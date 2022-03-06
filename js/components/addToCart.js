import { saveToStorage, getFromStorage } from "../utils/storage.js";

const cartItemsContainer = document.querySelector(".cart__list");
const subTotalContainer = document.querySelector(".cart__total");
const totalItemsContainer = document.querySelector(".total__items");
const cartQty = document.querySelector(".cart__qty");

let cart = JSON.parse(localStorage.getItem("cartList")) || [];
//let cart = getFromStorage("cartList");
updateCart();

export function addToCart(e) {
  const { id, title, price, image } = e.target.dataset;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty += 1;

      updateCart();
      renderCartItems();
      return;
    }
  }

  const newProduct = { id, title, price, image, qty: 1 };

  cart.push(newProduct);
  //localStorage.setItem("cartList", JSON.stringify(cart));
  saveToStorage("cartList", cart);

  renderCartItems();
}

function getQty() {
  let qty = 0;

  for (let i = 0; i < cart.length; i++) {
    qty += cart[i].qty;
  }
  return qty;
}

export function updateCart() {
  renderCartItems();
  renderSubtotal();
  //localStorage.setItem("cartList", JSON.stringify(cart)); //set function save here?
  saveToStorage("cartList", cart);
}

function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.qty;
    totalItems += item.qty;
  });

  subTotalContainer.innerHTML = `<div class="total">Total (${totalItems} items): Kr ${totalPrice.toFixed(2)}</div>`;
  totalItemsContainer.innerHTML = totalItems;
}

export function renderCartItems() {
  const qty = getQty();
  cartItemsContainer.innerHTML = "";
  cartQty.innerHTML = `<p class="bold">You have ${qty} items in your cart</p>`;

  cart.forEach((cartElement) => {
    let { id, title, price, image, qty } = cartElement;

    price = parseFloat(price).toFixed(2);

    cartItemsContainer.innerHTML += `
    <div class="cart__item">
      <a href="detail.html?id=${id}">
        <div class="cart__img" style='background-image: url("${image}")'></div>
        <h2 class="top-txt">${title}</h2>
        <div class="center"><small>Kr ${price}</small></div>
      </a>
      <span>
        <button class="add__one" data-id="${id}">+</button>
        <div class="number">${qty}</div>
        <button class="remove__one" data-id="${id}">-</button>
      </span>
      <span>Kr ${(qty * price).toFixed(2)}</span>
      <span>
        <button class="remove" data-id="${id}">X</button>
      </span>
    </div>`;
  });
  renderSubtotal();
}

cartItemsContainer.onclick = function (e) {
  const id = e.target.dataset.id;

  if (e.target && e.target.classList.contains("remove")) {
    removeItem(id);
  } else if (e.target && e.target.classList.contains("add__one")) {
    addToCart(e);
  } else if (e.target && e.target.classList.contains("remove__one")) {
    removeItem(id, 1);
  }
};

function removeItem(id, qty = 0) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      if (qty > 0) {
        cart[i].qty -= qty;
      }

      if (cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1);
      }
      updateCart();
      return;
    }
  }
}
