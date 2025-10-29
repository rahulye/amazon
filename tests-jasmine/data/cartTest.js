import { addToCart, cart } from "../../data/cart.js";

describe( "Test suite : addToCart" , () => {

  it( "Add existed item to products array" , () => {
    addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect( cart.length.toEqual(1) );  
  });

});