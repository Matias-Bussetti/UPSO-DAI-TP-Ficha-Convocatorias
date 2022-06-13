window.onload = () => {
  const BUTTON_REQUEST_ID = "request";
  const BUTTON_ABORT_ID = "abort";

  const LOADING_ICON_ID = "loading-button-icon";

  const CONTAINER_TABLE_QUERY = "main";

  const PROGRESS_BAR_ID = "progress";
  const PROGRESS_BAR_CLEAN_CLASSLIST =
    "progress-bar progress-bar-striped progress-bar-animated";

  //Datos de la Convocatoria tbody
  const CONTAINER_DATA_CONVOCATORIA = "datos-convocatoria";
  //Datos del Pliego tbody
  const CONTAINER_DATA_PLIEGO = "datos-pliego";
  //Condiciones del Pliego tbody
  const CONTAINER_DATA_CONDICIONES_PLIEGO = "datos-condiciones";
  //Articulos Solicitados tbody
  const CONTAINER_DATA_ARTICULOS_SOLICITADOS = "articulos-solicitados";

  var xhttp = new XMLHttpRequest();
  var offCanvas = new bootstrap.Offcanvas(document.querySelector(".offcanvas"));

  var buttonRequest = document.getElementById(BUTTON_REQUEST_ID);
  var buttonAbort = document.getElementById(BUTTON_ABORT_ID);
  var loadingIconElement = document.getElementById(LOADING_ICON_ID);
  var progressBarElement = document.getElementById(PROGRESS_BAR_ID);

  var containerDataConvocatoria = document.getElementById(
    CONTAINER_DATA_CONVOCATORIA
  );
  var containerDataPliego = document.getElementById(CONTAINER_DATA_PLIEGO);
  var containerDataCondicionesPliego = document.getElementById(
    CONTAINER_DATA_CONDICIONES_PLIEGO
  );
  var containerDataArticulosSolicitados = document.getElementById(
    CONTAINER_DATA_ARTICULOS_SOLICITADOS
  );

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
    //document.querySelector(CONTAINER_TABLE_QUERY).innerHTML = "";
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
    console.log(xdoc);

    var convocatoria = xdoc.getElementsByTagName("convocatoria")[0];
    var pliego = convocatoria.getElementsByTagName("pliegos")[0].children[0];
    var condicionesPliego = [...pliego.children[0].children];
    var articulosLicitados = [
      ...xdoc.getElementsByTagName("get_items_solicitados")[0].children,
    ];

    //Ordenamos las Condiciones del Pliego
    condicionesPliego = condicionesPliego.sort(
      (primerItem, segundoItem) =>
        +(
          primerItem.getAttribute("numero") -
          +segundoItem.getAttribute("numero")
        )
    );

    function dataToTrObject(isText, ...tableData) {
      var tdObjectChildrens = tableData.map((data) => {
        let tdObject;
        if (isText) {
          tdObject = {
            tagName: "td",
            options: {
              innerText: data,
            },
          };
        } else {
          tdObject = {
            tagName: "td",
            options: {
              innerHTML: data,
            },
          };
        }
        return tdObject;
      });
      return {
        tagName: "tr",
        children: tdObjectChildrens,
      };
    }
    console.log(
      convocatoria.getAttribute("expediente_tipo_documentacion"),
      convocatoria.getAttribute("expediente_numero") +
        "/" +
        convocatoria.getAttribute("expediente_ejercicio"),
      convocatoria.getAttribute("asunto_convocatoria")
    );

    containerDataConvocatoria.append(
      objectToElement(
        dataToTrObject(
          true,
          convocatoria.getAttribute("expediente_tipo_documentacion"),
          convocatoria.getAttribute("expediente_numero") +
            "/" +
            convocatoria.getAttribute("expediente_ejercicio"),
          convocatoria.getAttribute("asunto_convocatoria")
        )
      )
    );

    containerDataPliego.append(
      objectToElement(
        dataToTrObject(
          true,
          pliego.getAttribute("retiro_pliego_direccion"),
          pliego.getAttribute("retiro_pliego_plazo_horario"),
          pliego.getAttribute("acto_apertura_direccion"),
          pliego.getAttribute("acto_apertura_fecha_inicio"),
          pliego.getAttribute("acto_apertura_horario_inicio")
        )
      )
    );

    condicionesPliego.forEach((condicion) => {
      containerDataCondicionesPliego.append(
        objectToElement(
          dataToTrObject(
            false,
            condicion.getAttribute("numero"),
            condicion.getAttribute("titulo"),
            condicion.getAttribute("descripcion")
          )
        )
      );
    });

    articulosLicitados.forEach((articulo) => {
      containerDataArticulosSolicitados.append(
        objectToElement(
          dataToTrObject(
            true,
            articulo.getAttribute("descripcion"),
            articulo.getAttribute("cantidad"),
            articulo.getAttribute("precio_estimado"),
            articulo.getAttribute("importado"),
            articulo.getAttribute("area_destinataria")
          )
        )
      );
    });
    //Primera Tabla
  }
};
