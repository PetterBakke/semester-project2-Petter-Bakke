import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./components/displayMessage.js";


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

if (id) {
  document.location.href = "/products-details.html";
}


const detailsUrl = baseUrl + "/products/" + id;
console.log(detailsUrl);

async function getFromProd() {
  const container = document.querySelector(".details-container");

  try {
    const response = await fetch(detailsUrl);
    const details = await response.json();

    document.title = details.title;

    let prodsimage = details.image ? `${baseUrl}${details.image.url}` : details.image_url;
    container.innerHTML = `<div class="card" data-id="${details.id}">
    <h3>${details.title}</h3>
    <img src="${prodsimage}" class="detailsImg">
    <p>${details.price}</p>
    <details>
    <summary> More info </summary>
    <p>${details.description}</p>
    </details>
    </div>
    `;

    console.log(details);

  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".details-container");
  }
}

getFromProd();