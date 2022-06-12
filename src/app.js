window.onload = () => {
  const BUTTON_REQUEST_ID = "request";
  const BUTTON_ABORT_ID = "abort";

  const LOADING_ICON_ID = "loading-button-icon";

  const CONTAINER_TABLE_QUERY = "main";

  const PROGRESS_BAR_ID = "progress";
  const PROGRESS_BAR_CLEAN_CLASSLIST =
    "progress-bar progress-bar-striped progress-bar-animated";

  var xhttp = new XMLHttpRequest();
  var offCanvas = new bootstrap.Offcanvas(document.querySelector(".offcanvas"));

  var buttonRequest = document.getElementById(BUTTON_REQUEST_ID);
  var buttonAbort = document.getElementById(BUTTON_ABORT_ID);
  var loadingIconElement = document.getElementById(LOADING_ICON_ID);
  var progressBarElement = document.getElementById(PROGRESS_BAR_ID);

  buttonRequest.addEventListener("click", () => {
    offCanvas.show();
    xhttp.open("GET", "./ficha_convocatorias.xml");
    xhttp.send();
  });

  buttonAbort.addEventListener("click", () => {
    xhttp.abort();
  });

  function hideOffsetTimeOut() {
    setTimeout(() => {
      offCanvas.hide();
      elementDisableAttributeValue(buttonRequest, false);
    }, 2000);
  }

  xhttp.onreadystatechange = (e) => {
    if (xhttp.readyState == 4) {
      switch (xhttp.status) {
        case 200:
          progressBarValues(
            progressBarElement,
            100,
            "Descarga Completa",
            "bg-success"
          );

          elementDisableAttributeValue(buttonAbort, true);

          document
            .querySelector(CONTAINER_TABLE_QUERY)
            .append(tableFromXML(xhttp));
          hideOffsetTimeOut();
          break;

        case 404:
          progressBarValues(
            progressBarElement,
            100,
            "No se encuentra el recurso (404)",
            "bg-danger"
          );
          hideOffsetTimeOut();
          break;

        case 500:
          progressBarValues(
            progressBarElement,
            100,
            "Error en el Servidor (500)",
            "bg-danger"
          );
          hideOffsetTimeOut();
          break;

        default:
          break;
      }
    }
  };

  //Load
  xhttp.onloadstart = (e) => {
    document.querySelector(CONTAINER_TABLE_QUERY).innerHTML = "";
    showElement(loadingIconElement, true);
    elementDisableAttributeValue(buttonRequest, true);
    elementDisableAttributeValue(buttonAbort, false);
    cleanProgressBar(progressBarElement, PROGRESS_BAR_CLEAN_CLASSLIST);
  };

  xhttp.onprogress = (e) => {
    var percentageLoad = Math.round((100 * e.loaded) / e.total);
    progressBarValues(progressBarElement, percentageLoad, percentageLoad + "%");
  };

  xhttp.onloadend = (e) => {
    showElement(loadingIconElement, false);
  };

  xhttp.onabort = () => {
    progressBarValues(
      progressBarElement,
      100,
      "Descarga Cancelada",
      "bg-warning",
      "text-dark"
    );
    hideOffsetTimeOut();
  };

  xhttp.onerror = () => {
    elementDisableAttributeValue(buttonAbort, true);
    if (!window.navigator.onLine) {
      progressBarValues(
        progressBarElement,
        100,
        "Se perdio la Conexión",
        "bg-danger"
      );
    } else {
      progressBarValues(
        progressBarElement,
        100,
        "Ocurrio un Error...",
        "bg-danger"
      );
    }
    hideOffsetTimeOut();
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

    function tdAttributeRow(attributeHeader, attributeValue) {
      return {
        tagName: "tr",
        options: {
          class: "align-middle",
        },
        children: [
          {
            tagName: "th",
            options: {
              class: "bg-1-2-3-4 text-center",
              innerText: attributeHeader,
            },
          },
          {
            tagName: "td",
            options: {
              innerText: attributeValue,
            },
          },
        ],
      };
    }

    //Datos de la Convocatoria
    var expedienteTipoDocumentacion = tdAttributeRow(
      "Tipo",
      convocatoria.getAttribute("expediente_tipo_documentacion")
    );
    var expedienteNumeroExpedienteEjercicio = tdAttributeRow(
      "Número/Año",
      convocatoria.getAttribute("expediente_numero") +
        "/" +
        convocatoria.getAttribute("expediente_ejercicio")
    );
    var asuntoConvocatoria = tdAttributeRow(
      "Asunto",
      convocatoria.getAttribute("asunto_convocatoria")
    );

    //Datos del Pliego
    var retiroPliegoDireccion = tdAttributeRow(
      "Dirección",
      pliego.getAttribute("retiro_pliego_direccion")
    );
    var retiroPliegoPlazoHorario = tdAttributeRow(
      "Plazo Horario",
      pliego.getAttribute("retiro_pliego_plazo_horario")
    );
    var actoAperturaDireccion = tdAttributeRow(
      "Dirección Acto Apertura",
      pliego.getAttribute("acto_apertura_direccion")
    );
    var actoAperturaFechaInicio = tdAttributeRow(
      "Fecha Apertura",
      pliego.getAttribute("acto_apertura_fecha_inicio")
    );
    var actoAperturaHorarioInicio = tdAttributeRow(
      "Horario Inicio",
      pliego.getAttribute("acto_apertura_horario_inicio")
    );

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

    //Acticulos Solicitados
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

    return jsonToElement({
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
};
