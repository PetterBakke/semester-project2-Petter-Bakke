import { displayMessage } from "./components/displayMessage.js";
const baseUrl = "http://localhost:1337";
const productsUrl = baseUrl + "/products";
const searchButton = document.querySelector(".search-button");
const container = document.querySelector(".product-container");


async function getProds() {

  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    createHtml(products);

  } catch(error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};

getProds();


function createHtml(products) {
  products.forEach(prods => {
    container.innerHTML += `
    
    <div class="cards">
     <h3>${prods.title}</h3>
     <div class="div-pic">
     <a href="/products-details.html">
     <img src="${baseUrl}${prods.image.url}" class="prodImg" alt="${prods.title}">
     </a>
     </div>
     <p>Price: ${prods.price}</p>
     <p>${prods.description}</p>
    </div>
    
    `
  })
};

searchButton.onclick = function() {
  const searchInput = document.querySelector(".search").value;
  getProds(searchInput);
}





// container.innerHTML = "";

//     products.forEach(function (data) {
//       container.innerHTML += `<div class="cards"><h3>${data.title}</h3>
//                               <a href="/products-details.html">
//                               <img src="${baseUrl}${data.image.url}" class="prodImg" alt="${data.title}">
//                               </a>
//                               <p>Price: ${data.price}</p>
//                               <p>${data.description}</p>
//                               </div>`;
//     });
//   }
// }