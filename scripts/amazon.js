import {cart, addToCart, totalCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';

loadProducts(loadProductsGrid);

function loadProductsGrid() {

  //search input
  document.querySelector('.js-search-btn').addEventListener( 'click' , (event) => {
    event.preventDefault(); // its a form--> so its automatically refresh when clicked it so we use this to prevent
    const productName = document.querySelector('.js-search-bar').value;
    window.location.href = `index.html?search=${productName}`;
  });

  // get the product name from the url and list it
  const url = new URL(window.location.href);
  let searcProduct = url.searchParams.get('search');
  let filterProduct = products;

  if(searcProduct) {
    searcProduct = searcProduct.toLowerCase();
    filterProduct = products.filter((product) => {
      return product.name.toLowerCase().includes(searcProduct) || product.keywords.includes(searcProduct);    //includes--> "iphone 15 pro".includes("pro") --> gives value = true
    });
  };
  if (filterProduct.length === 0) {
    alert(`No products found for "${searcProduct}"`);
    return;
  }


  let productsHTML = '';
  filterProduct.forEach( (product) => {
  
    productsHTML += `
      <article class="hero-section__product-card">
          
          <div class="hero-section__product-card-image-cont">
            <img class="hero-section__product-card-image" src="${product.image}" alt="Product-Image">
          </div>
          <h2 class="hero-section__product-card-text">  ${product.name} ${product.getsizeChart()}</h2>
          
          <div class="hero-section__product-card-rating-box">
            <img class="hero-section__product-card-rating-image" src=${product.getImageUrl()} alt="Product-Ratings-Imgae">
            <div class="hero-section__product-card-rating-count">${product.rating.count}</div>
          </div>
  
          <span class="hero-section__product-card-price">${product.getPriceUrl()}</span>
          
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
  
  //localstorage
  document.querySelector('.js-cart-count').innerHTML =  JSON.parse(localStorage.getItem('totalCartQuantity') || 'null') || totalCartQuantity();
  //above also works but this is straightforward and dont need to use thelocalstorage cuz we used the anove logic in cart[] we dont need to do it again in here 
  
  // document.querySelector('.js-cart-count').innerHTML =  totalCartQuantity();
  
  
  
  //added meesage
  // let addedMessageTimeout = {};
  document.querySelectorAll('.js-product-card-add-btn').forEach( (button) => {  
    button.addEventListener( 'click' , () => {
  
      const {productId} = button.dataset;   //const productId = button.dataset.productId;
      addToCart(productId);
      updateCart(productId);
  
    });    
  });
  
  
  /* add total cart quantity */
  function updateCart(productId) {
  
    document.querySelector('.js-cart-count').innerHTML =  totalCartQuantity()
    
    
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



// -------