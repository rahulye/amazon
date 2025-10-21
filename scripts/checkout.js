  import { cart, deleteCart, totalCartQuantity } from '../data/cart.js';
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
              <div class="checkout-cart-container__left-quant-upt-del">
                <span>Quantity: ${cartItem.quantity}</span>
                <span class="btn js-update-link" data-product-id = "${matchedProduct.id}" >Update</span>
                <input class="input js-input-link" type="number" min=1 max=10>
                <span class="btn js-save-link" data-product-id = "${matchedProduct.id}" >Save</span>
                <span class="btn js-delete-link" data-product-id = "${matchedProduct.id}" >Delete</span>
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
  totalCartQuantityElement.innerHTML = `${totalCartQuantity()} item${totalCartQuantity() > 1 ? 's' : ''}`;

  
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
document.querySelectorAll('.js-update-link').forEach( (link)=> {

  link.addEventListener( 'click' , () => {
    console.log(link.dataset.productId);
  });

});