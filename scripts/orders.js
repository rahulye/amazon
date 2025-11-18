// this file to save the orders 

import { getProduct} from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import formatCurrency from "./utils/money.js";
import { cart, totalCartQuantity } from "../data/cart.js";


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

if (!localStorage.getItem('orders')) {
  saveToStorage();
}

export function addOrder(order) {
  orders.unshift(order);   // make the order to store in front not in the back of the array 
  saveToStorage();
};

function saveToStorage() {
  localStorage.setItem( 'orders' , JSON.stringify(orders));
};




export function renderOrders() {

  document.querySelector('.js-cart-count').innerHTML = totalCartQuantity();

  let orderHTML = '';

  orders.forEach((orderItem) => {

    const orderDate = dayjs(orderItem.orderTime).format('dddd, MMMM DD');
    const totalCost = formatCurrency(orderItem.totalCostCents);


    // function get(latestOrderProducts) {
    //   latestOrderProducts.forEach((item) => {
    //     const product = getProduct(item.productId);
    //     const deliveryDate = dayjs(item.estimatedDeliveryTime).format('dddd, MMMM DD');
    //     const totalPrice = formatCurrency(item.priceCents);
  
    //     return deliveryDate;
    //   });
    // }


    orderHTML += `
      <div class="border">
        <section class="order__place-tot-id-section">
          <div class="order__placed-date">
            <span class="order__placed-txt">Order Placed:</span>
            <span>${orderDate}</span>
          </div>
          <div class="order__price">
            <span class="order__total-txt"></span>
            <span></span>
          </div>
          <div class="order__ID-wrapper">
            <div class="order__ID">
              <span class="order__ID-txt">Order ID:</span>
              <span>${orderItem.id}</span>
            </div>
          </div>
        </section>
    `;

    orderItem.products.forEach((item) => {
      const matchedProduct = getProduct(item.productId);
      // const deliveryDate = dayjs(item.estimatedDeliveryTime).format('dddd, MMMM DD');

      orderHTML += `
        <div class="make">
          <div class="product-divider">
            <section class="order__product-details-section">
              <div class="order__product-section">
                <div class="order__product-image-cont">
                  <img class="order__product-card-image" src="${matchedProduct.image}" alt="">
                </div>

                <div class="order__product-details">
                  <h3>${matchedProduct.name}</h3>
                  <span></span>
                  <span>Quantity: ${item.quantity}</span>
                  <!-- <button class="order__product-details-btn">
                    <img class="order__product-details-btn-icon" src="images/order/buy-again-btn.png" alt="buy again icon">
                    <a href="index.html">Buy it again</a>
                  </button> -->
                </div>
              </div>

              <div class="order__track-pckg-wrapper">
                <a class="order__track-pckg" href="tracker.html?orderId=${orderItem.id}&productId=${matchedProduct.id}">
                  <button class="order__track-pckg-button">Track package</button>
                </a>
              </div>
            </section>
            <hr>
          </div>
        </div>
      </div>
      `;
    });
  });
  
  const container = document.querySelector('.js-order-summary');
  if (!container) {
    return;
  };
  container.innerHTML = orderHTML;
};
    
window.addEventListener('DOMContentLoaded', () => {
  renderOrders();
});

