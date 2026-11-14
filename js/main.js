const cuprins = document.querySelector("#cuprins");
const openers = document.querySelectorAll("[data-open-cuprins]");
const closers = document.querySelectorAll("[data-close-cuprins]");
const closeButton = cuprins.querySelector(".cuprins-close");

function setExpanded(open) {
  openers.forEach((button) => button.setAttribute("aria-expanded", String(open)));
}

function openCuprins() {
  cuprins.hidden = false;
  document.body.classList.add("cuprins-open");
  setExpanded(true);
  closeButton.focus();
}

function closeCuprins() {
  cuprins.hidden = true;
  document.body.classList.remove("cuprins-open");
  setExpanded(false);
}

openers.forEach((button) => {
  button.addEventListener("click", openCuprins);
});

closers.forEach((button) => {
  button.addEventListener("click", closeCuprins);
});

cuprins.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeCuprins);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cuprins.hidden) closeCuprins();
});
