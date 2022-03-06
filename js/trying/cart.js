import { getProducts } from "./cartFunction.js";

const baseUrl = "http://localhost:1337";
const cartContainer = document.querySelector(".container");



async function getProds(ids) {
  let filterstring = "";
  ids.forEach(id => filterstring = `${filterstring}&id_in=${id}`);

  const productsUrl = baseUrl + `/products?${filterstring}`;


  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    console.log(products);
    // cartContainer.innerHTML = "";

    createHtml(products);

    // const addToCartBtns = document.querySelectorAll(".addCartBtn");
    // addToCartBtns.forEach(addToCartBtn => addToCartBtn.addEventListener("click", handleAddToCart));

  } catch (error) {
    console.log(error);
  }
};


function createHtml(products) {
  let totalCounter = 0;

  products.forEach(prods => {

    totalCounter += prods.price;
    console.log(totalCounter);

    let prodsimage = prods.image ? `${baseUrl}${prods.image.url}` : prods.image_url;
    cartContainer.innerHTML += `
    <div class="card">
    <a href="/products-details.html?id=${prods.id}"><img src="${prodsimage}" class="cart-image">
    <h3>${prods.title}</h3></a>         
    <p>${prods.price}</p>
   </div>`;
  })

  // her må du bruke totalcounter HTML inject
  const price = document.querySelector(".total-price");
   price.innerHTML += `<div class="price">
   <p>Total price: ${totalCounter},-</p>
   </div>
   `;


};


const cartProducts = getProducts()
console.log(cartProducts);


if (cartProducts.length === 0) {
  cartContainer.innerHTML = "No products in shopping cart";
}

getProds(cartProducts);