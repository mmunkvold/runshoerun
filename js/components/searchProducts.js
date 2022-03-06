import renderProducts from "./renderProducts.js";

export default function searchProducts(products, targetElement) {
  const search = document.querySelector(".search");
  const element = document.querySelector(targetElement);

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim();

    const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchValue));

    renderProducts(filteredProducts);
  };
}
