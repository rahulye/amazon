// this file to save the orders 

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);   // make the order to store in front not in the back of the array 
  saveToStorage();
};

function saveToStorage() {
  localStorage.setItem( 'orders' , JSON.stringify(orders));
};


