/*
 * View
 */

 var HomeView = function () {
    return this;
};

HomeView.prototype.render = function () {
    $(".container").hide();
    $("#home").show();
};


var MenuView = function (menu) {
    this.model = menu;
    return this;
};

MenuView.prototype.output = function () {
    var instance = this;
    output = "";
    pizzas = instance.model.pizzas;

    for (i=0; i<pizzas.length; i++) {
        pizza = pizzas[i];
        fn = 'basket_controller.addToBasket("' + pizza.id + '")';
        output = output + "<div id='pizza-" + pizza.id + "' class='panel panel-default'>\
            <div class='panel-heading name'><h2>" + pizza.name + "</h2></div>\
                <div class='panel-body ingredients'><p>Składniki: " + pizza.get_ingredients() + "</p></div>\
                <div class='panel-footer'>\
                    <div class='price'><b>Cena: " + pizza.price + " zł</b></div>\
                    <input type='number' name='quantity-" + pizza.id + "' min='1' value='1'>\
                    <button onclick='" + fn + "' type='button' class='btn btn-success'>Zamów</button>\
                </div>\
            </div>";
    }

    return output;
};

MenuView.prototype.render = function () {
    $(".container").hide();
    $("#menu").show();
    document.getElementById("menu-list").innerHTML = this.output();
};


var BasketView = function (basket) {
    this.model = basket;
    return this;
};

BasketView.prototype.update_total_price = function (price) {
    $('#price-navbar').html(price);
    $('#price-basket').html(price);
};

BasketView.prototype.output = function () {
    output = "";
    entries = this.model.entries;

    for (var key in entries) {
      if (entries.hasOwnProperty(key)) {
        entry = entries[key];
        output = output + "<div class='panel panel-default entry'>\
            <div class='panel-heading name'><h2>" + entry.pizza_name + "</h2></div>\
                <div class='panel-footer'>\
                    <div class='price'><b>Cena: " + entry.pizza_price + " zł</b></div>\
                    <div>Ilość: <input type='number' name='basket-quantity-" + entry.id + "' min='1' value='" + entry.quantity + "'></div>\
                </div>\
            </div>";
      }
    }
    if (this.model.size > 0) {
        output = output + "<div id='total-price'>Do zapłaty: <div id='price-basket'>" + this.model.summary + "</div> zł</div>\
            <button onclick='basket_controller.updateBasket()' type='button' class='basket-button btn btn-success'>Przelicz</button>\
            <button onclick='createOrder()' type='button' class='basket-button btn btn-success'>Złóż zamówienie</button>";
    }
    else { output = '<i>brak</i>'; }
    return output;
};

BasketView.prototype.render = function () {
    $(".container").hide();
    $("#basket").show();
    document.getElementById("basket-list").innerHTML = this.output();
};

var OrderView = function (basket) {
    this.model = basket;
    return this;
};

OrderView.prototype.output = function () {
    entries = this.model.entries;
    output = "";
    for (var key in entries) {
        if (entries.hasOwnProperty(key)) {
            entry = entries[key];
            output = output + "<div class='panel panel-default entry'>\
                <div class='panel-heading name'><h2>" + entry.pizza_name + "</h2></div>\
                    <div class='panel-footer'>\
                        <div class='price'><b>Cena: " + entry.pizza_price + " zł</b></div>\
                        <div>Ilość: " + entry.quantity + "</div>\
                    </div>\
                </div>";
        }
    }
    output = output + "<div id='total-price'>Do zapłaty: <div id='price-basket'>" + this.model.summary + "</div> zł</div>";
    return output;
};

OrderView.prototype.render = function () {
    $(".container").hide();
    $("#order").show();
    document.getElementById("resume").innerHTML = this.output();
    document.getElementById("resume2").innerHTML = this.output();
};


var InfoView = function () {
    this.name = null;
    this.address = null;
    this.phone = null;
    this.hours = null;
    return this;
};

InfoView.prototype.set_data = function (data) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.hours = data.hours;
    return this;
}

InfoView.prototype.output = function () {
    output = "<h3>" + this.name + "</h3>\
        <p>" + this.address.street + this.address.city + "</p>\
        <p>Nr telefonu: " + this.phone + "</p>\
        <p>Godziny otwarcia: " + this.hours + "</p>\
    ";
    return output;
}

InfoView.prototype.render = function () {
    $(".container").hide();
    $("#contact").show();
    document.getElementById("info").innerHTML = this.output();
};

