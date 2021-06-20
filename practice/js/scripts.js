let products = [];
let cart = [];


function getProducts() {
	return [
		{id: 1, name: 'Product 1', price: 10},
		{id: 2, name: 'Product 2', price: 14},
		{id: 4, name: 'Product 3', price: 31},
		{id: 14, name: 'Product 4', price: 2}
	]
}
function getProductTemplate(product) {
	return `
		<div class="col mb-5">
            <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.name}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <!-- Product price-->
                        $ ${product.price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                    <button class="btn btn-outline-dark mt-auto" onclick="addToCart(${product.id})">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
	`;
}


function getCartElements() {
    /* */
    const response = [];
    const storageData = localStorage.getItem('cart');
    if (storageData) {
        return JSON.parse(storageData);
    }
    return response;
}
function getCartElementTemplate(element) {
	return `
		<tr id="cleanTBody">
			<th scope="row">${element.id}</th>
			<td>${element.name}</td>
			<td id="elementCount">${getCartElementCount(element)}</td>
			<td>
                <div class="btn-group" role="group" aria-label="Basic mixed styles exemple">
                    <button type="button" class="btn btn-success" onclick="addElement(${element.id})">+</button>
                    <button type="button" class="btn btn-danger" onclick="removeElement(${element.id})">-</button>
                </div>
            </td>
			<td id="elementPrice">${element.price * getCartElementCount(element)}</td>
		</tr>
	`;
}
function addToCart(productId) {
    const selectedProduct = products.find(product => product.id === productId)

    if (selectedProduct) {
        cart.push(selectedProduct);
        /* */
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('cartCount').innerHTML = cart.length.toString();
}


function cleanCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify([]));

    /* Solving the problem with duplicate */
    document.getElementById('cleanTBody').style.display = "none";
    document.getElementById('cartCount').innerText = cart.length.toString();
}

function getCleanButtonTemplate() {
    return `<button type="button" class="btn btn-warning" onclick="cleanCart()">Clean</button>`;
}

function getCartElementCount(element) {
    /* */
    return cart.filter(element => element.id === products[0].id).length;
}

function populateTemplate() {
	let htmlResult = '';

    if (window.location.pathname.includes('index.html')) {
        products.forEach(product => {
            htmlResult += getProductTemplate(product)
        });

        document.getElementById('generalContent').innerHTML = htmlResult;
    }
    
    if (window.location.pathname.includes('cart.html')) {
        let pageCart = [];

        cart.forEach(element => {
            if (pageCart.findIndex(pageEl => pageEl.id === element.id) === -1) {
                pageCart.push(element);
            }
        });

        pageCart.forEach(element => {
            htmlResult += getCartElementTemplate(element)
        });

        document.querySelector('#generalContent table tbody').innerHTML = htmlResult;

        document.getElementById('generalContent').innerHTML += getCleanButtonTemplate();
    }
    
    document.getElementById('cartCount').innerText = cart.length.toString();
}


products = getProducts();
cart = getCartElements();


populateTemplate();


/* Function add and remove element to homework */
function addElement(productId) {
    const selectedProduct = products.find(product => product.id === productId)

    if (selectedProduct) {
        cart.push(selectedProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const id = ['cartCount', 'elementCount', 'elementPrice'];

    document.getElementById(id[0]).innerHTML = cart.length.toString();
    document.getElementById(id[1]).innerHTML = cart.length.toString();
    document.getElementById(id[2]).innerHTML = cart.length.toString() * selectedProduct.price;
}
function removeElement(productId) {
    const selectedProduct = products.find(product => product.id === productId)

    if (selectedProduct) {
        cart.splice(selectedProduct, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const id = ['cartCount', 'elementCount', 'elementPrice'];

    document.getElementById(id[0]).innerHTML = cart.length.toString();
    document.getElementById(id[1]).innerHTML = cart.length.toString();
    document.getElementById(id[2]).innerHTML = cart.length.toString() * selectedProduct.price;
}