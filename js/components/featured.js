export default function renderFeatured(products) {
  const featuredContainer = document.querySelector(".featured__container");
  featuredContainer.innerHTML = "";

  products.forEach((product) => {
    //const imageUrl = "https://under-my-umbrella.herokuapp.com";
    const imageUrl = "http://localhost:1337";
    const { id, title, price, image } = product;

    if (product.featured) {
      featuredContainer.innerHTML += `
     <div class="product">
        <a class="featured__link" href="detail.html?id=${id}">
          <div style='background-image: url("${imageUrl}${image.url}")' class="featured__img"></div>
          <div class="featured__txt">
          <h2>${title}</h2></div>
        </a>
        <div class="center--btn">
          <button class="cart__btn" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${imageUrl}${image.url}"><i class="icon bi bi-basket2"></i>${price}
          </button>
        </div>
      </div>`;
    }
  });
}
