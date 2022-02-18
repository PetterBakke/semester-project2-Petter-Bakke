import { displayMessage } from "./components/displayMessage.js";
import { productsUrl } from "./products-list.js";

async function getFromProd() {
  const container = document.querySelector(".details-container");

  try {
    const response = await fetch(productsUrl);
    const prodDetails = await response.json();
    console.log(prodDetails);
    container.innerHTML = "";

  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".details-container");
  }
}

getFromProd();