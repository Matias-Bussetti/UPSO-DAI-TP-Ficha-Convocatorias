window.onload = () => {
  const CONTAINER_TABLE_QUERY = "main";
  const PROGRESS_BAR = "progress";
  const PROGRESS_BAR_CLEAN_CLASSLIST =
    "progress-bar progress-bar-striped progress-bar-animated";

  const BUTTON_REQUEST_QUERY = "request";
  const BUTTON_ABORT_QUERY = "abort";

  var xhttp = new XMLHttpRequest();
  var offCanvas = new bootstrap.Offcanvas(document.querySelector(".offcanvas"));

  //Load
  xhttp.onloadstart = (e) => {
    document.querySelector(CONTAINER_TABLE_QUERY).innerHTML = "";

    showOrHideLoadingIcon(true);
    buttonDisableAttributeValue("send", true);
    buttonDisableAttributeValue("abort", false);
    cleanProgressBar(PROGRESS_BAR, PROGRESS_BAR_CLEAN_CLASSLIST);
  };

  xhttp.onprogress = (e) => {
    var percentageLoad = Math.round((100 * e.loaded) / e.total);
    progressBarValues(PROGRESS_BAR, percentageLoad, percentageLoad + "%");
  };

  xhttp.onloadend = (e) => {
    showOrHideLoadingIcon(false);
  };

  xhttp.onabort = () => {
    progressBarValues(
      PROGRESS_BAR,
      100,
      "Descarga Cancelada",
      "bg-warning",
      "text-dark"
    );
    hideOffsetTimeOut();
  };

  //WINDOW ON LOAD
  document.getElementById("send").addEventListener("click", () => {
    offCanvas.show();
    xhttp.open("GET", "./ficha_convocatorias.xml");
    xhttp.send();
  });

  document.getElementById("abort").addEventListener("click", () => {
    xhttp.abort();
  });

  xhttp.onreadystatechange = (e) => {
    if (xhttp.readyState == 4) {
      switch (xhttp.status) {
        case 200:
          progressBarValues(
            PROGRESS_BAR,
            100,
            "Descarga Completa",
            "bg-success"
          );

          buttonDisableAttributeValue("abort", true);

          setTimeout(() => {
            offCanvas.hide();
            buttonDisableAttributeValue("send", false);
            document
              .querySelector(CONTAINER_TABLE_QUERY)
              .append(tableFromXML(xhttp));
          }, 1000);

          break;

        case 404:
          progressBarValues(
            PROGRESS_BAR,
            100,
            "No se encuentra el recurso (404)",
            "bg-danger"
          );
          hideOffsetTimeOut();
          break;

        case 500:
          progressBarValues(
            PROGRESS_BAR,
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
            innerText: convocatoria.getAttribute(
              "expediente_tipo_documentacion"
            ),
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
