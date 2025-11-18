import { cart, resetCart, saveToStorage } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { totalCartQuantity } from "../../data/cart.js";
import { addOrder, orders, renderOrders } from "../orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export default function renderPaymentSummary() {
  
  let productPriceCents = 0;
  let productShippingPriceCents = 0;
  
  cart.forEach( (cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;  
    
    const deliveryOptionID = getDeliveryOption(cartItem.deliveryOptionsId);
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

    if(cart.length===0) {
        alert('No Prodcuts in the Cart :-(');
        return;
      }

    try{
    
      //send price and deliveryoption details

      const orderProducts = cart.map( (item) => {        
        
        const product = getProduct(item.productId);
        const today = dayjs();
        const deliveryOption = getDeliveryOption(item.deliveryOptionsId);
        const deliveryDate = today.add(deliveryOption.inDeliveryDays, 'day').toISOString();

        return {
          productId: item.productId,
          quantity: item.quantity,
          deliveryOptionsId: item.deliveryOptionsId,
          priceCents: product.priceCents * item.quantity + deliveryOption.priceCents,
          estimatedDeliveryTime: deliveryDate,
          variation: null
        };
      });

      const response = await fetch( 'https://supersimplebackend.dev/orders' , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          cart : cart,
          products : orderProducts
        })
      });

      const data = await response.json(); 
      addOrder(data);
      // to open order page after the click 
      window.location.href = 'orders.html';         // https://www.site.com/----replaced-----
    } 
    catch(error) {
      console.log('Backend Server problem. Try again later. \n' + error);
    };

    resetCart();

  });

};



