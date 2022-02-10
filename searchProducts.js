

function searchProducts(products) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event-EventTarget.value.trim().tolowerCase();

    const filteredProducts = products.filter(function(product) {
      if (product.title < searchValue) {
        return true;
      }
    });
    renderedProducts(filteredProducts);
  };
}