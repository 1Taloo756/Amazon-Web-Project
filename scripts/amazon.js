import {Cart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
loadProducts(renderProductsGrid);
export let  cart=new Cart;
export function renderProductsGrid() {
  let productsHTML = '';
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  let filteredProducts = products;  
  
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword=false;
      product.keywords.forEach((keyword)=>{
        if(keyword.toLowerCase().includes(search.toLowerCase())){
          matchingKeyword=true;
        }

      });
      return matchingKeyword||product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart-${product.id}">
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });
  updateCartQuantity();
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  function updateCartQuantity() {
    let cartQuantity = cart.calculateCartQuantity();
   
   
  
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      let timeId=0;
      button.addEventListener('click', () => {
        clearTimeout(timeId);
        const {productId} = button.dataset;
        let element=document.querySelector(`.js-quantity-selector-${productId}`);
        let option=Number(element.value);
       document.querySelector(`.added-to-cart-${productId}`).innerHTML='<img src="images/icons/checkmark.png">Added';
       document.querySelector(`.added-to-cart-${productId}`).classList.add('added-to-cart-visible');
       timeId=setTimeout(()=>{
         document.querySelector(`.added-to-cart-${productId}`).innerHTML='';
       },300);


        cart.addToCart(productId,option);
        updateCartQuantity();
      });
    });
 document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}
document.querySelector('.js-search-bar').addEventListener('keydown',(event) => {
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });