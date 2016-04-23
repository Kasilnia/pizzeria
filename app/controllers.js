/*
 * Controller
 */

 var HomeController = function () {
	this.view = new HomeView();
    return this;
};

HomeController.prototype.loadView = function () {
    this.view.render();
};


var MenuController = function () {
    return this;
};

MenuController.prototype.loadView = function ( menu ) {
    var view = new MenuView(menu);
    view.render();
};


var BasketController = function (basket) {
	this.basket = basket;
	this.view = new BasketView(this.basket);
    return this;
};

BasketController.prototype.loadView = function () {
    this.view.render();
};

BasketController.prototype.addToBasket = function ( id ) {
    name = "quantity-"+id;
    quantity = $('input[name=' + name + ']').val();
    pizza = menu.find_pizza(id);
    this.basket.add_entry(pizza, quantity);
    price = this.basket.update_summary();
    this.view.update_total_price(price);
};

BasketController.prototype.updateBasket = function () {
	basket = this.basket;
	$("#basket input").each( function(index) {
		id = this.name.replace("basket-quantity-", "");
		quantity = this.value;
		entry = basket.entries[id];
		entry.quantity = quantity;
	});

    price = this.basket.update_summary();
    this.view.update_total_price(price);
};

var OrderController = function (basket) {
	this.model = basket;
	this.view = new OrderView(this.model);
    return this;
};

OrderController.prototype.loadView = function () {
    this.view.render();
};

OrderController.prototype.submitOrder = function () { 
    var URL = '/order';
    order = basket.get_entries_list();
    phone = $("input[name='phone']").value;
    address = $("input[name='street']").value;
    remarks = $("textarea #remarks").value;

    postData = { 
        "order": order,
        "orderInfo":{ "phone": phone, "address": address, "remarks": remarks },
        "extras": []
    };

    $.ajax({
        url: URL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postData),
            error: function (data) {
                console.log('ORDER ERROR', data.response);
                $('.order-failed').show();
            },
            success: function (data) {
                console.log('ORDER APPROVED', data);
                orderStatus(data.id);
            }
    });
};

OrderController.prototype.orderStatus = function (order_id) {
    var URL = '/order/' + order_id;

    $.ajax({
        url: URL,
            error: function () {
                console.log('ORDER STATUS ERROR');

            },
            success: function (data) {
                console.log('ORDER STATUS OK', data);
                $('.container').hide();
                $('#order-status').show();

                var ordered_date = new Date(data.ordered);
                var estimated_date = new Date(data.estimated);
                var timeDiff = Math.abs(estimated_date.getTime() - ordered_date.getTime());
                var stop_date = new Date(new Date().getTime() + timeDiff);
                
                $('#defaultCountdown').countdown({until: stop_date});
                    setTimeout(function(){
                        $('#timer-msg').show();
                }, timeDiff );
            }
    });
};


var InfoController = function () {
	this.view = new InfoView();
    return this;
};

InfoController.prototype.set_data = function () {
	info_view = this.view;
	var URL = 'http://localhost:8080/contact';
    $.ajax({
        url: URL,
        error: function () {
            console.log('CONTACT ERROR');
        },
        success: function (data) {
            info_view.set_data(data);
        }
    });
    
};

InfoController.prototype.loadView = function () {
    this.view.render();
};



