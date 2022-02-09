import { displayMessage } from "./components/displayMessage.js";

const url = "http://localhost:1337/products";

async function getProd() {
  // const header = document.querySelector(".hero");
  const featured = document.querySelector(".featured-products");

  try {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products);
    
    products.forEach(function (data) {
      featured.innerHTML += `<img>${data.hero_banner}</img>
                              <img>${data.thumbnails}</img>`
    });
    
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".featured-products");
  }
}

getProd();