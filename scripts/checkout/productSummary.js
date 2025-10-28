// named export - curly{}
import { cart, deleteCart, saveToStorage, totalCartQuantity, updateCartPage } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import renderCheckoutHeader from './checkoutHeader.js';
import renderPaymentSummary from './paymentSummary.js';
// default export - no curly{}
import formatCurrency from '../utils/money.js';

// import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.11/esm/index.js'; ESM module aka-> JavaScript External library Modules 
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function renderProductOrderSummary() {

  // PRODUCT CART
  let checkoutHTML = '';
  cart.forEach( (cartItem) => {
    const productId = cartItem.productId;
    const matchedProduct = getProduct(productId);

    //DELIVEY DATE - we click the delivery options acccording to that date will change
    const matchedOption = getDeliveryOption(cartItem);
   
    const today = dayjs();
    const deliveryDate = today.add( matchedOption.inDeliveryDays , 'days' );  // syntax-->   dayjs().add(number, unit);
    const deliveryDateString = deliveryDate.format('dddd, MMMM DD');


    //to get the other details respect to cart 
    // products.forEach( (product) => {
    //   if(product.id === productId) {
    //     matchedProduct = product;
    //   }
    // });

    checkoutHTML += `

      <div class="checkout-cart-container__product-wrapper">
        
        <!----------- left section ---------->
        <h3 class="checkout-cart-container__left-heading">Delivery date: ${deliveryDateString}</h3>
        <section class="checkout-cart-container__left-cart-nd-delvery-cont">
          <section class="checkout-cart-container__left-cart-details">
            <div>
              <img class="checkout-cart-container__left-cart-details-img" src="${matchedProduct.image}" alt="Amazon logo">
            </div>
            <div class="checkout-cart-container__left-abt-product">
              <span class="checkout-cart-container__left-abt-product-text">${matchedProduct.name}</span>
              <span class="checkout-cart-container__left-abt-product-price-text">$${formatCurrency(matchedProduct.priceCents)}</span>
              <div class="checkout-cart-container__left-quant-upt-del" data-product-id="${matchedProduct.id}">
                <span class="js-quant-display">Quantity: ${cartItem.quantity}</span>
                <span class="btn js-update-link" data-product-id = "${matchedProduct.id}">Update</span>
                <input class="upt-input js-input-upt" type="number" value=${cartItem.quantity} min=1 max=50 data-product-id="${matchedProduct.id}">
                <span class="btn save-btn js-save-upt-link" data-product-id="${matchedProduct.id}">Save</span>
                <span class="btn js-delete-link" data-product-id="${matchedProduct.id}" >Delete</span>
              </div>
            </div>
          </section>
        
          <section class="checkout-cart-container__left-delivery">
            <div class="checkout-cart-container__left-delivery-heading">Choose a delivery option:</div>
            <form  class="js-select-option">
              ${generateOptions(matchedProduct,cartItem)}
            </form>
          </section>
        </section>

      </div>
    `;
  });
  document.querySelector('.js-checkout-cart-container__left-wrapper').innerHTML = checkoutHTML;

  //CHOOSE DELIVERY OPT
  function generateOptions(matchedProduct,cartItem) {
    let deliveryOptHTML = '';
    deliveryOptions.forEach( (options) => {
      const today = dayjs();
      const deliveryDate = today.add( options.inDeliveryDays , 'days' );  // syntax-->   dayjs().add(number, unit);
      const deliveryDateString = deliveryDate.format('dddd, MMMM DD');
      const priceCentsString =  options.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(options.priceCents)} - Shipping`;
      const ischecked = options.id === cartItem.deliveryOptionsId ? 'checked' : '';  
                                                                    // checked make selection  
      deliveryOptHTML += `
        <label>
          <input data-product-id = ${matchedProduct.id} data-delivery-options-id = ${options.id} type="radio" ${ischecked} name="delivery-option-${matchedProduct.id}">   
            <div>
              <span class="date">${deliveryDateString}</span>
              <span class="note">${priceCentsString}</span>
            </div>
        </label>
      `;
    });
    return deliveryOptHTML;
  };
  // update to html (make it interactive)
  document.querySelectorAll('.js-select-option input').forEach( (element) => {
    element.addEventListener( 'click' , () => {
      const { productId , deliveryOptionsId } = element.dataset;
      updateCartPage( productId , deliveryOptionsId );
                            // ------ redering MVC ----------- //
      renderProductOrderSummary();   
      renderPaymentSummary();
    });
  });

  //DELETE BTN
  document.querySelectorAll('.js-delete-link').forEach( (link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;  // const productId = link.dataset.productId; 
      //delete it
      deleteCart(productId);

      //update in HTML
      // const containerElement =  document.querySelector(`.js-product-wrapper-container-${productId}`);
      // containerElement.remove();
      renderProductOrderSummary(); 

      //updt total cart quantity
      //totalCartQuantityElement.innerHTML =  `${totalCartQuantity()} item${totalCartQuantity() > 1 ? 's' : ''}`;
      renderCheckoutHeader();
    });
  });

  //UPDATE BTN
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

    const handleEnter = (event) => { 
      if( event.key === 'Enter') {
        saveNewQuantity(productId);
        removeInputSave(productId);
        inputElement.removeEventListener('keydown', handleEnter);
      };
    };
  inputElement.addEventListener('keydown', handleEnter);   // event is automatically passed by the browser. no need to pass parameter
  };
  //-> to make them save and right after invisible 
  //to save first
  document.querySelectorAll('.js-save-upt-link').forEach( (link) => {
    link.addEventListener('click' , () => {
        const productId = link.dataset.productId;
        saveNewQuantity(productId); //1
        removeInputSave(productId); //2
        renderPaymentSummary();
        renderCheckoutHeader();
      });
  });
  function saveNewQuantity(productId) {
    const inputElement = document.querySelector(`.js-input-upt[data-product-id="${productId}"]`);
    const newQuantity = parseInt(inputElement.value);
    if(newQuantity<=0 || newQuantity>50) {
      alert('Quantity must be at least 1 and less than or equal to 50');
      return;
    };
    cart.forEach( (cartItem) => {
      if( productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
      }
      const containerElement = document.querySelector(`.checkout-cart-container__left-quant-upt-del[data-product-id="${productId}"]`);
      const quantDisplayElement = containerElement.querySelector('.js-quant-display');
      quantDisplayElement.textContent = `Quantity: ${newQuantity}`;
    });
    renderCheckoutHeader();
    saveToStorage();
  };
  // to remove second
  function removeInputSave(productId) {
    const saveElement = document.querySelector(`.js-save-upt-link[data-product-id="${productId}"]`);
    const inputElement = document.querySelector(`.js-input-upt[data-product-id="${productId}"]`);

    saveElement.classList.remove('visible');
    inputElement.classList.remove('visible');
  };
};

export default renderProductOrderSummary;