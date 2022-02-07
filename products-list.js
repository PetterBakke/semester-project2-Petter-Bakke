import { displayMessage } from "./components/displayMessage.js";
const url = "http://localhost:1337/products";

(async function() {
  const container = document.querySelector(".product-container");

  try{
    const response = await fetch(url);
    const json = await response.json()
    console.log(json.data);

    json.data.forEach(function (data) {
      container.innerHTML += `<h4>${data.title}</h4>
                              <p>Price: ${data.price}</p>`;
    });
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();