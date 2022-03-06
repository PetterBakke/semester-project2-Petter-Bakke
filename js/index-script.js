import { displayMessage } from "./components/displayMessage.js";
const baseUrl = "http://localhost:1337";
const heroUrl =  baseUrl + "/home";
const featureUrl = baseUrl + "/products";

async function getHero() {
  // const featured = document.querySelector(".featured-products");
  const container = document.querySelector(".hero-banner");

  try {
    const response = await fetch(heroUrl);
    const home = await response.json();
    // console.log(home);
    
    container.style.backgroundImage = `url('${baseUrl}${home.hero_banner.url}')`;
    
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".hero");
  }
};

getHero();

async function featureProds() {
  const featured = document.querySelector(".featured-products");

  try {
    const response = await fetch(`${featureUrl}?featured=true`);
    const feat = await response.json();
    console.log(feat);

    feat.forEach(function (data) {
      
      featured.innerHTML += createHtml(data);

    });


  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".featured-products");
  }
}

featureProds();


function createHtml(data) {
  let temp = `<div class="featured-cards">
  <h3 class="featured-heading">Featured products</h3>
  <h4>${data.title}</h4>
  <img class="featImg" src="${baseUrl}${data.image.url}">
  <p> Price: ${data.price}</p>
  </div>`;

  return temp
}
