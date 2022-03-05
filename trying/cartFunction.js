export function getProducts() {
  const products = localStorage.getItem("shoppingcart");

  if(products === null) {
    return [];
  } else {
    return JSON.parse(products);
  }
}