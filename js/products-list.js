import { displayMessage } from "./components/displayMessage.js";
const url = "http://localhost:1337/products";

(async function() {
  const container = document.querySelector(".product-container");

  try {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products);

    products.forEach(function (data) {
      container.innerHTML += `<h3>${data.title}</h3>
                              <p>Price: ${data.price}</p>
                              <p>${data.description}</p>`;
    });
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();

