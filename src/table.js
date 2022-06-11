function createElement(tagName, options, ...children) {
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
      element.append(child);
    });
  }
  return element;
}

function createElementRecusive({ tagName, options, children }) {
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
      element.append(createElementRecusive(child));
    });
  }
  return element;
}
