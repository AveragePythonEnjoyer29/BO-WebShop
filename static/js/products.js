/* ik haat javascript met heel mn hart */

const products = document.getElementById("products");
const button = document.getElementById("button--filter");
const main = document.querySelector("main");

let toggle_full = false;

function display(num) {
    let display_mode = toggle_full ? "block" : "none";

    document.getElementById(`product--full-${num}`).style.display = toggle_full ? "none" : "block";

    const products_full = document.getElementsByClassName("product--item");
    for(let i = 0; i < products_full.length; i++){
        products_full[i].style.display = display_mode;
    }

    button.style.display = display_mode;

    toggle_full = !toggle_full;
}

fetch("/static/data/products.json")
.then(function (response) { return response.json(); })
.then(function(json) {
    for (let i = 0; i < json.length; i++) {

        let data = json[i];

        let li = document.createElement("li");
        li.setAttribute("class", "product--item");
        li.setAttribute("product", data.type);
        li.setAttribute("onclick", `display(${i})`);

        li.innerHTML = `
        <img src="${data.img[0]}" alt="product afbeelding" class="product--img">
        <p class="product--name">${data.name}</p>
        <div>
            <p class="product--price">€ ${data.price}</p>
            ${data.in_stock ? "" : `<p class="product--no-stock">Out of stock.</p>`}
            ${data.is_ad ? `<p class="product--advertisement">Advertisement</p>` : ""}
        </div>`;

        let div = document.createElement("div");
        div.setAttribute("class", "product--full");
        div.setAttribute("id", `product--full-${i}`);
        div.innerHTML = `
        <ul class="product--grid">

            <li class="product--backbutton">
                <button onclick="display(${i})" class="product--goback"><</button>
            </li>

            <li class="product--img-box">
                <img src="${data.img[0]}" class="product--img-full" id="product--img-${i}">
            </li>

            <li class="product--text-box">
                <h1>${data.name}</h1>
                <p>${data.description}</p>
            </li>

            <li class="product--buttons">
                <button class="button" id="gallery${i}">1</button>
                <button class="button" id="gallery${i}">2</button>
                <button class="button" id="gallery${i}">3</button>
            </li>
        </ul>
        `;

        main.append(div)
        products.append(li);

        const gallery_buttons = document.querySelectorAll(`#gallery${i}`);
        for (let iter = 0; iter < gallery_buttons.length; iter++) {
            const button = gallery_buttons[iter];

            button.onclick = function() {
                document.getElementById(`product--img-${i}`).setAttribute("src", data.img[iter]);
            }
        }
    }
});

let toggle = true;
button.onclick = function() {
    let all = document.getElementsByClassName("product--item");
    for (let i = 0; i < all.length; i++) {

        if (all[i].getAttribute("product") != "laptop") {
            all[i].style.display = toggle ? "none" : "block";
        }
    }

    toggle = !toggle;
}