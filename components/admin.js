import { baseUrl } from "./baseUrl.js";
import { getFromStorage } from "../utility/storage.js";
import { loggingOut } from "../utility/logOutBtn.js";
const productsUrl = baseUrl + "/products";

const container = document.querySelector(".admincards");

let jwt = getFromStorage("token")
let usr = getFromStorage("user")
if (Array.isArray(usr)) {
  if (usr.length == 0) {
    location.href = "/account.html";
  }
}





async function getProds() {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    console.log(products);


    // GENERATE THE CARDS
    createAdminHtml(products);


  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};
getProds();


function createAdminHtml(products) {


  products.forEach(prods => {
    let prodsimage = prods.image ? `${baseUrl}${prods.image.url}` : prods.image_url;
    // container.innerHTML += `
    //   <div class="cards">
    //   <h3>${prods.title}</h3>
    //   <div class="div-pic">
    //   <a href="/products-details.html">
    //   <img src="${prodsimage}" class="prodImg" alt="${prods.title}">
    //   </a>
    //   </div>
    //   <p>Price: ${prods.price}
    //   <i class="fa-solid fa-cart-plus cart-icon"></i>
    //   </p>
    //   <details>
    //   <summary> More info </summary>
    //   <p>${prods.description}</p>
    //   </details>
    //   </div>
    //   `
    container.innerHTML += `
      <div class="col">
      <div class="card">
        <img src="${prodsimage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${prods.title}</h5>
          <p class="card-text">Price: ${prods.price}</p>
          <label>Image URL:</label>
          <input type="image-url" class= "form-control" id="imageurl" aria-describedby="imageurl"/>
          <a href="#" class="btn btn-primary btn-save" data-id="${prods.id}" >Save new URL</a>
          <a href="#" class="btn btn-danger btn-del" data-id="${prods.id}" onclick = `handleSave(${ id })`>Delete</a>
          <a ></a>
        </div>
      </div>
      </div>
    `
  })
};





async function createProduct(title, price, featured, desc, image_url) {
  const url = `${baseUrl}/products`;

  const data = JSON.stringify({
    title: title,
    price: price,
    featured: featured,
    description: desc,
    image: "",
    image_url: image_url
  });
  console.log(data)

  strapi_conn(data, "POST", url)
};
// updateProduct("Shoename",100,false,"Description", "imageurl")


async function updateProduct(id, image_url) {
  const url = `${baseUrl}/products/${id}`;

  try {
    const response = await fetch(url);
    const product = await response.json();

    product.image = "";
    product.image_url = image_url;

    strapi_conn(data, "PUT", url)

  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};
// updateProduct(1, "url")


async function deleteProduct(id) {
  const url = `${baseUrl}/products/${id}`;

  const data = ""
  strapi_conn(data, "DELETE", url)
};
// deleteProduct(22);


async function strapi_conn(data, method, url) {

  console.log(jwt);
  const options = {
    method: method,
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

  } catch (error) {
    console.log(error);
  }
}

const logOutBtn = document.querySelector(".logOut");
logOutBtn.addEventListener("click", logOut);

function logOut() {
  loggingOut();
  container.innerHTML = "You are now successfully logged out";
}

const saveBtn = document.querySelectorAll(".btn-save");
const delBtn = document.querySelectorAll(".btn-del");

// saveBtn.addEventListener(event);

// function saveChanges(event) {
// event.target.dataset.id;
// }

// delBtn.addEventListener(event);

function handleSave(event) {
  const deleteThisProduct = event.target.dataset.id;

  deleteThisProduct.forEach(function (delBtn) {
    delBtn.addEventListener("click", handleSave);
  })
}


// onclick = `handleSave(${ id })`