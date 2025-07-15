import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // Get product details
        this.product = await this.dataSource.findProductById(this.productId);

        // Render to the page
        this.renderProductDetails();

        // Add click listener to "Add to Cart" button
        document.getElementById('addToCart')
          .addEventListener('click', this.addProductToCart.bind(this));
    }

    // add to cart button event handler
    // async function addToCartHandler(e) {
    //     const product = await dataSource.findProductById(e.target.dataset.id);
    //     addProductToCart(product);
    // } esto estaba en product.js, pero lo movi a ProductDetails.mjs

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart");
        if (!Array.isArray(cartItems)) {
            cartItems = [];
        } // ensure cartItems is always an array
        cartItems.push(this.product);   //Aca utilizo this en vez de product solo, y asi evitarme agregar (product) como entrada 
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//     document.querySelector('h2').textContent = product.Brand.Name;
//     document.querySelector('h3').textContent = product.NameWithoutBrand;

//     const productImage = document.getElementById('productImage');
//     productImage.src = product.Image;
//     productImage.alt = product.NameWithoutBrand;

//     document.getElementById('productPrice').textContent = product.FinalPrice;
//     document.getElementById('productColor').textContent = product.Colors[0].ColorName;
//     document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

//     document.getElementById('addToCart').dataset.id = product.Id;
// }