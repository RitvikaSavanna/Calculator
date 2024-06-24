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