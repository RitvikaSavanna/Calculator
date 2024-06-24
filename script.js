localStorage.getItem("theme");

// set theme on button press
localStorage.setItem("theme", newTheme);

const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
// or
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
{
  matches: true;
  media : "(prefers-color-scheme: dark)";
  onchange: null;
}

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}
const button = document.querySelector("[data-theme-toggle]");

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  // update the button text
  const newCta = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
  button.innerText = newCta;  

  // use an aria-label if you are omitting text on the button
  // and using sun/moon icons, for example
  button.setAttribute("aria-label", newCta);

  // update theme attribute on HTML to switch theme in CSS
  document.querySelector("html").setAttribute("data-theme", newTheme);

  // update in local storage
  localStorage.setItem("theme", newTheme);

  // update the currentThemeSetting in memory
  currentThemeSetting = newTheme;
});

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    output = eval(output.replace("%", "/100"))
  } else if (btnValue === "AC") {
    display.innerText = ""
  } else if (btnValue === "DEL") {
    display.innerText = display.innerText.slice(0,-1)
  } else {
  if (output === " " && specialChars.includes(btnValue)) return
    output += btnValue
  };
  display.value = output;
};

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});