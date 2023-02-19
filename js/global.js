let productsData = 
    [
        {
            id : 3,
            title : "ABMX Eien Xyzen 5 3100",
            sku : "SKU: G-HS-119",
            price : 500,
            discount : 0,
            productImages : {
                "0" : "assets/product-images/3/1.webp",
                "1" : "assets/product-images/3/2.webp",
                "2" : "assets/product-images/3/3.webp",
                "3" : "assets/product-images/3/4.webp",
                "4" : "assets/product-images/3/5.webp",
                "5" : "assets/product-images/3/6.webp",
                "6" : "assets/product-images/3/7.webp",
                "7" : "assets/product-images/3/8.webp",
            },
            features : {
                "1" : "x5 3100f Gaming",
                "2" : "CMP k7500 Gaming",
                "3" : "KJH Gaming Services",
            }
        },
        {
            id : 7,
            title : "LKS Loray Avidia 7x 8900k",
            sku : "SKU: G-HS-120",
            price : 900,
            discount : 10,
            productImages : {
                "0" : "assets/product-images/7/1.webp",
                "1" : "assets/product-images/7/2.webp",
                "2" : "assets/product-images/7/3.webp",
                "3" : "assets/product-images/7/4.webp",
                "4" : "assets/product-images/7/5.webp",
                "5" : "assets/product-images/7/6.webp",
                "6" : "assets/product-images/7/7.webp",
                "7" : "assets/product-images/7/8.webp",
            },
            features : {
                "1" : "7x 8900k Gaming",
                "2" : "LKS Avidia 7500 Gaming",
                "3" : "CMP Gaming Services",
            }
        },
        {
            id : 11,
            title : "OPM Kulzy AMP 2 2200X",
            sku : "SKU: G-HS-121",
            price : 320,
            discount : 5,
            productImages : {
                "0" : "assets/product-images/11/1.webp",
                "1" : "assets/product-images/11/2.webp",
                "2" : "assets/product-images/11/3.webp",
                "3" : "assets/product-images/11/4.webp",
                "4" : "assets/product-images/11/5.webp",
                "5" : "assets/product-images/11/6.webp",
                "6" : "assets/product-images/11/7.webp",
                "7" : "assets/product-images/11/8.webp",
            },
            features : {
                "1" : "2 2200x Gaming",
                "2" : "VCV AMP 1650S Gaming",
                "3" : "MNM Gaming Services",
            }
        }
    ]

let _products = window.sessionStorage.getItem("productsData");

if(_products === null)
{
    window.sessionStorage.setItem("productsData", JSON.stringify(productsData));
}

try {
    _products = JSON.parse(_products);
} catch (error) {
    window.sessionStorage.setItem("productsData", JSON.stringify(productsData));
}

function getCartData()
{
    let _cart = window.sessionStorage.getItem("globalCart");

    if(_cart === null)
    {
        _cart = [];
    }
    else
    {
        try {
            _cart = JSON.parse(_cart);
        } catch (error) {
            _cart = [];
        }
    }

    return _cart;
}

function setCart(searchResult) {
    // console.log(searchResult);
    const cart = getCartData();
    cart.push(searchResult);
    // console.log(globalCart);
    window.sessionStorage.setItem("globalCart", JSON.stringify(cart));

    $('#productCount').text(cart.length);
}

function groupCartByProductId()
{
    const cart = getCartData();
    const groupById = cart.reduce((group, product) => {
        const { id } = product;
        group[id] = group[id] ?? [];
        group[id].push(product);
        return group;
      }, {});

    return groupById;
}

function updateCartMiniView()
{
    $('.cart-menu-short').html('');
    let groupedCart = groupCartByProductId();

    let productTotalPriceArray = [];
    
    for (const property in groupedCart) {
        let groupedProduct = groupedCart[property];

        let product = groupedProduct[0];

        let items = (groupedProduct.length > 1 ? 'items' : 'item');

        items = groupedProduct.length + ' ' + items;

        for (let index = 0; index < groupedProduct.length; index++) {
            const element = groupedProduct[index];
            if (element.discount > 0) {
                let discountTotalPrice = (element.price - ((element.price*element.discount)/100));
                productTotalPriceArray.push(discountTotalPrice);
            }else{
                productTotalPriceArray.push(element.price);
            }
        }
        
        $('.cart-menu-short').append
            (
                '<div class="cart-menu-product">'+
                    '<div class="cart-menu-product-img">'+
                        '<img class="img-fluid" src="' + product.productImages[0] + '">'+
                    '</div>'+
                    '<div class="cart-menu-product-name"> ' + product.title + '</div>'+
                    '<div class="cart-menu-product-count"> ' + items + '</div>'+
                    '<div class="cart-menu-product-trash">'+
                        '<button class="btn product-trash-btn" data-id="'+ product.id +'"><i class="fa-solid fa-trash"></i></button> '+
                    '</div>'+
                '</div>'
            );
        
        // console.log(groupedProduct[0].title);
    }

    var cartTotalPrice = 0;
    for (var i = 0; i < productTotalPriceArray.length; i++) {
        if (isNaN(productTotalPriceArray[i])) {
            continue;
        }
        cartTotalPrice += Number(productTotalPriceArray[i]);
    }
    
    $(
        '<hr>'+
        '<div class="cart-link">'+
            '<span>Total $'+ cartTotalPrice +'</span> <a href="order-cart.html" class="btn btn-dark">Checkout <i class="fa-solid fa-square-up-right"></i></a>'+
        '</div>'
    ).appendTo('.cart-menu-short');
}







function tableProducts () {
    $('.products-table').html('');
    let groupedCart = groupCartByProductId();

    let productTotalPriceArray = [];

    for (const property in groupedCart) {
        let groupedProduct = groupedCart[property];
        
        quantity = groupedProduct.length;

        let product = groupedProduct[0];

        for (let index = 0; index < groupedProduct.length; index++) {
            const element = groupedProduct[index];
            if (element.discount > 0) {
                let discountTotalPrice = (element.price - ((element.price*element.discount)/100));
                productTotalPriceArray.push(discountTotalPrice);
            }else{
                productTotalPriceArray.push(element.price);
            }
        }

        $('.products-table').append(
            '<tr>'+
                '<th class="mobile-none"></th>'+
                '<th>Product</th>'+
                '<th>Each</th>'+
                '<th>Quantity</th>'+
                '<th>Total</th>'+
                '<th>Trash</th>'+
            '</tr>'+
            '<tr>'+
                '<td class="mobile-none">'+
                '<a href="product.html?id=' + product.id + '">'+
                    '<img class="img-fluid product-img" src="'+ product.productImages[0]+'">'+
                '</a>'+
                '</td>'+
                '<td>'+
                    '<div class="product-name">'+ product.title +'</div>'+
                '</td>'+
                '<td>'+
                    '<div class="product-price '+ (product.discount > 0 ? 'text-discount' : "" ) +'">$'+ product.price +'</div>'+
                    (product.discount > 0 ? '<div class="discount-product-price">$'+ (product.price - ((product.price*product.discount)/100)) +'</div>': '') +
                '</td>'+
                '<td>'+
                    '<div class="quantity-flex">'+
                        '<span class="increase" data-id="'+ product.id +'"><i class="fa-solid fa-plus"></i></span>'+
                        '<div>'+ quantity +'</div>'+
                        '<span class="decrease" data-id="'+ product.id +'"><i class="fa-solid fa-minus"></i></span>'+
                    '</div>'+
                '</td>'+
                '<td>'+
                    '<div class="total-count">$'+ quantity*(product.price - ((product.price*product.discount)/100)) +'</div>'+
                '</td>'+
                '<td>'+
                    '<div>'+
                        '<button class="btn btn-outline-danger trash-product" data-id="'+ product.id +'">'+
                            '<i class="fa-solid fa-trash"></i>'+
                        '</button>'+
                    '</div>'+
                '</td>'+
            '</tr>'
        );

    }

    var cartTotalPrice = 0;
    for (var i = 0; i < productTotalPriceArray.length; i++) {
        if (isNaN(productTotalPriceArray[i])) {
            continue;
        }
        cartTotalPrice += Number(productTotalPriceArray[i]);
    }

    $('.products-count').html('');

    const cart = getCartData();
    $('.products-count').append(
        (cart.length > 0 ? '<span>'+ cart.length +' items</div>': '<span>'+ cart.length +' item</div>')
    );

    $('.products-total-price').html('');
    $('.products-total-price').append(
        '<span>$'+ cartTotalPrice +'</span>'
    );

    $('.subtotal-p').html('$' + cartTotalPrice);
    
    const checkoutTotalPrice = (cartTotalPrice + (cartTotalPrice*18)/100);

    $('.total-p').html('$' + checkoutTotalPrice);
}


