  import { cart, deleteCart, saveToStorage, totalCartQuantity } from '../data/cart.js';
  import { products } from '../data/products.js';
  import { formatCurrency } from './utils/money.js';

  let checkoutHTML = '';

  cart.forEach( (cartItem) => {
    const productId = cartItem.productId;
    let matchedProduct;

    //to get the other details respect to cart 
    products.forEach( (product) => {
      if(product.id === productId) {
        matchedProduct = product;
      }
    });

    checkoutHTML += `
    
      <div class="checkout-cart-container__product-wrapper js-product-wrapper-container-${matchedProduct.id}">
        
        <!----------- left section ---------->
        <h3 class="checkout-cart-container__left-heading">Delivery date: Wednesday, October 8</h3>
        <section class="checkout-cart-container__left-cart-nd-delvery-cont">
          <section class="checkout-cart-container__left-cart-details">
            <div>
              <img class="checkout-cart-container__left-cart-details-img" src="${matchedProduct.image}" alt="Amazon logo">
            </div>
            <div class="checkout-cart-container__left-abt-product">
              <span class="checkout-cart-container__left-abt-product-text">${matchedProduct.name}</span>
              <span class="checkout-cart-container__left-abt-product-price-text">${formatCurrency(matchedProduct.priceCents)}</span>
              <div class="checkout-cart-container__left-quant-upt-del" data-product-id="${matchedProduct.id}">
                <span class="js-quant-display">Quantity: ${cartItem.quantity}</span>
                <span class="btn js-update-link" data-product-id = "${matchedProduct.id}">Update</span>
                <input class="upt-input js-input-upt" type="number" min=1 max=50 data-product-id="${matchedProduct.id}">
                <span class="btn save-btn js-save-upt-link" data-product-id="${matchedProduct.id}">Save</span>
                <span class="btn js-delete-link" data-product-id="${matchedProduct.id}" >Delete</span>
              </div>
            </div>
          </section>
        
          <section class="checkout-cart-container__left-delivery">
            <div class="checkout-cart-container__left-delivery-heading">Choose a delivery option:</div>
            <form>
              <label>
                <input type="radio" name="delivery-option-${matchedProduct.id}">
                <div>
                  <span class="date">Tuesday, October 14</span>
                  <span class="note">FREE Shipping</span>
                </div>
              </label>
              <label>
                <input type="radio" name="delivery-option-${matchedProduct.id}">
                <div>
                  <span class="date">Wednesday, October 8</span>
                  <span class="note">$4.99 - Shipping</span>
                </div>
              </label>
              <label>
                <input type="radio" name="delivery-option-${matchedProduct.id}">
                <div>
                  <span class="date">Monday, October 6</span>
                  <span class="note">$9.99 - Shipping</span>
                </div>
              </label>
            </form>
          </section>
        </section>

      </div>
    `;

  });
  document.querySelector('.js-checkout-cart-container__left-wrapper').innerHTML = checkoutHTML;

  const totalCartQuantityElement =  document.querySelector('.js-gloabal-header__mid-cart-quantity');
  totalCartQuantityElement.innerHTML = `${JSON.parse(localStorage.getItem('totalCartQuantity')) || totalCartQuantity()} item${totalCartQuantity() > 1 ? 's' : ''}`;

  
//delete btn
document.querySelectorAll('.js-delete-link').forEach( (link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;  // const productId = link.dataset.productId; 

    //delete it
    deleteCart(productId);

    //update in HTML
    const containerElement =  document.querySelector(`.js-product-wrapper-container-${productId}`);
    containerElement.remove();
    
    //updt total cart quantity
    totalCartQuantityElement.innerHTML =  `${totalCartQuantity()} item${totalCartQuantity() > 1 ? 's' : ''}`;

  });
});

//update btn
//-> to make them visible
document.querySelectorAll('.js-update-link').forEach( (link)=> {
  link.addEventListener( 'click' , () => {
    const {productId} = link.dataset;
    addInputSave(productId);
  });
});

function addInputSave(productId) {
  // const saveElement = document.querySelector(`.js-save-upt-${productId}`);
  const saveElement = document.querySelector(`.js-save-upt-link[data-product-id="${productId}"]`);
  const inputElement = document.querySelector(`.js-input-upt[data-product-id="${productId}"]`);

  inputElement.classList.add('visible');
  saveElement.classList.add('visible');

};

  //-> to make them save and right after invisible 
  //to save first
document.querySelectorAll('.js-save-upt-link').forEach( (link) => {
  link.addEventListener('click' , () => {
    const productId = link.dataset.productId;
    saveNewQuantity(productId); //1
    removeInputSave(productId); //2
  });
});

function saveNewQuantity(productId) {
  const inputElement = document.querySelector(`.js-input-upt[data-product-id="${productId}"]`);
  const newQuantity = parseInt(inputElement.value);

  cart.forEach( (cartItem) => {
    if( productId === cartItem.productId) {
      cartItem.quantity = newQuantity;
    }

    const containerElement = document.querySelector(`.checkout-cart-container__left-quant-upt-del[data-product-id="${productId}"]`);
    const quantDisplayElement = containerElement.querySelector('.js-quant-display');
    quantDisplayElement.textContent = `Quantity: ${newQuantity}`;
  });

  totalCartQuantityElement.innerHTML = `${totalCartQuantity()} item${totalCartQuantity() > 1 ? 's' : ''}`;
  saveToStorage();
}


// to remove second
function removeInputSave(productId) {
  const saveElement = document.querySelector(`.js-save-upt-link[data-product-id="${productId}"]`);
  const inputElement = document.querySelector(`.js-input-upt[data-product-id="${productId}"]`);

  saveElement.classList.remove('visible');
  inputElement.classList.remove('visible');
};




