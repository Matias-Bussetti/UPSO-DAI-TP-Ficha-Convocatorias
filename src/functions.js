/**
 * Esta Función tiene el unico objetivo de regresar a la barra de progreso, a sus valores por defecto o iniciales:
 * - El classList
 * - Width: "0%"
 * - InnerText: ""
 * **Bootstrap!** https://getbootstrap.com/docs/5.0/components/progress
 * @param {HTMLElement} progressBar - Elemento ProgressBar de **Bootstrap**
 * @param  {string} classListString - Clases iniciales del ProgressBar
 */
function cleanProgressBar(progressBar, classListString) {
  progressBar.style.width = "0%";
  progressBar.innerText = "";
  progressBar.classList = classListString;
}

/**
 * Esta Función tiene el objetivo cambiar los atributos a la barra de progreso.
 * **Bootstrap!** https://getbootstrap.com/docs/5.0/components/progress
 * @param {HTMLElement} progressBar - Elemento ProgressBar de **Bootstrap**
 * @param  {string} percentage - Porcentaje de la barra
 * @param  {string} text - Valor del innerText
 * @param  {...string} classLists - (Todos los parámetros seguidos del 3ro) Nombre de la clase que se quiere agregar
 *
 * @example <caption>Ejemplo de como usar el Metodo:</caption>
 * progressBarValues(progressBar, 60, "60%", "clase-1", "clase-2")
 *
 */
function progressBarValues(progressBar, percentage, text, ...classLists) {
  progressBar.style.width = percentage + "%";
  progressBar.innerText = text;
  classLists.forEach((cssClass) => progressBar.classList.toggle(cssClass));
}

/**
 * Muestra o esconde el elemento pasado como parámetro, dependiendo del valor del segundo parámetro
 * @param {HTMLElement} element - Elemento HTML
 * @param  {boolean} displayValue - Valor de la condición
 * @example <caption>Ejemplo de como usar el Metodo:</caption>
 * // el valor del estilo display sera:
 * showElement(element, true);  // "inline-block" (se muestra)
 * showElement(element, false); // "none" (no se muestra)
 */
function showElement(element, displayValue) {
  element.style.display = displayValue ? "inline-block" : "none";
}

/**
 * Agrega o elimina al elemento pasado como parámetro el atributo "disabled", dependiendo del valor del segundo parámetro
 *
 * @param {HTMLElement} element - Elemento HTML
 * @param  {boolean} disableValue - Valor de la condición
 *
 * @example <caption>Ejemplo de como usar el Metodo:</caption>
 * // El atributo "disabled" se:
 * elementDisableAttributeValue(element, true); // Agrega
 * elementDisableAttributeValue(element, false);// Elimina
 */
function elementDisableAttributeValue(element, disableValue) {
  if (disableValue) {
    element.setAttribute("disabled", "");
  } else {
    element.removeAttribute("disabled", "");
  }
}

/**
 * @typedef {Object} options
 * Objeto de atributos de un `HTMLElement`
 *
 * Ejemplo:
 * ```
 * {
 *  id: "id-2"
 *  class: "bg-1-2-3-4 text-center",
 *  innerText: "hola",
 * }
 * ```
 */

/**
 * Objeto con datos de un `HTMLElement` que se utilizar para crearlo y recursivamente tambien a sus hijos
 * @typedef {Object} objectElementData
 * @property {string} tagName - Nombre de la Etiqueta
 * @property {options} options - Objeto de tipo options, con los datos y los atributos del elemento
 * @property {[objectElementData]} children - Arreglo de objectElementData
 */

/**
 * Esta función recibe como parámetro un objeto de tipo `objectElementData` y lo convierte en un elemento.
 *
 * @param {objectElementData} objectElementData - Objeto de tipo `objectElementData`
 * @return {HTMLElement} - Retorna un elemento HTML con el formato pasado como parámetro
 *
 * @example <caption>Ejemplo de como usar el Metodo:</caption>
 * //Supongamos que queremos tener un lista de frutas de esta forma:
 *
 *  <ul>
 *  <li>Manzana</li>
 *  <li class="orange">Naranja</li>
 *  <li id="amarillo">Banana</li>
 * </ul>
 *
 * //Entonces, tendremos que pasar como parametro un objeto formateado de la siguiente forma:
  //{
  //  tagName: "ul",
  //  children: [
  //    {
  //      tagName: "li",
  //      options: {
  //        innerText: "Manzana",
  //      },
  //    },
  //    {
  //      tagName: "li",
  //      options: {
  //        class: "orange",
  //        innerText: "Naranja",
  //      },
  //    },
  //    {
  //      tagName: "li",
  //      options: {
  //        id: "amarillo",
  //        innerText: "Banana",
  //      },
  //    },
  //  ],
  //};
 *
 *
 *
 */
function objectToElement({ tagName, options, children }) {
  //Se crear un elemento del tipo que que se paso como parametro
  var element = document.createElement(tagName);

  //Si tiene atrbutos para agregar
  if (options) {
    //Por cada uno de estos se añade el atrbutos, excepto en el caso de innerHtml y innerHTML
    Object.entries(options).forEach((option) => {
      switch (option[0]) {
        case "innerText":
          element.innerText = option[1];
          break;
        case "innerHTML":
          element.innerHTML = option[1];
          break;
        default:
          element.setAttribute(option[0], option[1]);
          break;
      }
    });
  }
  //Si tiene objetos hijos para anexar al elemento, se llama denuevo a la función.
  //Esta acabara cuando el objeto que se pase como hijo no tenga hijos
  //Recursión!
  if (children) {
    children.forEach((child) => {
      element.append(objectToElement(child));
    });
  }
  return element;
}
