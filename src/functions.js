function cleanProgressBar(progressBarQuery, classListString) {
  var progressBar = document.getElementById(progressBarQuery);
  progressBar.style.width = "0%";
  progressBar.innerText = "";
  progressBar.classList = classListString;
}

function progressBarValues(progressBarQuery, width, text, ...classLists) {
  var progressBar = document.getElementById(progressBarQuery);
  progressBar.style.width = width + "%";
  progressBar.innerText = text;

  classLists.forEach((cssClass) => progressBar.classList.toggle(cssClass));
}

function showElement(element,display) {
  if (display) {
    element.styles.display = display ? "initial" :  
  } else {
    document
      .getElementById("loading-button-icon")
      .classList.remove("d-inline-block");
    document.getElementById("loading-button-icon").classList.add("d-none");
  }
}

function buttonDisableAttributeValue(buttonElement, disable) {
  if (disable) {
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.removeAttribute("disabled", "");
  }
}

function hideOffsetTimeOut() {
  setTimeout(() => {
    offCanvas.hide();
    buttonDisableAttributeValue("send", false);
  }, 2000);
}
