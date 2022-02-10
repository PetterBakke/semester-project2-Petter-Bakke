import { displayMessage } from "./components/displayMessage.js";

const heroUrl = "http://localhost:1337/home";
// const featured = document.querySelector(".featured-products");

async function getHero() {
  const container = document.querySelector(".hero");

  try {
    const response = await fetch(heroUrl);
    const home = await response.json();
    console.log(home);
    
    container.innerHTML += `<p>${home.published_at}</p>
                            <p>${home.hero_banner_alt_text}</p>
                            `;
    
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".featured-products");
  }
};

getHero();