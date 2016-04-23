/*
 * Models
 */


var MenuModel = function ( pizza_list ) {
    this.pizzas = pizza_list;
    return this;
};

MenuModel.init = function ( menu_data ) {
	pizza_list = [];
	menu_data.forEach(function(element, index) {
	  pizza_list.push( PizzaModel.init(element) );
	});

    var model = new MenuModel(pizza_list);
    return model;
};

MenuModel.prototype.find_pizza = function(id) {
  	return this.pizzas[parseInt(id)-1];
};


var PizzaModel = function ( attributes, ingredients_list ) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.ingredients = ingredients_list;
    this.price = attributes.price;
    return this;
};

PizzaModel.init = function ( pizza_data ) {
	ingredients_list = [];
	pizza_data.ingredients.forEach(function(element, index) {
	  	ingredients_list.push( IngredientModel.find(element) );
	});

    var model = new PizzaModel(pizza_data, ingredients_list);
    return model;
};

PizzaModel.prototype.get_ingredients = function() {
	ingr = '';
	this.ingredients.forEach(function(element, index) {
	  	ingr = ingr +  element.label + ', ';   
	});
  	return ingr;
};


var IngredientModel = function ( attributes ) {
    this.id = attributes.id;
    this.label = attributes.label;
    this.price = attributes.price;
    return this;
};

IngredientModel.find = function ( id ) {
    return ingredients[parseInt(id)-1];
};


var EntryModel = function (pizza, quantity) {
	this.id = pizza.id
    this.pizza_name = pizza.name;
    this.quantity = parseInt(quantity);
    this.pizza_price = pizza.price;
    return this;
};


var BasketModel = function () {
    this.entries = {};
    this.summary = 0;
    this.size = 0;
    return this;
};

BasketModel.prototype.get_entries_list = function() {
	entries = this.entries;
	list = [];
	for (var key in entries) {
	  if (entries.hasOwnProperty(key)) {
		list.push(entries[key]);
	  }
	}
  	return list;
};

BasketModel.prototype.add_entry = function(pizza, quantity) {
	if (this.entries.hasOwnProperty(pizza.id)) {
		entry = this.entries[pizza.id];
		entry.quantity =  entry.quantity + parseInt(quantity);
	}
	else {
		entry = new EntryModel(pizza, quantity);
		this.entries[entry.id] = entry;
	}
  	return this.entries;
};

BasketModel.prototype.update_summary = function() {
	entries = this.entries;
	sum = 0;

	for (var key in entries) {
	  if (entries.hasOwnProperty(key)) {
		quantity = parseInt(entries[key].quantity), price = parseFloat(entries[key].pizza_price);
		sum = sum + quantity*price;
	  }
	}
	this.summary = sum.toFixed(1);
	this.size = Object.keys(this.entries).length;
  	return this.summary;
};

