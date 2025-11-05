import renderCheckoutHeader from './checkout/checkoutHeader.js';
import renderProductOrderSummary from './checkout/productSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

// import '../learning/backend.js';

// new Promise( (resolve) => {       // const promise  = new.....
//   console.log('1.start promises');
//   loadProducts( () => {
//     console.log('3.finished loading');
//     resolve(); // when this executes it will move to the .then exectue steps under
//   });
// }).then( () => {
//   console.log('4.next step');
// });


// --------CALL BACK--------

// loadProducts( () => {
//    renderCheckoutHeader();
//    renderProductOrderSummary();
//    renderPaymentSummary(); 
// });
  


// --------PROMISES--------

new Promise( (resolve) => {    
  loadProducts( () => {
    resolve(); 
  });
}).then( () => {
  renderCheckoutHeader();
  renderProductOrderSummary();
  renderPaymentSummary();
});



//   1.to load cart from backend (supersimplebackend)  ---> go to cart.js and see the exxport loadCart funct then below steps..

// new Promise( (resolve) => {
//   loadProducts( () => {
//     resolve();
//   });

// }).then( () => {
//   loadCart( () => {
//     resolve();
//   });

// }).then( () => {
//   renderCheckoutHeader();
//   renderProductOrderSummary();
//   renderPaymentSummary();
// });

//   2.to load all promise at once then go to next (.then)

Promise.all([                //   execute and wait from loadproducts to finish it then go to resolve loadcart once evey thing is finished only move to next (.then)
  new Promise( (resolve) => {
    loadProducts( () => {
      resolve('value1');   // we can give values to print work for both promise and promies all 
    });
  }),
  new Promise( (resolve) => {
    loadCart( () => {
      resolve();
    });
  })

]).then( (value) => {
  console.log(value);
  renderCheckoutHeader();
  renderProductOrderSummary();
  renderPaymentSummary();
});





              