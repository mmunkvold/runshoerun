const loadingBar = document.querySelector(".loading__bar");

function loading(perc = 0) {
  loadingBar.value = perc;

  if (perc < 100) requestAnimationFrame(() => load(perc + 0.5));
  else setTimeout(load, 100);
}
loading();
