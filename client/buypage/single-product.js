const searchBox = document.getElementById("search-box");
const searchIcon = document.querySelector(".search-icon-container");
const flipkartTitleContainer = document.querySelector(".nav-title-container");
const cartProfileContainer = document.querySelector(".cart-profile-container");
const buyBtn = document.querySelector(".buy-now-button");
const addToCartBtn = document.querySelector(".add-to-cart-button");
const cartCount = document.getElementById("cart-count");
const userName = document.getElementById('username');
const logout = document.getElementById("logout");

// Header Search box control
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

if (window.innerWidth < 1200) {
    window.addEventListener("resize", () => {
        if (window.innerWidth > 500) {
            flipkartTitleContainer.style.display = "block";
            cartProfileContainer.style.display = "flex";
        }
        if (window.innerWidth > 768) {
            searchBox.style.width = "30vw";
        } else {
            if (window.innerWidth > 500) {
                searchBox.style.width = "0";
            }
        }
    });
}

// Product Details
const productId = new URLSearchParams(window.location.search).get('id');

document.addEventListener('DOMContentLoaded', getProduct);

async function getProduct() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        displayProduct(product);

        addToCartBtn.addEventListener("click", () => {
            addToCart(product);
        });

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
    productPrice.textContent = `Price: $ ${Math.floor(product.price)}`;
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

// Adding the item to the cart
function addToCart(product) {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find(item => item.id === product.id);
    if (existingProduct) {
        // existingProduct.quantity = 1;
        alert("item is already saved in cart")
        // Or Redirect to the cart
    } else {
        product.quantity = 1;
        existingCart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    updateCartCount();
}

// Updating the total number of item avilable in cart and show on home page
function updateCartCount() {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = existingCart.length;
    cartCount.textContent = totalQuantity;
}
updateCartCount();


// Checkout
buyBtn.addEventListener("click", () => {
    window.location.href = "../payment-gateway/payment-gateway.html";
});

// <======================= Backend Request =======================> //

// Make a GET request to your protected route
fetch('http://127.0.0.1:8081/', { method: 'GET', credentials: 'include' })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            const user = data.user;
            const username = user.username;
            userName.textContent = username.charAt(0).toUpperCase() + username.slice(1);
        } else {
            // User is not authenticated, handle accordingly
            window.location.href = "../login/login.html";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Logout
logout.addEventListener("click", async () => {
    try {
        const response = await fetch("http://127.0.0.1:8081/logout", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (data.message === 'Logout successfully') {
            window.location.href = "../login/login.html";
        }
    } catch (error) {
        console.log(error);
    }
});