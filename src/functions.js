function cleanProgressBar(progressBar, classListString) {
  progressBar.style.width = "0%";
  progressBar.innerText = "";
  progressBar.classList = classListString;
}

function progressBarValues(progressBar, width, text, ...classLists) {
  progressBar.style.width = width + "%";
  progressBar.innerText = text;

  classLists.forEach((cssClass) => progressBar.classList.toggle(cssClass));
}

function showElement(element, displayValue) {
  element.style.display = displayValue ? "inline-block" : "none";
}

function elementDisableAttributeValue(element, value) {
  if (value) {
    element.setAttribute("disabled", "");
  } else {
    element.removeAttribute("disabled", "");
  }
}

function jsonToElement({ tagName, options, children }) {
  var element = document.createElement(tagName);
  if (options) {
    Object.entries(options).forEach((option) => {
      switch (option[0]) {
        case "innerText":
          element.innerText = option[1];
          break;
        case "innerHTML":
          element.innerHTML = option[1];
          break;
        default:
          element.setAttribute(option[0], option[1]);
          break;
      }
    });
  }
  if (children) {
    children.forEach((child) => {
      element.append(jsonToElement(child));
    });
  }
  return element;
}
