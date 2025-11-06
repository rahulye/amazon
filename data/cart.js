import renderPaymentSummary from "../scripts/checkout/paymentSummary.js";

export let cart = JSON.parse(localStorage.getItem('cart') || 'null') || [
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionsId : '1'
  },
  {
    productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
    quantity: 4,
    deliveryOptionsId : '3'
  }
];

// common for amazon.js, checkout.js, paymentSummary.js

export function totalCartQuantity() {
  let cartQuantity = 0;
  cart.forEach( (cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
};



// amazon.js

/*--------product added already ?-------*/

export function addToCart(productId) {
  let matchedItem;
      // check cart, if doesnt have assign the variable matched 
  cart.forEach( (item) => {
    if(productId === item.productId) {
      matchedItem = item;
    }
  });
      /*----- based on cart quantity <select> ------*/
  const selectorElement = document.querySelector(`.js-product-quantity-selector-${productId}`);
  const quantity = Number(selectorElement.value);   
          // this is new quantity why same name cuz we will add this in end to display in cart quantity so we have to have same name
      // if matchede as valye in if(matchedItem) becomes truthy so quantity increases by 1
  if(matchedItem) {
    matchedItem.quantity += quantity;
  } else {
    cart.push({
      productId,            //productId: productId,
      quantity,
      deliveryOptionsId : '2'              //quantity: quantity
    });
  }
  totalCartQuantity();
  saveToStorage();
};




// checkout.js

export function deleteCart(productId) {

  // const newCart = [];
  // cart.forEach( (cartItem) => { 
  //   if(cartItem.productId !== productId) {
  //     newCart.push(cartItem);
  //   };
  // });
  // cart = newCart;

  // totalCartQuantity();
  // saveToStorage();

  const index = cart.findIndex( (item) => {
    return item.productId === productId;   // return --> the index of the product in the cart || -1
  });
  if(index!==-1) {
    cart.splice(index,1);
  };
  totalCartQuantity();
  renderPaymentSummary();
  saveToStorage();
}

// update cart page after the delivery options selected by user
export function updateCartPage( productId , deliveryOptionsId ) {
  let matchedProduct;
  cart.forEach( (cartItem) => {
    if( cartItem.productId === productId) {
      matchedProduct = cartItem;
    }
  });
  matchedProduct.deliveryOptionsId = deliveryOptionsId;
  saveToStorage();
};



// localStorage
export function saveToStorage() {
  localStorage.setItem( 'cart' , JSON.stringify(cart));
  localStorage.setItem( 'totalCartQuantity' , JSON.stringify(totalCartQuantity()));
};


// load cart from backend 

// -------CALLBACk-----
// export function loadCart(funct) {
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener( 'load' , () => {
//     console.log(xhr.response);
//     funct();
//   });
//   xhr.open('GET' , 'https://supersimplebackend.dev/cart');
//   xhr.send();
// };

// -------FETCH------

// export function loadCartFetch(value) {
//   const promise = fetch('https://supersimplebackend.dev/cart')
//   .then( (response) => {
//     return response;
//   })
//   .then( () => {
//     console.log('load cart');
//     return value;  // these returns of value go to (.then)
//   });
//   return promise;  
// };

// loadCartFetch().then( (value) => {
//   console.log('next step Cart');
//   return value;
// });


//  TUTORIAL ANSWER


// -------CALLBACk-----

export function loadCart(funct) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener( 'load' , () => {
    console.log(xhr.response);
    funct();
  });
  xhr.open('GET' , 'https://supersimplebackend.dev/cart');
  xhr.send();
};