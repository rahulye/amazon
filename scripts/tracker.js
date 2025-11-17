import { getProduct } from "../data/products.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");


const orderCart= JSON.parse(localStorage.getItem('orders')) || [];



const order = orderCart.find( (item) => {
  if( item.id==orderId ) {
    return item;
  }    
});

const product = order.products.find( (item) => {
  if( item.productId == productId ) {
    return item;
  }    
});

const productData = getProduct(product.productId);


document.querySelector('.tracker__product-name').innerHTML = productData.name;
document.querySelector('.tracker__product-image-cont').innerHTML = `<img class="tracker__product-image" src="${productData.image}" alt="Product-Image">`;
document.querySelector('.tracker__product-quantity').innerHTML = `<span class="tracker__product-quantity">Quantity: ${product.quantity}</span>`;
