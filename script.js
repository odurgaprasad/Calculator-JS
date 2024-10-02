"use strict";

const inputEle = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const specialKeys = ["+", "-", "*", "/"]; // Define special keys to monitor
let arr = Array.from(buttons);
let string = "";
let lastExpression = ""; // Variable to store the previous valid expression
let resultShown = false; // Flag to check if the result is shown

// Event listener for each button
arr.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const clickedValue = e.target.innerHTML;

    if (clickedValue === "=") {
      // Evaluate the expression and show the result
      try {
        lastExpression = string; // Store the current expression before evaluating
        string = eval(string).toString();
        inputEle.value = string;
        resultShown = true; // Set flag to true, result is now shown
      } catch {
        inputEle.value = "Error";
      }
    } else if (clickedValue === "C") {
      // Clear everything
      string = "";
      inputEle.value = string;
      resultShown = false; // Reset the flag
    } else if (clickedValue === "Del") {
      // Handle Del functionality after result is shown
      if (resultShown) {
        string = lastExpression; // Revert to the last valid expression
        resultShown = false; // Reset the flag
      }
      string = string.substring(0, string.length - 1); // Remove last character
      inputEle.value = string;
    } else {
      // Prevent appending multiple consecutive special keys
      if (
        specialKeys.includes(clickedValue) &&
        specialKeys.includes(string[string.length - 1])
      ) {
        return; // Don't append if the last character is a special key
      } else {
        // If result was shown, start a new expression
        if (resultShown) {
          string = ""; // Clear the string to start new input
          resultShown = false;
        }
        string += clickedValue;
        inputEle.value = string;
      }
    }
  });
});
