import { BASE_URL } from "../constants/url.js";
import { getToken } from "../utils/storage.js";

export default function deleteButton(id) {
  const container = document.querySelector(".delete-container");
  container.innerHTML = `<button type="button" class="delete-btn">Delete product</button>`;

  const button = document.querySelector("button.delete-btn");

  button.onclick = async function () {
    const doDelete = confirm("Are you sure you want to delete this product?");

    if (doDelete) {
      const url = BASE_URL + "products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "/";

        console.log(json);
      } catch (error) {}
    }
  };
}
