import { displayMessage } from "./components/displayMessage.js";

const heroUrl = "http://localhost:1337/home";
// const featured = document.querySelector(".featured-products");

(async function() {
  const container = document.querySelector(".hero");

  try {
    const response = await fetch(heroUrl);
    const products = await response.json();
    console.log(products);
    
    products.forEach(function (data) {
      container.innerHTML += `<div class="hero">
                                      <img src="${data.hero_banner}"</img>
                                      </div>`;
      });
    
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".featured-products");
  }
})();
