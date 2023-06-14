let products = [];
let reviews = [];

/* Displays the products in a miniature field */
function display_product_mini(element, data) {

    element.innerHTML = `
    <div class="center">
        <img src="${data.img}" alt="product afbeelding" class="product--img">
        <p class="product--name">${data.name}</p>
        <div>
            <p class="product--price">${data.price},-</p>
            ${data.in_stock ? "" : `<p class="product--no-stock">Out of stock!</p>`}
            ${data.is_ad ? `<p class="product--advertisement">Advertisement</p>` : ""}
        </div>
    </div>`;
}

function display_review(element, data) {
    element.innerHTML = `
    <h2 id="review--text">${data.text}</h2>
    <p id="review--stars">${data.stars}</p>
    <p id="review--name">${data.name}</p>
    `
}

// Fetch products from file
fetch("/static/data/products.json")
.then(function (response) { return response.json(); })
.then(function(json) {
    for (let i = 0; i < json.length; i++) {
        products[i] = json[i];
    }

    for (let i = 0; i < 4; i++) {
        const element = document.getElementById("card" + (i + 1));
        display_product_mini(element, products[i]);
    }
});

// Fetch reviews from file
/*
fetch("/static/data/reviews.json")
.then(function (response) { return response.json(); })
.then(function(json) {
    for (let i = 0; i < json.length; i++) {
        reviews[i] = json[i];
    }

    for (let i = 0; i < 1; i++) {
        const element = document.getElementById("review" + (i + 1));
        display_review(element, reviews[i]);
    }
});
*/