var all_pizzas = [], ingredients = [], menu = null, basket = null, basket_controller = null,
    order_controller = null, info_controller = null;


$(document).ready(function(){
    home = new HomeController();
    home.loadView();
    info_controller = new InfoController();
    info_controller.set_data();
    basket = new BasketModel();
    basket_controller = new BasketController(basket);
    getIngredients();
});


function showMenu() {
    var URL = 'http://localhost:8080/menu';
    $.ajax({
        url: URL,
        error: function () {
            console.log('MENU ERROR');
        },
        success: function (data) {
            menu = MenuModel.init(data);
            var controller = new MenuController;
            controller.loadView(menu);
        }
    });
}


function homePage() {
    $('.container').hide();
    $('#home').show();
}


function getIngredients() {
    var URL = 'http://localhost:8080/ingredients';
    $.ajax({
        url: URL,
        error: function () {
            console.log('INGREDIENTS ERROR');
        },
        success: function (data) {
            for (i=0;i<data.length;i++) {
                ingredients.push( new IngredientModel(data[i]) )
            }
        }
    });
}

function createOrder() {
    order_controller = new OrderController(basket);
    order_controller.loadView();
}


function orderPreview() {
    $('#order').toggle();
    $('#order-preview').toggle();
}


function makeOrder() {
    order_controller.submitOrder();
}

function orderStatus(order_id) {
    order_controller.orderStatus(order_id);
}

function AlbumCtrl($scope,$timeout) {
    $scope.counter = 0;
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);

    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }
}
