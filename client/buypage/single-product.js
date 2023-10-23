// Header Search box controll
const searchBox = document.getElementById("search-box");
const searchIcon = document.querySelector(".search-icon-container");
const flipkartTitleContainer = document.querySelector(".nav-title-container");
const cartProfileContainer = document.querySelector(".cart-profile-container");

searchIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the body
    if (window.innerWidth < 768) {
        searchBox.style.width = "80vw";
        flipkartTitleContainer.style.display = "none";
        cartProfileContainer.style.display = "none";
    }
});

// Add a click event listener to the body or another container
document.body.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        searchBox.style.width = "0";
        flipkartTitleContainer.style.display = "block";
        cartProfileContainer.style.display = "flex";
    }
});

// Prevent clicks inside the search box from closing it
searchBox.addEventListener("click", (e) => {
    e.stopPropagation();
});

window.addEventListener("resize", () => {
    flipkartTitleContainer.style.display = "block";
    cartProfileContainer.style.display = "flex";
    if (window.innerWidth > 768) {
        searchBox.style.width = "30vw";
    } else {
        searchBox.style.width = "0";
    }
});

// Products
const productId = new URLSearchParams(window.location.search).get('id');

document.addEventListener('DOMContentLoaded', getProduct);

async function getProduct() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        displayProduct(product);
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayProduct(product) {
    const productImg = document.getElementById('product-img');
    const productTitle = document.getElementById('product-title');
    const rating = document.getElementById('rating');
    const ratingCount = document.getElementById('rating-count');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');

    productImg.src = product.image;
    productTitle.textContent = product.title;
    productPrice.textContent = `Price: $ ${product.price}`;
    productDescription.textContent = product.description;
    rating.textContent = product?.rating.rate;
    ratingCount.textContent = `${product.rating.count} Rating`;
}

// Wishlist
const wishlistHeart = document.getElementById("wishlist");
wishlistHeart.onclick = () => {

    if (wishlistHeart.classList.contains("fa-regular")) {
        wishlistHeart.classList.add("fa-solid");
        wishlistHeart.classList.remove("fa-regular");
        wishlistHeart.style.color = "#ff0000";
    } else {
        wishlistHeart.classList.add("fa-regular");
        wishlistHeart.classList.remove("fa-solid");
        wishlistHeart.style.color = "#b6b6b6";
    }
}

