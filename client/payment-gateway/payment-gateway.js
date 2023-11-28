const modal = document.getElementById("modal");
const checkoutBtn = document.getElementById("checkout-btn");
const closeBtn = document.getElementById("closeBtn");
const conntainer = document.querySelector(".container");
const form = document.querySelector(".form");
const ring = document.querySelector(".ring");
const costConntainer = document.querySelector(".cost-container");
const payBtn = document.getElementById("pay-btn");
const validationMsg = document.getElementById("validation-msg");

// UserData
let userData = {};

// Form Validation
function userInputs() {
    const userName = document.getElementById("username").value;
    const userEmail = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const pincode = document.getElementById("pincode").value;
    const cardHolderName = document.getElementById("card-holder-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expMonth = document.getElementById("exp-month").value;
    const expYear = document.getElementById("exp-year").value;
    const cvv = document.getElementById("cvv").value;

    // Name Input Field Validation
    if (userName.length > 3 && userName.length < 20) {
        userData.username = userName;
    } else {
        validationMsg.textContent = "Name is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Email Input Field Validation
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._]*@[a-zA-Z0-9]+\.(com|in)$/i;

    if (emailRegex.test(email.value)) {
        userData.email = userEmail.toLowerCase();
    } else {
        validationMsg.textContent = "Email is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Adress Input Field Validation
    if (address.length > 5 && address.length < 40) {
        userData.address = address;
    } else {
        validationMsg.textContent = "Enter full address!";
        validationMsg.style.display = "block";
        return;
    }

    // City Input Field Validation
    if (city.length > 2 && city.length < 20) {
        userData.city = city;
    } else {
        validationMsg.textContent = "City name is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // State Input Field Validation
    if (state.length > 2 && state.length < 20) {
        userData.state = state;
    } else {
        validationMsg.textContent = "State name is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Pincode Input Field Validation
    if (pincode.length === 6) {
        userData.pincode = pincode;
    } else {
        validationMsg.textContent = "Pincode is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Card Holder Name Input Field Validation
    if (cardHolderName.length > 3 && cardHolderName.length < 30) {
        cardHolderName.cardHolderName = cardHolderName;
    } else {
        validationMsg.textContent = "Card holder name is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Card Number Input Field Validation
    if (cardNumber.length === 16) {
        userData.cardNumber = cardNumber;
    } else {
        validationMsg.textContent = "CardNumber is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Card Exp Month Input Field Validation
    if (expMonth > 0 && expMonth <= 12) {
        userData.expMonth = expMonth;
    } else {
        validationMsg.textContent = "Exp month is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // Card Exp Year Input Field Validation
    if (expYear.length === 4 && expYear > 2023) {
        userData.expYear = expYear;
    } else {
        validationMsg.textContent = "Exp year is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    // CVV Number Input Field Validation
    if (cvv.length === 4) {
        userData.cvv = cvv;
    } else {
        validationMsg.textContent = "CVV is not valid!";
        validationMsg.style.display = "block";
        return;
    }

    return userData;
}

// Total Cost
let totalCartCost = 0;

checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const totalItems = document.getElementById("cart-all-items");
    const cartItemsPrice = document.getElementById("cart-items-price");
    const deliveryCharges = document.getElementById("delivery-charge");
    const totalCost = document.getElementById("total-cost");

    const userInfo = userInputs();
    console.log(userInfo);
    if (userInfo) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        conntainer.style.backgroundColor = "blue";
        form.style.display = "none";
        const cartItems = getCartItem();
        const cartItemsCost = cartItems.reduce((acc, cur) => acc + Math.floor(cur.price), 0);
        const deliveryCharge = cartItems.length > 0 ? 2 : 0;
        totalCartCost = cartItemsCost + deliveryCharge;

        setTimeout(() => {
            ring.style.display = "none";
            costConntainer.style.display = "block";
            totalItems.textContent = cartItems.length;
            cartItemsPrice.textContent = `${cartItemsCost}$`;
            deliveryCharges.textContent = `${deliveryCharge}$`;
            totalCost.innerHTML = `${totalCartCost}$`;
        }, 2000);
    }

});


// Pay
payBtn.addEventListener("click", () => {
    const successfullSymbol = document.getElementById("successfull-symbol");
    const successfullMsg = document.getElementById("payment-successfull-msg");

    costConntainer.style.display = "none";
    ring.style.display = "block";
    setTimeout(() => {
        successfullSymbol.style.display = "block";
        successfullMsg.style.display = "block";
    }, 2000);
})


closeBtn.addEventListener("click", () => {
    window.location.href = "../homepage/index.html"
});

// Get cart items from local storage
function getCartItem() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

