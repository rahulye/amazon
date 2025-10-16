export const cart = [
  {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 2 
  },
  {
    productId : '3ebe75dc-64d2-4137-8860-1f5a963e534b',
    quantity : 1 
  },

];

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
      quantity              //quantity: quantity
    });
  }
};