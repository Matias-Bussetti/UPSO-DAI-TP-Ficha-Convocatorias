//GITHUB https://github.com/Matias-Bussetti/UPSO-DAI-TP-Ficha-Convocatorias.github.io
//PAGINA https://matias-bussetti.github.io/UPSO-DAI-TP-Ficha-Convocatorias.github.io/

window.onload = () => {
  /**
   *
   * @typedef BUTTON_REQUEST_ID ID del Botón para solicitar del archivo XML
   * @typedef BUTTON_ABORT_ID ID del Botón para cancelar la descarga del archivo XML
   *
   * @typedef LOADING_ICON_ID ID del ícono que se mostrara cuando se esta descargando el archivo XML
   *
   * @typedef PROGRESS_BAR_ID ID de la Barra de Progreso para mostrar el progreso de la solicitud
   * @typedef PROGRESS_BAR_CLEAN_CLASSLIST Clases de la Barra de Progreso con la que esta se inicializa
   *
   * @typedef CONTAINER_DATA_CONVOCATORIA ID del TBody que contine la información de la Convocatoria
   * @typedef CONTAINER_DATA_PLIEGO ID del TBody que contine la información del Pliego
   * @typedef CONTAINER_DATA_CONDICIONES_PLIEGO ID del TBody que contine las Condiciones del Pliego
   * @typedef CONTAINER_DATA_ARTICULOS_SOLICITADOS ID del TBody que contine los articulos solicitados
   *
   * @typedef xhttp Instancia de XMLHttpRequest
   * @typedef offCanvas Esta Variable utiliza la api de Bootstrap para esconder el contenedor que tiene la barra de progreso
   *
   * @typedef buttonRequest Botón para solicitar del archivo XML
   * @typedef buttonAbort Botón para cancelar la descarga del archivo XML
   * @typedef loadingIconElement Ícono que se mostrara cuando se esta descargando el archivo XML
   * @typedef progressBarElement Barra de Progreso para mostrar el progreso de la solicitud
   *
   * @typedef containerDataConvocatoria TBody que contine la información de la Convocatoria
   * @typedef containerDataPliego TBody que contine la información del Pliego
   * @typedef containerDataCondicionesPliego TBody que contine las Condiciones del Pliego
   * @typedef containerDataArticulosSolicitados TBody que contine los articulos solicitados
   *
   */

  const BUTTON_REQUEST_ID = "request";
  const BUTTON_ABORT_ID = "abort";
  const LOADING_ICON_ID = "loading-button-icon";

  const PROGRESS_BAR_ID = "progress";
  const PROGRESS_BAR_CLEAN_CLASSLIST =
    "progress-bar progress-bar-striped progress-bar-animated";

  const CONTAINER_DATA_CONVOCATORIA = "datos-convocatoria";
  const CONTAINER_DATA_PLIEGO = "datos-pliego";
  const CONTAINER_DATA_CONDICIONES_PLIEGO = "datos-condiciones";
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

  //Cuando se hace click en el botón "Solicitar Convocatoria" se llama la solicitud
  buttonRequest.addEventListener("click", () => {
    xhttp.open("GET", "./ficha_convocatorias.xml");
    xhttp.send();
  });

  //Cuando se hace click en el botón "Cancelar" llama la solicitud
  buttonAbort.addEventListener("click", () => {
    xhttp.abort();
  });

  /**
   * Esta función tiene el objetivo de Esconder el contenedor de la barra de Progreso y habilitar el boton "Solicitar Convocatoria" luego de 2 segundos
   * elementDisableAttributeValue(element, false);// Elimina
   */
  function hideOffsetTimeOut() {
    setTimeout(() => {
      offCanvas.hide();
      elementDisableAttributeValue(buttonRequest, false);
    }, 2000);
  }

  xhttp.onreadystatechange = () => {
    //Si el estado de la petición tiene el estado = COMPLETED
    if (xhttp.readyState == 4) {
      //Si la Petición fue correcta
      if (200 <= xhttp.status && xhttp.status <= 299) {
        progressBarValues(
          progressBarElement,
          100,
          "Descarga Completa",
          "bg-success"
        );
        elementDisableAttributeValue(buttonAbort, true);

        tableFromXML(xhttp);
        hideOffsetTimeOut();
      }
      //Si hubo un error en el cliente
      if (400 <= xhttp.status && xhttp.status <= 499) {
        progressBarValues(
          progressBarElement,
          100,
          "Error en el Cliente, estado: " + xhttp.status,
          "bg-danger"
        );
        hideOffsetTimeOut();
      }
      //Si hubo un error en el servidor
      if (500 <= xhttp.status && xhttp.status <= 599) {
        progressBarValues(
          progressBarElement,
          100,
          "Error en el Servidor, estado: " + xhttp.status,
          "bg-danger"
        );
        hideOffsetTimeOut();
      }
    }
  };

  //Cuando se Inicie la descarga
  xhttp.onloadstart = () => {
    //Mostrar el contenedor de la barra de progreso
    offCanvas.show();
    //Se limpia la información existente
    clearTbodys();
    //Se muestra el ícono de carga en el boton "Solicitar Convocatoria"
    showElement(loadingIconElement, true);
    //Se deshabilita el boton "Solicitar Convocatoria"
    elementDisableAttributeValue(buttonRequest, true);
    //Se habilita el boton "Cancelar Descarga"
    elementDisableAttributeValue(buttonAbort, false);
    //La barra de progreso se limpia
    cleanProgressBar(progressBarElement, PROGRESS_BAR_CLEAN_CLASSLIST);
  };

  //Cuando la descarga de la petición este en progreso, se cambiara el valor de la barra de progreso mostrando en esta el porcentaje de la descarga
  xhttp.onprogress = (e) => {
    var percentageLoad = Math.round((100 * e.loaded) / e.total);
    progressBarValues(progressBarElement, percentageLoad, percentageLoad + "%");
  };

  //Cuando termine de cargar se escondera el ícono de carga
  xhttp.onloadend = () => {
    showElement(loadingIconElement, false);
  };

  //Cuando se cancele la petición, se mostrara un mensaje en la barra de progreso sobre la acción en cuestión, y luego se escondera el contenedor de este
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

  //Cuando exista un error, se comprobara que si se tiene conexión, si este no es asi se mostrara un mensaje más generico
  xhttp.onerror = () => {
    elementDisableAttributeValue(buttonAbort, true);
    progressBarValues(
      progressBarElement,
      100,
      window.navigator.onLine ? "Ocurrio un Error..." : "Se perdio la Conexión",
      "bg-danger"
    );
    hideOffsetTimeOut();
  };

  /**
   * Esta función tiene el unico objetivo de limpiar el contenido dentro de los tbodys que tienen la información de la convocatoria
   */
  function clearTbodys() {
    containerDataConvocatoria.innerHTML = "";
    containerDataPliego.innerHTML = "";
    containerDataCondicionesPliego.innerHTML = "";
    containerDataArticulosSolicitados.innerHTML = "";
  }

  /**
   *
   * Esta función sirve para crear un TR como objeto, este mismo servira para convertilo en un elemento (ver funcion {@link objectToElement} en el archivo functions.js )
   *
   * @param {boleen} isText Dependiendo de este parámetro, el contenido dentro del TD va a ser innerText (true) o innerHTML (false)
   * @param {...string} tableData Por cada parámetro siguientes del primero, se creara un objeto para crear un elemento TD ()
   *
   * @return Se retornara un objeto para crear un elemento TR
   */
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

  /**
   * Esta es una función para crear un elemento TR con los datos del xml usando la función {@link dataToTrObject} y {@link objectToElement}
   * - En este caso son los datos de la convocatoria
   */
  function TableRowFromConvocatoria(convocatoria) {
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
  }
  /**
   * Esta es una función para crear un elemento TR con los datos del xml usando la función {@link dataToTrObject} y {@link objectToElement}
   * - En este caso son los datos del Pliego
   */
  function TableRowFromPliego(pliego) {
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
  }
  /**
   * Esta es una función para crear un elemento TR por cada uno de las condiciones del pliego usando la función {@link dataToTrObject} y {@link objectToElement}
   * - En este caso son las condiciones del pliego
   */
  function TableRowsFromCondiciones(condiciones) {
    condiciones.forEach((condicion) => {
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
  }
  /**
   * Esta es una función para crear un elemento TR por cada uno de los articulos solicitados usando la función {@link dataToTrObject} y {@link objectToElement}
   * - En este caso son los datos de la convocatoria
   */
  function TableRowFromArticulosSolicitados(articulos) {
    articulos.forEach((articulo) => {
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
  }

  /**
   * Esta función tiene el propocito de elegir los datos que se quieren utilizar de la respuesta pasada como parametro.
   * @param {XMLHttpRequest} xhttp Se utiliza para leer la petición y convertilo en xhttp.responseXML
   */
  function tableFromXML(xhttp) {
    var xdoc = xhttp.responseXML;

    var convocatoria = xdoc.getElementsByTagName("convocatoria")[0];
    TableRowFromConvocatoria(convocatoria);

    var pliego = convocatoria.getElementsByTagName("pliegos")[0].children[0];
    TableRowFromPliego(pliego);

    var condicionesPliego = [...pliego.children[0].children].sort(
      (primerItem, segundoItem) =>
        +primerItem.getAttribute("numero") - +segundoItem.getAttribute("numero")
    );
    TableRowsFromCondiciones(condicionesPliego);

    var articulosLicitados = [
      ...xdoc.getElementsByTagName("get_items_solicitados")[0].children,
    ];
    TableRowFromArticulosSolicitados(articulosLicitados);
  }
};
