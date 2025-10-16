import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';

products.forEach( (product) => {

  productsHTML += `
    <article class="hero-section__product-card">
        
        <div class="hero-section__product-card-image-cont">
          <img class="hero-section__product-card-image" src="${product.image}" alt="Product-Image">
        </div>
        <h2 class="hero-section__product-card-text">${product.name}</h2>
        
        <div class="hero-section__product-card-rating-box">
          <img class="hero-section__product-card-rating-image" src="images/main/product-rating-stars/rating-${product.rating.stars * 10}.png" alt="Product-Ratings-Imgae">
          <div class="hero-section__product-card-rating-count">${product.rating.count}</div>
        </div>

        <span class="hero-section__product-card-price">$${(product.priceCents / 100).toFixed(2)}</span>
        
        <select class="hero-section__product-card-quantity js-product-quantity-selector-${product.id}">
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
        
        <div class="hero-section__product-card-added-cont js-product-added-${product.id}">
          <span>Added</span>
          <img class="hero-section__product-card-added-img" src="images/main/icons/checkmark.png" alt="Add-icon-image">
        </div>

        <button class="hero-section__product-card-add-btn js-product-card-add-btn" data-product-id = "${product.id}">Add to Cart</button>
      
      </article>
  `;
});

document.querySelector('.js-hero-section__wrapper').innerHTML = productsHTML;


// let addedMessageTimeout = {};

document.querySelectorAll('.js-product-card-add-btn').forEach( (button) => {  
  button.addEventListener( 'click' , () => {

    const {productId} = button.dataset;   //const productId = button.dataset.productId;
    addToCart(productId);
    updateCart();

  });    
});


/* add total cart quantity */

function updateCart() {
  let cartQuantity = 0;
  cart.forEach( (item) => {
    cartQuantity += item.quantity; 
  });
  document.querySelector('.js-cart-count').innerHTML = cartQuantity;
  
  console.log(cartQuantity);
  console.log(cart);

  /*----added message and also checks if the id arlready exist in the timeout object if it is we clear the timeout */
  const addedElement = document.querySelector(`.js-product-added-${productId}`);

  // if(addedMessageTimeout[productId]) {
  //   clearTimeout(addedMessageTimeout[productId]);
  // }
  
  addedElement.classList.add('product-added-visible');
  /*const setTimeoutID = */   setTimeout(() => {
      addedElement.classList.remove('product-added-visible');
    }, 2000);
  
  // addedMessageTimeout[productId] = setTimeoutID;
};









// code without comments of both add to cart and update cart 

// 

// document.querySelectorAll('.js-product-card-add-btn').forEach((button) => {
   
//   button.addEventListener('click', () => {
//     const { productId } = button.dataset;

//     let matchedItem;
//     cart.forEach((item) => {
//       if (productId === item.productId) {
//         matchedItem = item;
//       }
//     });

//     const selectorElement = document.querySelector(`.js-product-quantity-selector-${productId}`);
//     const quantity = Number(selectorElement.value);

//     if (matchedItem) {
//       matchedItem.quantity += quantity;
//     } else {
//       cart.push({
//         productId,
//         quantity,
//       });
//     }

//     let cartQuantity = 0;
//     cart.forEach((item) => {
//       cartQuantity += item.quantity;
//     });
//     document.querySelector('.js-cart-count').innerHTML = cartQuantity;

//     const addedElement = document.querySelector(`.js-product-added-${productId}`);

//     setTimeout( () => {
      
//       if(addedTimeOutExist) {
//         clearTimeout(addedMessageTimeout);
//       }
      
//       addedElement.classList.add('product-added-visible');
//       const setTimeoutID = setTimeout(() => {
//           addedElement.classList.remove('product-added-visible');
//         }, 2500);
//       addedMessageTimeout = setTimeoutID;
//      
//      });
//   });
// });



