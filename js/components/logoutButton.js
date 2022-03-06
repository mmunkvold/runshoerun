import { clearLogoutFromStorage } from "../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector("#logout__btn");

  if (button) {
    button.onclick = function () {
      const doLogout = confirm("Are you sure you want to log out?");

      if (doLogout) {
        clearLogoutFromStorage();
        location.href = "/";
      }
    };
  }
}
