const searchBox = document.getElementById("search-box");
const searchIcon = document.querySelector(".search-icon-container");
const flipkartTitleContainer = document.querySelector(".nav-title-container");
const cartProfileContainer = document.querySelector(".cart-profile-container");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const placeOrderButton = document.getElementById("place-order-btn");
const userName = document.getElementById('username');
const logout = document.getElementById("logout");

// Header Search box control
searchIcon.addEventListener("click", (e) => {

    const searchQuery = searchBox.value.trim().toLowerCase();

    if (searchQuery.length > 0) {
        // Create a URL with the search query as a parameter and navigate to the home page
        const searchURL = `../homepage/index.html?searchQuery=${searchQuery}`;
        window.location.href = searchURL;
    }

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

// Event Listener on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updatePriceDetails();
})

function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const emptyCartElements = document.getElementById("empty-cart-elements-container");
    // const pinContainer = document.querySelector(".pincode-container");

    // Retrieve cart items from LocalStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.forEach(product => {
        const cartItem = createCartItemElement(product);
        cartItemsContainer.appendChild(cartItem);
    });

    // Hide "PLACE ORDER" button and box-container-2 if cart is empty
    const boxContainer2 = document.querySelector(".cost-container-wrapper");

    if (cartItems.length === 0) {
        placeOrderButton.style.display = "none";
        boxContainer2.style.display = "none";
        // pinContainer.style.display = "none";
        emptyCartElements.style.display = "block";
    } else {
        placeOrderButton.style.display = "block";
        boxContainer2.style.display = "block";
        // pinContainer.style.display = "block";
        emptyCartElements.style.display = "none";
    }
}

// Creating Crat Elements Dynamically
function createCartItemElement(product) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-items");

    const cartQuantity = document.createElement("div");
    cartItem.appendChild(cartQuantity);
    cartQuantity.classList.add("cart-qunatity");

    const cartImgContainer = document.createElement("div");
    cartQuantity.appendChild(cartImgContainer);

    const itemImg = document.createElement("img");
    itemImg.src = product.image;
    cartImgContainer.appendChild(itemImg);
    itemImg.classList.add("item-img");

    const addQuantity = document.createElement("div");
    cartQuantity.appendChild(addQuantity);
    addQuantity.classList.add("add-quantity");

    const minus = document.createElement("div");
    minus.textContent = "-";
    addQuantity.appendChild(minus);
    minus.classList.add("minus");

    let quantityCount = document.createElement("h4");
    addQuantity.appendChild(quantityCount);
    quantityCount.textContent = product.quantity;
    quantityCount.classList.add("quantity");

    const plus = document.createElement("div");
    plus.textContent = "+";
    addQuantity.appendChild(plus);
    plus.classList.add("plus");

    // Attach event listeners to the plus and minus buttons
    minus.addEventListener("click", () => subtract());
    plus.addEventListener("click", () => add());

    function add() {
        // Increase the quantity in the cart item object
        product.quantity += 1;
        // Update the quantity displayed on the cart item
        quantityCount.textContent = product.quantity;

        // Update the cart item quantity in LocalStorage
        updateCartItemQuantity(product);
        // Recalculate the price details
        updatePriceDetails();
    }

    function subtract() {
        // Ensure the quantity doesn"t go below 0
        if (product.quantity > 1) {
            // Decrease the quantity in the cart item object
            product.quantity -= 1;
            // Update the quantity displayed on the cart item
            quantityCount.textContent = product.quantity;

            // Update the cart item quantity in LocalStorage
            updateCartItemQuantity(product);
            // Recalculate the price details
            updatePriceDetails();
        }
    }

    // Item Info Section
    const itemInfo = document.createElement("div");
    cartItem.appendChild(itemInfo);

    const titleElement = document.createElement("h3");
    titleElement.textContent = product.title;
    itemInfo.appendChild(titleElement);
    titleElement.classList.add("product-title");

    const size = document.createElement("h4");
    size.textContent = "Size: M";
    itemInfo.appendChild(size);
    size.classList.add("size");

    const seller = document.createElement("h4");
    seller.textContent = "Seller: Max Store";
    itemInfo.appendChild(seller);
    seller.classList.add("seller");

    const priceContainer = document.createElement("div");
    itemInfo.appendChild(priceContainer);
    priceContainer.classList.add("price-container");

    const price = document.createElement("h4");
    price.textContent = `$${Math.floor(product.price)}`;
    priceContainer.appendChild(price);
    price.classList.add("price");

    const offerApplied = document.createElement("span");
    offerApplied.textContent = "2 offers";
    priceContainer.appendChild(offerApplied);
    offerApplied.classList.add("offer-applied");

    const offerInfo = document.createElement("span");
    priceContainer.appendChild(offerInfo);
    offerInfo.textContent = "!";
    offerInfo.classList.add("offer-info");

    const removeItem = document.createElement("h3");
    removeItem.textContent = "REMOVE";
    itemInfo.appendChild(removeItem);
    removeItem.classList.add("remove-item");
    // Attaching event listener to the "REMOVE" tag to remove the product from cart
    removeItem.addEventListener("click", () => removeItemFromCart(product));

    const deliveryContainer = document.createElement("div");
    cartItem.appendChild(deliveryContainer);
    deliveryContainer.classList.add("deliver-container");

    const deliveryInfo = document.createElement("div");
    deliveryContainer.appendChild(deliveryInfo);
    deliveryInfo.classList.add("deliver-info");

    return cartItem;
}

function updateCartItemQuantity(updatedProduct) {
    // Retrieve existing cart items from LocalStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the index of the updated product in the cart
    const productIndex = cartItems.findIndex(item => item.id === updatedProduct.id);

    if (productIndex !== -1) {
        // Update the product quantity in the cart array
        cartItems[productIndex].quantity = updatedProduct.quantity;
        // Save the updated cart back to LocalStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }
}

function updatePriceDetails() {
    // Retrieve existing cart items from LocalStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(cartItems);
    // Calculate the total price and the number of items in the cart
    let totalPrice = 0;
    let totalItems = 0;

    cartItems.forEach(product => {
        totalPrice += Math.floor(product.price) * product.quantity;
        totalItems += product.quantity;
    });

    // Round the totalPrice to two decimal places
    totalPrice = totalPrice.toFixed(2);

    // Update the HTML elements with the calculated values
    const cartCountPlaceholder = document.getElementById("cart-count-placeholder");
    cartCountPlaceholder.textContent = totalItems;

    const cartTotalPricePlaceholder = document.getElementById("cart-total-price-placeholder");
    cartTotalPricePlaceholder.textContent = `$${totalPrice}`;

    const totalAmountPlaceholder = document.getElementById("total-amount-placeholder");
    const deliveryCharges = 2; // Assuming delivery charges are fixed at $40
    const totalAmount = (parseFloat(totalPrice) + deliveryCharges).toFixed(2);
    totalAmountPlaceholder.textContent = `$${totalAmount}`;
}

// Function to remove item from cart
function removeItemFromCart(productToRemove) {
    // Retrieve existing cart items from LocalStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the index of the product to remove in the cart array
    const productIndex = cartItems.findIndex(item => item.id === productToRemove.id);

    if (productIndex !== -1) {
        // Remove the product from the cart array
        cartItems.splice(productIndex, 1);

        // Save the updated cart back to LocalStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        location.reload();
    }
}


// Place Order
placeOrderButton.addEventListener("click", () => {
    localStorage.setItem("purchaseSource", "cart");
    window.open("../payment-gateway/payment-gateway.html", "_self")
})

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