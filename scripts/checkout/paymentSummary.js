import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

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
          <span>Items (2):</span>
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
    <button class="checkout__right-order-btn">Place Your Order</button>
  `;
  document.querySelector('.js-order-summary').innerHTML = paymentSummaryHTML;
};


