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
    var conv = xdoc.getElementsByTagName("convocatoria")[0];
    //Primera Tabla

    var tablaLicitacion = createElement(
      "table",
      { class: "table table-bordered p-0 m-0 position-relative" },
      createElement(
        "thead",
        { class: "sticky-top pb-1 pt-1" },
        createElement(
          "tr",
          { class: "bg-1-2-3" },
          createElement("th", { innerText: "Área destinada" }),
          createElement("th", { innerText: "Cantidad" }),
          createElement("th", { innerText: "Precio Estimado" }),
          createElement("th", { innerText: "Descripción" })
        )
      ),
      createElement("tbody")
    );
    var rowLicitacion = createElement(
      "tr",
      null,
      createElement(
        "th",
        { class: "text-center bg-1-2 position-relative" },
        createElement("span", {
          class: "sticky-top pb-1 pt-1",
          innerText: "Licitación: Artículos Solicitados",
        })
      ),
      createElement(
        "td",
        { class: "p-0 m-0" },
        createElement("span", {
          class: "sticky-top pb-1 pt-1",
          innerText: "Licitación: Artículos Solicitados",
        })
      )
    );

    tableDatosConvocatoria.append(tablaLicitacion);
    var tableDatosConvocatoria = createElement(
      "table",
      { class: "table table-bordered mx-auto w-75" },
      createElement(
        "thead",
        null,
        createElement(
          "tr",
          null,
          createElement("th", {
            class: "bg-1",
            colspan: 3,
            innerText: "Datos de la Convocatoria",
          })
        )
      ),
      createElement(
        "tbody",
        null,
        createElement(
          "tr",
          null,
          createElement("th", {
            class: "bg-1-2-3-4",
            innerText: "Tipo",
          }),
          createElement("td", {
            innerText: conv.getAttribute("expediente_tipo_documentacion"),
          })
        ),
        createElement(
          "tr",
          null,
          createElement("th", {
            class: "bg-1-2-3-4",
            innerText: "Número/Año",
          }),
          createElement("td", {
            innerText:
              conv.getAttribute("expediente_numero") +
              "/" +
              conv.getAttribute("expediente_ejercicio"),
          })
        ),
        createElement(
          "tr",
          null,
          createElement("th", {
            class: "bg-1-2-3-4",
            innerText: "Asunto",
          }),
          createElement("td", {
            innerText: conv.getAttribute("asunto_convocatoria"),
          })
        )
      )
    );
    /*
    createElement(
      "tr",
      null,
      
      
      
    )
    .querySelector("tbody")
    .append(createElement("p", { innerText: "no" }));
    */
    document.body.prepend(tableDatosConvocatoria);

    console.log("%cDatos de la Convocatoria", "color:red;font-size:20px");

    console.log(
      "%c" + conv.getAttribute("expediente_tipo_documentacion"),
      "color:green;"
    );
    console.log("%c" + conv.getAttribute("expediente_numero"), "color:green;");
    console.log(
      "%c" + conv.getAttribute("expediente_ejercicio"),
      "color:green;"
    );
    console.log(
      "%c" + conv.getAttribute("asunto_convocatoria"),
      "color:green;"
    );

    console.log("%cDatos del Pliego", "color:purple;font-size:20px");

    var pliego = conv.getElementsByTagName("pliegos")[0].children[0];

    console.log(
      "%c" + pliego.getAttribute("retiro_pliego_direccion"),
      "color: pink;"
    );
    console.log(
      "%c" + pliego.getAttribute("retiro_pliego_plazo_horario"),
      "color: pink;"
    );
    console.log(
      "%c" + pliego.getAttribute("acto_apertura_direccion"),
      "color: pink;"
    );
    console.log(
      "%c" + pliego.getAttribute("acto_apertura_fecha_inicio"),
      "color: pink;"
    );
    console.log(
      "%c" + pliego.getAttribute("acto_apertura_horario_inicio"),
      "color: pink;"
    );

    console.log("%cCondiciones del pliego", "color:orange;font-size:20px");

    var registrosPliegos = [...pliego.children[0].children];

    registrosPliegos
      .sort(
        (primerItem, segundoItem) =>
          +(
            primerItem.getAttribute("numero") -
            +segundoItem.getAttribute("numero")
          )
      )
      .forEach((registro) => {
        console.log("%c" + registro.getAttribute("numero"), "color: #e67d63;");
        console.log("%c" + registro.getAttribute("titulo"), "color: #e67d63;");
        console.log(
          "%c" + registro.getAttribute("descripcion"),
          "color: #e67d63;"
        );
      });
    console.log("%c get_items_solicitados", "color:#00ffff;font-size:20px");
    [...xdoc.getElementsByTagName("get_items_solicitados")[0].children].forEach(
      (item) => {
        console.log(item.getAttribute("area_destinataria"));
        console.log(item.getAttribute("cantidad"));
        console.log(item.getAttribute("precio_estimado"));
        console.log(item.getAttribute("descripcion"));
      }
    );

    /*
    [...xdoc.getElementsByTagName("pliegos")].forEach((conv) => {
      console.log(
        "%c" + conv.getAttribute("expediente_tipo_documentacion"),
        "color:green;"
      );
      console.log(
        "%c" + conv.getAttribute("expediente_numero"),
        "color:green;"
      );
      console.log(
        "%c" + conv.getAttribute("expediente_ejercicio"),
        "color:green;"
      );
      console.log(
        "%c" + conv.getAttribute("asunto_convocatoria"),
        "color:green;"
      );
    });
    */
  }
  //console.log("xhttp.onreadystatechange", e);
};

// + TABLE CREEATE ELEMENT
