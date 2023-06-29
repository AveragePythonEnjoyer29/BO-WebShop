/* ik haat javascript met heel mn hart */

const products = document.getElementById("products");
const filters = document.getElementById("checkboxes");
const main = document.querySelector("main");
const toggle_desktops = document.getElementById("checkbox--desktops");
const toggle_laptops = document.getElementById("checkbox--laptops");
const toggle_accesoires = document.getElementById("checkbox--accesoires");

toggle_desktops.checked = true;
toggle_laptops.checked = true;
toggle_accesoires.checked = true;

let toggle_full = false;

function displayAlert(num) {
    const alert_obj = document.getElementById(`alert--${num}`);

    // display
    alert_obj.style.display = "flex";

    // hide after 2 seconds
    setTimeout(
	    function() { alert_obj.style.display = "none"; },
	    2000
    )
}

function display(num) {
    let display_mode = toggle_full ? "block" : "none";

    document.getElementById(`product--full-${num}`).style.display = toggle_full ? "none" : "block";

    const products_full = document.getElementsByClassName("product--item");
    for(let i = 0; i < products_full.length; i++){
        products_full[i].style.display = display_mode;
    }

    checkboxes.style.display = display_mode;

    // reset everything incase
    toggle_desktops.checked = true;
    toggle_laptops.checked = true;
    toggle_accesoires.checked = true;

    toggle_full = !toggle_full;
}

fetch("static/data/products.json")
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

	console.log(`alert--${i}`);

        let div = document.createElement("div");
        div.setAttribute("class", "product--full");
        div.setAttribute("id", `product--full-${i}`);
        div.innerHTML = `
        <ul class="product--grid">

            <div class="alert--popup" id="alert--${i}">
	    	&#10003; Item added to cart
            </div>

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

            <li class="product--buttons-cart">
                <button class="button--add2cart", onclick="displayAlert(${i})">
                    Add to cart
                </button>
            </li>

            <li class="product--buttons-gallery">
                <button class="button" id="gallery${i}">1</button>
                <button class="button" id="gallery${i}">2</button>
                <button class="button" id="gallery${i}">3</button>
            </li>
        </ul>
        `;

        main.append(div)
        products.append(li);

	const alert = document.getElementById(`alert--${i}`)
	alert.style.display = "none"; // hide it
	alert.style.height = "17rem";
	alert.style.width = "30rem";
	alert.style.position = "fixed";
	alert.style.top = "20%";
	alert.style.justifyContent = "center";
	alert.style.alignItems = "center";
	alert.style.background = "#FFFFFF";
	alert.style.boxshadow = "0 0 5rem 0 rgba(0, 0, 0, .3)";
	alert.style.color = "green";
	alert.style.fontSize = "130%";
	alert.style.fontWeight = "400";
	alert.style.borderRadius = ".5rem";

        const gallery_buttons = document.querySelectorAll(`#gallery${i}`);
        for (let iter = 0; iter < gallery_buttons.length; iter++) {
            const button = gallery_buttons[iter];

            button.onclick = function() {
                document.getElementById(`product--img-${i}`).setAttribute("src", data.img[iter]);
            }
        }
    }
});

toggle_desktops.onchange = function(){

    const all = document.getElementsByClassName("product--item");
    for(let i = 0; i < all.length; i++){
        if(all[i].getAttribute("product") == "desktop"){    
            all[i].style.display = toggle_desktops.checked ? "block" : "none";
        }
    }
}

toggle_laptops.onchange = function(){

    const all = document.getElementsByClassName("product--item");
    for(let i = 0; i < all.length; i++){
        if(all[i].getAttribute("product") == "laptop"){    
            all[i].style.display = toggle_laptops.checked ? "block" : "none";
        }
    }
}

toggle_accesoires.onchange = function(){

    const all = document.getElementsByClassName("product--item");
    for(let i = 0; i < all.length; i++){
        if(all[i].getAttribute("product") == "accesoires"){    
            all[i].style.display = toggle_accesoires.checked ? "block" : "none";
        }
    }
}
