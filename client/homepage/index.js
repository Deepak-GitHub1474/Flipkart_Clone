const productContainer = document.querySelector(".product-container");
const cartCount = document.getElementById("cart-count");
const searchBox = document.getElementById("search-box");
const searchIcon = document.querySelector(".search-icon-container");
const flipkartTitleContainer = document.querySelector(".nav-title-container");
const cartProfileContainer = document.querySelector(".cart-profile-container");
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

// Storing product in local storage for cart functionality
const cart = [];

// Fetching the product from fakestoreapi
async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.log("Error:", error);
    }
}

getProducts();

// Displaying the each product retrive from fakestoreapi
function displayProducts(products) {

    products.forEach(product => {
        const productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
}

// Appending the all product and additional element to productContainer
function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.addEventListener("click", () => openSingleProductPage(product.id));
    productElement.appendChild(imageElement);

    const titleElement = document.createElement("p");
    titleElement.textContent = product.title;
    productElement.appendChild(titleElement);
    titleElement.classList.add("product-title");

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price}`;
    productElement.appendChild(priceElement);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.addEventListener("click", () => {
        const productWithQuantity = { ...product, quantity: 1 };
        addToCart(productWithQuantity);
    });

    productElement.appendChild(addToCartButton);

    return productElement;
}

// Opening the buy page on click over image container
function openSingleProductPage(productId) {
    localStorage.setItem("productId", productId); // Store product ID in LocalStorage
    window.location.href = `../buypage/single-product.html?id=${productId}`; // Navigate to single product page
}

// Adding the item in cart to render in cart page 
function addToCart(product) {
    // Retrieve existing cart items from LocalStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = existingCart.find(item => item.id === product.id);

    if (existingProduct) {
        // If the product exists, update its quantity
        // existingProduct.quantity = 1;
        alert("item is already saved in cart")
    } else {
        // If the product doesn"t exist, add it to the cart
        product.quantity = 1;
        existingCart.push(product);
    }

    // Save the updated cart back to LocalStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    updateCartCount();
}

// Updating the total number of item avilable in cart and show on home page
function updateCartCount() {
    // Retrieve existing cart items from LocalStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the total quantity of items in the cart
    const totalQuantity = existingCart.length;

    // Update the cart count in the HTML
    cartCount.textContent = totalQuantity;
}

// Calling the updateCartCount so that even the page reload or navigate the total count of cart item remain same
updateCartCount();

// Cart Window
cartCount.onclick = () => {
    window.location.href = "../cartpage/cart.html"
}

// Search Item

document.addEventListener("DOMContentLoaded", () => {

    // Retrieve the search query from the URL parameter
    const searchQuery = new URLSearchParams(window.location.search).get("searchQuery");

    if (searchQuery) {
        searchBox.value = searchQuery;
        getProductByCategory(searchQuery); // Perform the search immediately
    }
});

async function getProductByCategory(searchQuery) {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        // Filter products based on partial category match
        const filteredProducts = products.filter(product => {
            return product.category.toLowerCase().includes(searchQuery);
        });

        displayProductByCategory(filteredProducts);
    } catch (error) {
        console.log("Error:", error);
    }
}

function displayProductByCategory(products) {
    productContainer.innerHTML = ""; // Clear previous search results

    products.forEach((product) => {
        const productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
}

// product Search
searchIcon.addEventListener("click", () => {
    const searchQuery = searchBox.value.trim().toLowerCase();

    if (searchQuery.length > 0) {
        getProductByCategory(searchQuery);
    }
});

// Reload the product when the search box is empty
searchBox.addEventListener("input", () => {
    const searchQuery = searchBox.value.trim();
    if (searchQuery.length < 1) {
        window.location.href = "../homepage/index.html";
    }
});

/* 
Initial products display (without search query to show popular products, 
for example--> electronics or keep empty to show all product) 

getProductByCategory("electronics");
*/


// ----------------------- Under Impletation ---------------------------//

const category = document.querySelectorAll(".item-collection-div")

category.forEach((element) => {
    element.addEventListener("click", () => {
        alert("Under Implementation!");
    });
});

// <======================= Backend Request =======================> //

// GET request to protected route
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