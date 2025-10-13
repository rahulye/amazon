let productsHTML = '';

products.forEach( (product) => {

  productsHTML += `
    <article class="hero-section__product-card">
        
        <div class="hero-section__product-card-image-cont">
          <img class="hero-section__product-card-image" src="${product.image}" alt="Product-Image">
        </div>
        <h2 class="hero-section__product-card-text">${product.name}</h2>
        
        <div class="hero-section__product-card-rating-box">
          <img class="hero-section__product-card-rating-image" src="images/main/product-rating-stars/rating-${product.rating.stars * 10}.png" alt="Product-Ratings-Imgae">
          <div class="hero-section__product-card-rating-count">${product.rating.count}</div>
        </div>

        <span class="hero-section__product-card-price">$${(product.priceCents / 100).toFixed(2)}</span>
        
        <select class="hero-section__product-card-quantity">
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
        <button class="hero-section__product-card-add-btn js-product-card-add-btn" data-product-id = "${product.id}">Add to Cart</button>
      
      </article>
  `
})

document.querySelector('.js-hero-section__wrapper').innerHTML = productsHTML;

document.querySelectorAll('.js-product-card-add-btn').forEach( (button) => {
  button.addEventListener( 'click' , () => {
    const productId = button.dataset.productId;

    //----product added already ?-----

    let matchedItem;

            // check cart, if doesnt have assign the variable matched 
    cart.forEach( (item) => {
      if(productId === item.productId) {
        matchedItem = item;
      }
    });

           // if matchede as valye in if(matchedItem) becomes truthy so quantity increases by 1
    if(matchedItem) {
      matchedItem.quantity++;
    } else {
      cart.push({
        productId : productId,
        quantity : 1
      });
    }

    console.log(cart);
  })
});