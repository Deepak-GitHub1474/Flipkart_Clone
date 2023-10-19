// Routing to login page

const userData = async () => {
    try {
        const resp = await fetch("http://127.0.0.1:8000", {
            method: "GET",
            credentials: "include"
        })
        if (resp.status !== 200) {
            window.location.href = "http://127.0.0.1:5500/client/login/login.html"
        }
        const data = await resp.json()
        console.log(data)

    } catch (error) {
        window.location.href = "http://127.0.0.1:5500/client/login/login.html"
    }
}

userData()

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
    const productImgContainer = document.getElementById('product-img-container');
    const productContainer = document.getElementById('product-tittle-price-btn-container');
    productImgContainer.innerHTML = '';
    const imageElement = document.createElement('img');
    imageElement.src = product.image;
    imageElement.classList.add('product-image');
    productImgContainer.appendChild(imageElement);

    const titleElement = document.createElement('h2');
    titleElement.textContent = product.title;
    titleElement.classList.add('product-details');
    productContainer.appendChild(titleElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${product.price}`;
    priceElement.classList.add('product-price');
    productContainer.appendChild(priceElement);

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.classList.add('buy');
    productContainer.appendChild(buyButton);
}
