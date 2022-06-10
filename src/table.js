function createElement(tagName, options, ...children) {
  var element = document.createElement(tagName);
  if (options) {
    Object.entries(options).forEach((option) => {
      switch (option[0]) {
        case "innerText":
          element.innerText = option[1];
          break;
        case "innerHtml":
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

function createTable(title, headers, data, verticalHeader) {
  var table = createElement("table");

  if (title != "") {
  }

  if (verticalHeader) {
  } else {
  }
}
/*
a = createElement(
  "p",
  { id: 2 },
  createElement("span"),
  createElement("span"),
  createElement("span"),
  createElement("span")
);
var tableDataConv = createElement(
  "table",
  [
    createElement("thead", [
      createElement("tr", [
        createElement("th", null, {
          class: "table-info",
          colspan: 3,
          innerText: "Datos de la Convocatoria",
        }),
      ]),
      createElement("tr", [
        createElement("th", null, {
          innerText: "Tipo",
        }),
        createElement("th", null, {
          innerText: "Número/Año",
        }),
        createElement("th", null, {
          innerText: "Asunto",
        }),
      ]),
    ]),
    createElement("tbody", [
      createElement("tr", [
        createElement("td", null, {
          innerText: conv.getAttribute("expediente_tipo_documentacion"),
        }),
        createElement("td", null, {
          innerText:
            conv.getAttribute("expediente_numero") +
            "/" +
            conv.getAttribute("expediente_ejercicio"),
        }),
        createElement("td", null, {
          innerText: conv.getAttribute("asunto_convocatoria"),
        }),
      ]),
    ]),
  ],
  { class: "table table-bordered align-middle mx-auto w-75" }
);
*/
