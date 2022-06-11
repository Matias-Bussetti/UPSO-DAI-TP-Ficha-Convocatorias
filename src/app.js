var xhttp = new XMLHttpRequest();

//Load
xhttp.onloadstart = (e) => {
  //console.log("xhttp.onloadstart", e);
  document.getElementById("send").setAttribute("disabled", "");
  document.getElementById("loading-button-icon").style.visibility = "visible";
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
  document.getElementById("loading-button-icon").style.visibility = "hidden";
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

window.onload = () => {
  //document.getElementById("send").addEventListener("click", () => {
  //console.log("SEND");
  xhttp.open("GET", "./ficha_convocatorias.xml");
  /*xhttp.open(
      "GET",
      "http://aiweb.cs.washington.edu/research/projects/xmltk/xmldata/data/nasa/nasa.xml"
    );*/
  xhttp.send();
  //});
  document.getElementById("abort").addEventListener("click", () => {
    //console.log("ABORT");
    xhttp.abort();
  });
};

xhttp.onreadystatechange = (e) => {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
      children: [
        {
          tagName: "th",
          options: {
            class: "bg-1-2-3-4 align-middle text-center",
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
                    class: "sticky-top pb-1 pt-1",
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

    /*
    Datos de la Convocatoria
    convocatoria.getAttribute("expediente_tipo_documentacion")
    convocatoria.getAttribute("expediente_numero")
    convocatoria.getAttribute("expediente_ejercicio")
    convocatoria.getAttribute("asunto_convocatoria")
    
    /-0-/

    Datos del Pliego

    pliego.getAttribute("retiro_pliego_direccion")
    pliego.getAttribute("retiro_pliego_plazo_horario")
    pliego.getAttribute("acto_apertura_direccion")
    pliego.getAttribute("acto_apertura_fecha_inicio")
    pliego.getAttribute("acto_apertura_horario_inicio")

    Condiciones del pliego
    
    condicionesPliego
      .sort(
        (primerItem, segundoItem) =>
          +(
            primerItem.getAttribute("numero") -
            +segundoItem.getAttribute("numero")
          )
      )
      .forEach((registro) => {
        registro.getAttribute("numero")
        registro.getAttribute("titulo")
        registro.getAttribute("descripcion")
      });

    get_items_solicitados

     articulosLicitados.forEach(
      (item) => {
        item.getAttribute("area_destinataria")
        item.getAttribute("cantidad")
        item.getAttribute("precio_estimado")
        item.getAttribute("descripcion")
      }
    );
    
    */
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
                class: "sticky-top pb-1 pt-1",
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
                class: "sticky-top pb-1 pt-1",
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

    var table = {
      tagName: "table",
      options: {
        class: "table table-bordered mx-auto w-75",
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
          ],
        },
      ],
    };

    document.body.prepend(createElementRecusive(table));
  }
};

// + TABLE CREEATE ELEMENT
/*
{
  tagName: "th",
  children: [],
},
{
  tagName: "th",
  children: [],
},

{
  tagName: "tr",
  children: [],
},
{
  tagName: "thead",
  children: [],
},
{
  tagName: "tbody",
  children: [],
},
{
  tagName: "",
  options: {
    class: "",
    colspan: "",
    innerHTML: "",
    innerText: "",
  },
  children: [],
},


/tr for table
*/
/*
a = {
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
            class: "sticky-top pb-1 pt-1",
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
          tagName: "td",
          options: { class: "p-0 m-0" },
          children: [
            {
              tagName: "table",
              options: {
                class: "table table-bordered p-0 m-0",
              },
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
*/
