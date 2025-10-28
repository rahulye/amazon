import { totalCartQuantity } from "../../data/cart.js";

export default function renderCheckoutHeader() {

  const checkoutHeaderHTML = `
    <nav class="global-header__wrapper">
      <section class="global-header__left">
        <a href="index.html">
          <img class="global-header__left-home-icon-img" src="images/checkout/icons/amazon-logo.png" alt="Amazon logo">
        </a>
      </section>

      <section class="global-header__middle">
        <span class="global-header__middle-text">Checkout ( <span class="global-header__middle-highlight-text js-gloabal-header__mid-cart-quantity"></span> )</span>
      </section>
      
      <section class="global-header__right">
      </section>
    </nav>
  `;
  document.querySelector('.js-header').innerHTML = checkoutHeaderHTML;

  const totalCartQuantityElement =  document.querySelector('.js-gloabal-header__mid-cart-quantity');
  const cartQuantity = totalCartQuantity();
  totalCartQuantityElement.innerHTML = `${cartQuantity} item${cartQuantity > 1 ? 's' : ''}`;
};