let shoppingcart = {
    "price": 0.0,
    "items": {}
}

function add_shoppingcart(name, item) {

    // add new item
    shoppingcart["items"][name] = item;

    // update price
    shoppingcart["price"] += item["price"];
}

function del_shoppingcart(name) {

    if (name in shoppingcart.items) {
        // update price
        shoppingcart["price"] -= shoppingcart["items"][name]["price"];

        // remove item
        delete shoppingcart[name];
    }
}