const products = [ {
  image: 'images/main/product-image/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  },
  {
  image: 'images/main/product-image/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095,
  },
  {
  image: 'images/main/product-image/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 790,
  },
]

let productsHTML = '';

products.forEach( (product) => {

  productsHTML += `
    <article class="hero-section__product-card">
        
        <img class="hero-section__product-card-image" src="${product.image}" alt="Product-Image">
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
        <button class="hero-section__product-card-add-btn">Add to Cart</button>
      
      </article>
  `
})

document.querySelector('.js-hero-section__wrapper').innerHTML = productsHTML;