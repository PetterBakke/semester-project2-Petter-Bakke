import { displayMessage } from "./components/displayMessage.js";
const baseUrl = "http://localhost:1337";
// const url = "http://localhost:1337/products";
//  const productsUrl = baseUrl + "products";

(async function() {
  const container = document.querySelector(".product-container");

  try {
    const response = await fetch(baseUrl);
    const products = await response.json();
    console.log(products);

    container.innerHTML = "";

    products.forEach(function (data) {
      container.innerHTML += `<h3>${data.title}</h3>
                              <img src="${baseUrl}${data.image.url} alt=${data.title}">
                              <p>Price: ${data.price}</p>
                              <p>${data.description}</p>`;
    });
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();