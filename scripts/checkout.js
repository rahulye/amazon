import renderCheckoutHeader from './checkout/checkoutHeader.js';
import renderProductOrderSummary from './checkout/productSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

// import '../learning/backend.js';

loadProducts( () => {
  renderCheckoutHeader();
  renderProductOrderSummary();
  renderPaymentSummary();
});

