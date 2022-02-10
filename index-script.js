import { displayMessage } from "./components/displayMessage.js";

const heroUrl = "http://localhost:1337/home";
// const featured = document.querySelector(".featured-products");

async function getHero() {
  const container = document.querySelector(".hero");

  try {
    const response = await fetch(heroUrl);
    const products = await response.json();
    console.log(products);
    
    container.innerHTML += `<img src="${products.hero_banner}"</img>`;
    
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".featured-products");
  }
};

getHero();