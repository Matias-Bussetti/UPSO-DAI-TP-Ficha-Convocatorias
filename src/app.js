var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = (e) => {
  if (this.readyState == 4 && this.status == 200) {
    var xdoc = xhttp.responseXML;
  }
  console.log("xhttp.onreadystatechange", e);
};

//Load
xhttp.onloadstart = (e) => {
  console.log("xhttp.onloadstart", e);
  document.getElementById("send").setAttribute("disabled", "");
  document.getElementById("loading-button-icon").style.visibility = "visible";
};

xhttp.onprogress = (e) => {
  console.log("xhttp.onprogress", e);

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

xhttp.onload = (e) => console.log("xhttp.onload", e);
xhttp.onloadend = (e) => {
  console.log("xhttp.onloadend", e);
  document.getElementById("send").removeAttribute("disabled");
  document.getElementById("loading-button-icon").style.visibility = "hidden";
};

//ERROR

xhttp.onerror = (e) => {
  console.log("xhttp.onerror", e);
  if (!window.navigator.onLine) {
    document.getElementById("progress").style.width = "100%";
    document.getElementById("progress").innerText =
      "Se Perdio la Conección con el internet";
    document.getElementById("progress").classList.add("bg-danger");
  }
};
xhttp.onabort = (e) => {
  console.log("xhttp.onabort", e);
  document.getElementById("progress").setAttribute("aria-valuemax", e.total);
  document.getElementById("progress").setAttribute("aria-valuenow", e.loaded);
  document.getElementById("progress").style.width = "100%";
  document.getElementById("progress").innerText = "Error";
};

window.onload = () => {
  document.getElementById("send").addEventListener("click", () => {
    //console.log("SEND");
    //axhttp.open("GET", "./ficha_convocatorias.xml");
    xhttp.open(
      "GET",
      "http://aiweb.cs.washington.edu/research/projects/xmltk/xmldata/data/nasa/nasa.xml"
    );
    xhttp.send();
  });
  document.getElementById("abort").addEventListener("click", () => {
    //console.log("ABORT");
    xhttp.abort();
  });
};
