var xhttp = new XMLHttpRequest();
var offCanvas = new bootstrap.Offcanvas(document.querySelector(".offcanvas"));

const CONTAINER_TABLE_QUERY = "main";

//Load
xhttp.onloadstart = (e) => {
  //console.log("xhttp.onloadstart", e);
  document.getElementById("send").setAttribute("disabled", "");
  document
    .getElementById("loading-button-icon")
    .classList.add("d-inline-block");
  document.getElementById("loading-button-icon").classList.remove("d-none");

  document.querySelector(CONTAINER_TABLE_QUERY).innerHTML = "";
};

xhttp.onprogress = (e) => {
  //console.log("xhttp.onprogress", e);

  if (window.navigator.onLine) {
    if (document.getElementById("progress").classList.contains("bg-danger")) {
      document.getElementById("progress").classList.remove("bg-danger");
    }
    document.getElementById("progress").style.width = `${Math.round(
      (100 * e.loaded) / e.total
    )}%`;
    document.getElementById("progress").innerText = `${Math.round(
      (100 * e.loaded) / e.total
    )}%`;
  } else {
    if (!document.getElementById("progress").classList.contains("bg-danger")) {
      document.getElementById("progress").classList.add("bg-danger");
    }
    document.getElementById("progress").style.width = "100%";
    document.getElementById("progress").innerText =
      "Se Perdio la Conección con el internet";
  }
};

xhttp.onload = (e) => {
  //console.log("xhttp.onload", e)
};
xhttp.onloadend = (e) => {
  //console.log("xhttp.onloadend", e);
  document.getElementById("send").removeAttribute("disabled");
  document
    .getElementById("loading-button-icon")
    .classList.remove("d-inline-block");
  document.getElementById("loading-button-icon").classList.add("d-none");
};

//ERROR

xhttp.onerror = (e) => {
  console.log(xhttp.readyState, xhttp.status);
  if (!window.navigator.onLine) {
    document.getElementById("progress").style.width = "100%";
    document.getElementById("progress").innerText =
      "Se Perdio la Conección con el internet";
    document.getElementById("progress").classList.add("bg-danger");
  }
};
xhttp.onabort = (e) => {
  //console.log("xhttp.onabort", e);
  document.getElementById("progress").setAttribute("aria-valuemax", e.total);
  document.getElementById("progress").setAttribute("aria-valuenow", e.loaded);
  document.getElementById("progress").style.width = "100%";
  document.getElementById("progress").innerText = "Error";
};

//WINDOW ON LOAD
window.onload = () => {
  document.getElementById("send").addEventListener("click", () => {
    offCanvas.show();
    xhttp.open("GET", "./ficha_convocatorias.xml");
    xhttp.send();
  });

  document.getElementById("abort").addEventListener("click", () => {
    xhttp.abort();
  });
};

xhttp.onreadystatechange = (e) => {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    document.querySelector(CONTAINER_TABLE_QUERY).append(tableFromXML(xhttp));
    offCanvas.hide();
  }
};

function tableFromXML(xhttp) {
  var xdoc = xhttp.responseXML;

  var convocatoria = xdoc.getElementsByTagName("convocatoria")[0];
  var pliego = convocatoria.getElementsByTagName("pliegos")[0].children[0];
  var condicionesPliego = [...pliego.children[0].children];
  var articulosLicitados = [
    ...xdoc.getElementsByTagName("get_items_solicitados")[0].children,
  ];

  //Primera Tabla

  //Datos de la Convocatoria
  var expedienteTipoDocumentacion = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Tipo",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: convocatoria.getAttribute("expediente_tipo_documentacion"),
        },
      },
    ],
  };
  var expedienteNumeroExpedienteEjercicio = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Número/Año",
        },
      },
      {
        tagName: "td",
        options: {
          innerText:
            convocatoria.getAttribute("expediente_numero") +
            "/" +
            convocatoria.getAttribute("expediente_ejercicio"),
        },
      },
    ],
  };
  var asuntoConvocatoria = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Asunto",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: convocatoria.getAttribute("asunto_convocatoria"),
        },
      },
    ],
  };

  //Datos del Pliego
  var retiroPliegoDireccion = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Dirección",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: pliego.getAttribute("retiro_pliego_direccion"),
        },
      },
    ],
  };
  var retiroPliegoPlazoHorario = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Plazo Horario",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: pliego.getAttribute("retiro_pliego_plazo_horario"),
        },
      },
    ],
  };
  var actoAperturaDireccion = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Dirección Acto Apertura",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: pliego.getAttribute("acto_apertura_direccion"),
        },
      },
    ],
  };
  var actoAperturaFechaInicio = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Fecha Apertura",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: pliego.getAttribute("acto_apertura_fecha_inicio"),
        },
      },
    ],
  };
  var actoAperturaHorarioInicio = {
    tagName: "tr",
    options: {
      class: "align-middle",
    },
    children: [
      {
        tagName: "th",
        options: {
          class: "bg-1-2-3-4 text-center",
          innerText: "Horario Inicio",
        },
      },
      {
        tagName: "td",
        options: {
          innerText: pliego.getAttribute("acto_apertura_horario_inicio"),
        },
      },
    ],
  };

  //Condiciones Del Pliego

  condicionesPliego = condicionesPliego
    .sort(
      (primerItem, segundoItem) =>
        +(
          primerItem.getAttribute("numero") -
          +segundoItem.getAttribute("numero")
        )
    )
    .map((condicion) => {
      return {
        tagName: "tr",
        children: [
          {
            tagName: "th",
            options: {
              class: "text-center bg-1-2-3-4 position-relative",
            },
            children: [
              {
                tagName: "span",
                options: {
                  class: "sticky-top pb-4 pt-4",
                  innerText:
                    condicion.getAttribute("numero") +
                    " - " +
                    condicion.getAttribute("titulo"),
                },
              },
            ],
          },
          {
            tagName: "td",
            options: {
              innerHTML: condicion.getAttribute("descripcion"),
            },
          },
        ],
      };
    });

  articulosLicitados = articulosLicitados.map((articulos) => {
    return {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          options: {
            innerHTML: articulos.getAttribute("area_destinataria"),
          },
        },
        {
          tagName: "td",
          options: {
            innerHTML: articulos.getAttribute("cantidad"),
          },
        },
        {
          tagName: "td",
          options: {
            innerHTML: articulos.getAttribute("precio_estimado"),
          },
        },
        {
          tagName: "td",
          options: {
            innerHTML: articulos.getAttribute("descripcion"),
          },
        },
      ],
    };
  });

  var rowTableCondicionesPliego = {
    tagName: "tr",
    children: [
      {
        tagName: "th",
        options: {
          class: "text-center bg-1-2-3 position-relative",
        },
        children: [
          {
            tagName: "span",
            options: {
              class: "sticky-top pb-4 pt-4",
              innerText: "Condiciones del Pliego",
            },
          },
        ],
      },
      {
        tagName: "td",
        options: { class: "p-0 m-0" },
        children: [
          {
            tagName: "table",
            options: {
              class: "table table-bordered p-0 m-0",
            },
            children: [
              {
                tagName: "tbody",
                children: condicionesPliego,
              },
            ],
          },
        ],
      },
    ],
  };

  var rowTableDataPliego = {
    tagName: "tr",
    children: [
      {
        tagName: "th",
        options: {
          class: "text-center bg-1-2 position-relative",
        },
        children: [
          {
            tagName: "span",
            options: {
              class: "sticky-top pb-4 pt-4",
              innerText: "Datos del Pliego",
            },
          },
        ],
      },
      {
        tagName: "td",
        options: { class: "p-0 m-0" },
        children: [
          {
            tagName: "table",
            options: {
              class: "table table-bordered p-0 m-0",
            },
            children: [
              {
                tagName: "tbody",
                children: [
                  retiroPliegoDireccion,
                  retiroPliegoPlazoHorario,
                  actoAperturaDireccion,
                  actoAperturaFechaInicio,
                  actoAperturaHorarioInicio,
                  rowTableCondicionesPliego,
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  var rowTableArticulosListados = {
    tagName: "tr",
    children: [
      {
        tagName: "th",
        options: {
          class: "text-center bg-1-2 position-relative",
        },
        children: [
          {
            tagName: "span",
            options: {
              class: "sticky-top pb-4 pt-4",
              innerText: "Artículos Solicitados",
            },
          },
        ],
      },
      {
        tagName: "td",
        options: { class: "p-0 m-0" },
        children: [
          {
            tagName: "table",
            options: {
              class: "table table-bordered p-0 m-0 position-relative",
            },
            children: [
              {
                tagName: "thead",
                options: {
                  class: "sticky-top pb-4 pt-4",
                },
                children: [
                  {
                    tagName: "tr",
                    options: {
                      class: "bg-1-2-3",
                    },
                    children: [
                      {
                        tagName: "th",
                        options: { innerText: "Área destinada" },
                      },
                      { tagName: "th", options: { innerText: "Cantidad" } },
                      {
                        tagName: "th",
                        options: { innerText: "Precio Estimado" },
                      },
                      {
                        tagName: "th",
                        options: { innerText: "Descripción" },
                      },
                    ],
                  },
                ],
              },
              {
                tagName: "tbody",
                children: articulosLicitados,
              },
            ],
          },
        ],
      },
    ],
  };

  return createElementRecusive({
    tagName: "table",
    options: {
      class: "table table-bordered",
    },
    children: [
      {
        tagName: "thead",
        children: [
          {
            tagName: "tr",
            children: [
              {
                tagName: "th",
                options: {
                  class: "bg-1",
                  colspan: "3",
                  innerText: "Datos de la Convocatoria",
                },
              },
            ],
          },
        ],
      },
      {
        tagName: "tbody",
        children: [
          expedienteTipoDocumentacion,
          expedienteNumeroExpedienteEjercicio,
          asuntoConvocatoria,
          rowTableDataPliego,
          rowTableArticulosListados,
        ],
      },
    ],
  });
}
