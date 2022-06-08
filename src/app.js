var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = (e) => {
  if (this.readyState == 4 && this.status == 200) {
    var xdoc = xhttp.responseXML;
  }
  console.log("xhttp.onreadystatechange", e);
};

//Load
xhttp.onloadstart = (e) => console.log("xhttp.onloadstart", e);
xhttp.onprogress = (e) => console.log("xhttp.onprogress", e);
xhttp.onloadend = (e) => console.log("xhttp.onloadend", e);
xhttp.onload = (e) => console.log("xhttp.onload", e);

//ERROR
xhttp.onerror = (e) => console.log("xhttp.onerror", e);
xhttp.onabort = (e) => {
  console.log("xhttp.onabort", e);
  const CONTROLADOR = new AbortController();
  const SENIAL = CONTROLADOR.signal;
  CONTROLADOR.abort();
};

window.onload = () => {
  document.getElementById("send").addEventListener("click", () => {
    console.log("SEND");
    //axhttp.open("GET", "./ficha_convocatorias.xml");
    xhttp.open(
      "GET",
      "http://aiweb.cs.washington.edu/research/projects/xmltk/xmldata/data/pir/psd7003.xml"
    );
    xhttp.send();
  });
  document.getElementById("abort").addEventListener("click", () => {
    console.log("ABORT");
  });
};
