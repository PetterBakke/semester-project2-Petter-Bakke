import { displayMessage } from "./components/displayMessage.js";
const baseUrl = "http://localhost:1337";
const heroUrl =  baseUrl + "/home";
const featureUrl = baseUrl + "/products";

async function getHero() {
  // const featured = document.querySelector(".featured-products");
  const container = document.querySelector(".hero");

  try {
    const response = await fetch(heroUrl);
    const home = await response.json();
    console.log(home);

    

    container.innerHTML = "";
    
    container.innerHTML += `<div class="header">
    <img src="${baseUrl}${home.hero_banner.url}" class="hero-banner" alt="${home.hero_banner_alt_text}">
    </div>`;
    
  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".hero");
  }
};

getHero();

// async function featureProds() {
//   const featured = document.querySelector(".featured-products");

//   try {
//     const response = await fetch(featureUrl);
//     const feat = await response.json();
//     console.log(feat);

//     featured.innerHTML = "";

//     featured.forEach(function (data) {
//       featured.innerHTML += `<h3>${data.title}</h3>
//                               <p>${data.featured}</p>`;
//     });
//   } catch(error) {
//     console.log(error);
//     // displayMessage("error", error, ".featured-products");
//   }
// }

// featureProds();

function createHtml(feat) {
  let featured = "";
  if(feat.products.featured === true){
    featured.innerHTML += `<h4>${feat.products.title}</h4>
    <p> Price: ${feat.products.price}</p>`;
  }
}
createHtml(getHero);