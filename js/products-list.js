import { displayMessage } from "./components/displayMessage.js";
const baseUrl = "http://localhost:1337";
const productsUrl = baseUrl + "/products";
const searchButton = document.querySelector(".search-button");
const container = document.querySelector(".product-container");


async function getProds(searchInput) {

  try {
    const searchUrl = productsUrl + `?title_contains=${searchInput}`;
    const response = await fetch(searchUrl);
    const products = await response.json();
    container.innerHTML = "";
    createHtml(products);

    const addToCartBtns = document.querySelectorAll(".addCartBtn");
    addToCartBtns.forEach(addToCartBtn => addToCartBtn.addEventListener("click", handleAddToCart));

  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};

getProds("");



function createHtml(products) {

  products.forEach(prods => {

    let prodsimage = prods.image ? `${baseUrl}${prods.image.url}` : prods.image_url;

    container.innerHTML += `
  
    <div class="cards" data-id="${prods.id}">
    <h3>${prods.title}</h3>
    
    <a href="/products-details.html">
    <img src="${prodsimage}" class="prodImg" alt="${prods.title}">
    </a>
    
    <p>Price: ${prods.price}
    <span class="addCartBtn"><i class="fa-solid fa-cart-plus" data-id=${prods.id}></i></span>
    
    </p>
    <details>
    <summary> More info </summary>
    <p>${prods.description}</p>
    </details>
    </div>
    `
  })
};

// searchButton.onclick = function() {
//   const searchInput = document.querySelector(".search").value;
//   console.log(searchInput);
//   getProds(searchInput);
// }

const searchInput = document.querySelector(".search");

function filterOnChange(e) {
  console.log(e.target.value);
  getProds(e.target.value);
}
searchInput.addEventListener('input', filterOnChange);




function handleAddToCart(e) {
  let addToCartId = e.target.dataset.id;

  if (localStorage.getItem("shoppingcart") === null) {
    console.log("Creating a shoppingcart key in localstorage");
    localStorage.setItem('shoppingcart', JSON.stringify([]));
  }
  console.log("Adding product to cart");
  let cartitems = JSON.parse(localStorage.getItem('shoppingcart'));
  cartitems.push(addToCartId);
  localStorage.setItem('shoppingcart', JSON.stringify(cartitems));

}
