import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

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
   
    <div class="checkout-cart-container__product-wrapper js-checkout-cart-container__product-wrapper">
      
      <!----------- left section ---------->
      <h3 class="checkout-cart-container__left-heading">Delivery date: Wednesday, October 8</h3>
      <section class="checkout-cart-container__left-cart-nd-delvery-cont">
        <section class="checkout-cart-container__left-cart-details">
          <div>
            <img class="checkout-cart-container__left-cart-details-img" src="${matchedProduct.image}" alt="Amazon logo">
          </div>
          <div class="checkout-cart-container__left-abt-product">
            <span class="checkout-cart-container__left-abt-product-text">${matchedProduct.name}</span>
            <span class="checkout-cart-container__left-abt-product-price-text">${(matchedProduct.priceCents / 100).toFixed(2)}</span>
            <div class="checkout-cart-container__left-quant-upt-del">
              <span>Quantity: ${cartItem.quantity}</span>
              <span class="upt">Update</span>
              <span class="del">Delete</span>
            </div>
          </div>
        </section>
      
        <section class="checkout-cart-container__left-delivery">
          <div class="checkout-cart-container__left-delivery-heading">Choose a delivery option:</div>
          <form>
            <label>
              <input type="radio" name="Shipping">
              <div>
                <span class="date">Tuesday, October 14</span>
                <span class="note">FREE Shipping</span>
              </div>
            </label>
            <label>
              <input type="radio" name="Shipping">
              <div>
                <span class="date">Wednesday, October 8</span>
                <span class="note">$4.99 - Shipping</span>
              </div>
            </label>
            <label>
              <input type="radio" name="Shipping">
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