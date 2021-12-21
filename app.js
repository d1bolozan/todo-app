// Save previous theme in LocalStorage
let darkMode = localStorage.getItem("darkMode");
const themeBtn = document.getElementById("themeBtn");

console.log(darkMode);
// check if dark mode is enable
// if it's enabled, turn it off
// if it's disabled, turn it on

const enableDarkMode = () => {
  // add the class darkmode to the body
  document.body.classList.add("darkmode");
  if (themeBtn.classList.contains("icon-moon")) {
    themeBtn.classList.remove("icon-moon");
    themeBtn.classList.add("icon-sun");
  }
  // update darkMode in the localStorage
  localStorage.setItem("darkMode", "enabled");
};

if (darkMode === "enabled") {
    enableDarkMode();
  }
const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  if (themeBtn.classList.contains("icon-sun")) {
    themeBtn.classList.remove("icon-sun");
    themeBtn.classList.add("icon-moon");
  }
  localStorage.setItem("darkMode", null);
};

themeBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
