import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";


export default function renderPaymentSummary() {
  let productPriceCents = 0;
  let productShippingPriceCents = 0;
  
  cart.forEach( (cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    
    const deliveryOptionID = getDeliveryOption(cartItem);
    productShippingPriceCents += deliveryOptionID.priceCents;
  });
  console.log(productPriceCents);
  console.log(productShippingPriceCents);
};
