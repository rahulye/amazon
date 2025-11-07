import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { totalCartQuantity } from "../../data/cart.js";
import { addOrder, orders } from "../orders.js";

export default function renderPaymentSummary() {
  
  let productPriceCents = 0;
  let productShippingPriceCents = 0;
  
  cart.forEach( (cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;  
    
    const deliveryOptionID = getDeliveryOption(cartItem);
    productShippingPriceCents += deliveryOptionID.priceCents;
  });
  
  const totalBeforeTaxCents = productPriceCents + productShippingPriceCents;
  const estimatedTaxCents = totalBeforeTaxCents * 0.1;
  const totalPriceCents = totalBeforeTaxCents + estimatedTaxCents;
  
  let paymentSummaryHTML = '';

  paymentSummaryHTML += `
    <section class="checkout__right-wrapper">
      <h3>Order Summary</h3>
      <ol>
        <li>
          <span>Items (${totalCartQuantity()}):</span>
          <span>$${formatCurrency(productPriceCents)}</span>
        </li>
        <li>
          <span>Shipping & handling:</span>
          <span>$${formatCurrency(productShippingPriceCents)}</span>
        </li>
        <li>
          <span>Total before tax:</span>
          <span>$${formatCurrency(totalBeforeTaxCents)}</span>
        </li>
        <li>  
          <span>Estimated tax (10%):</span>
          <span>$${formatCurrency(estimatedTaxCents)}</span>
        </li>
        <hr>
        <li>
          <span class="checkout__right-order-total-text">Order total:</span>
          <span class="checkout__right-order-total-text">$${formatCurrency(totalPriceCents)}</span>
        </li>
      </ol>
    </section>
    <button class="checkout__right-order-btn js-place-order-btn">Place Your Order</button>
  `;
  document.querySelector('.js-order-summary').innerHTML = paymentSummaryHTML;

  // 1. first when we click this btn we make a request to the backend to reate the order
  // 2. we can use use promise which we could use .then but better way is async await makes the code run like normal
  // 3. the response.json() cuz response value here prints the response object we want data not metadata so here we use response.json() convert to JS object by parsing
  //       Here, the response.json() is also a promise so we add await here to to load this step before move to next line
  
  document.querySelector('.js-place-order-btn').addEventListener( 'click' , async () => {
    try{
      const response = await fetch( 'https://error.supersimplebackend.dev/orders' , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          cart : cart
        })
      });
      const data = await response.json(); 
      console.log(data);
      addOrder(data);
    } 
    catch(error) {
      console.log('Backend Server problem. Try again later. \n' + error);
    };

    //to open order page after the click 
    window.location.href = 'orders.html';         // https://www.site.com/----replaced-----
  });
};



