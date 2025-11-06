import renderCheckoutHeader from './checkout/checkoutHeader.js';
import renderProductOrderSummary from './checkout/productSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';



// --------CALL BACK--------

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


// loadProducts( () => {
//    renderCheckoutHeader();
//    renderProductOrderSummary();
//    renderPaymentSummary(); 
// });
  







// --------PROMISES--------

// new Promise( (resolve) => {    
//   loadProducts( () => {
//     resolve(); 
//   });
// }).then( () => {
//   renderCheckoutHeader();
//   renderProductOrderSummary();
//   renderPaymentSummary();
// });



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

// Promise.all([                //   execute and wait from loadproducts to finish it then go to resolve loadcart once evey thing is finished only move to next (.then)
//   new Promise( (resolve) => {
//     loadProducts( () => {
//       resolve('value1');   // we can give values to print work for both promise and promies all 
//     });
//   }),
//   new Promise( (resolve) => {
//     loadCart( () => {
//       resolve();
//     });
//   })

// ]).then( (value) => {
//   console.log(value);
//   renderCheckoutHeader();
//   renderProductOrderSummary();
//   renderPaymentSummary();
// });











//    --------FETCH----- 

//now instead calling the promise in more line we can call it by the function name
// same program for promise above (2) but we calling it by using fetch

// Promise.all([
//   loadProductsFetch('value1'),
//   new Promise( (resolve) => {
//     loadCart( () => {
//       resolve();
//     });
//   })

// ]).then( (value) => {
//   console.log(value);
//   renderCheckoutHeader();
//   renderProductOrderSummary();
//   renderPaymentSummary();
// });







//    ---------- AYSNC AWAIT --------


// async function loadPage() {  
//   await loadProductsFetch()    
//   return 'value1';              only runs after the promise got from loadProductsFetch()
// };  
  


// same program for promise above (fetch i mean) but we calling it by using async await

// async function loadPage() {
//   const promise1 = loadProductsFetch('value1');
//   const promise2 = loadCartFetch('value1');

//   const resultAsync = await Promise.all([ promise1, promise2 ]);

//   console.log(resultAsync[0]);
//   console.log(resultAsync[1]);
// };

// loadPage();
              





// // ----- RUN BOTH -----
// async function loadPage() {
//   // Step 1: run both in parallel
//   const promise1 = loadProductsFetch('value1');

//   const promise2 = loadCartFetch('value2');

//   // Step 2: wait for both to finish
//   const values = await Promise.all([promise1, promise2]);

//   // Step 3: print the final values
//   console.log(values[0]); // value1
//   console.log(values[1]); // value2
// }

// loadPage();



//  TUTORIAL ANSWER

async function loadPage() {  
  // console.log('load page'); 

  // for product
  await loadProductsFetch();    // equal to -->  .then( ()=> { return loadProductsFetch()})
  
  // for cart
  await new Promise( (resolve) => {
    loadCart( () => {
      resolve();
    });
  });

  renderCheckoutHeader();
  renderProductOrderSummary();
  renderPaymentSummary();
};  

loadPage();
  