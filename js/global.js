let productsData = 
    [
        {
            id : 3,
            title : "ABMX Eien Xyzen 5 3100",
            sku : "SKU: G-HS-119",
            money : 500,
            discount : 0,
            productImages : {
                "1" : "assets/product-images/3/1.webp",
                "2" : "assets/product-images/3/2.webp",
                "3" : "assets/product-images/3/3.webp",
                "4" : "assets/product-images/3/4.webp",
                "5" : "assets/product-images/3/5.webp",
                "6" : "assets/product-images/3/6.webp",
                "7" : "assets/product-images/3/7.webp",
                "8" : "assets/product-images/3/8.webp",
            },
            info : {
                "1" : "x5 3100f Gaming",
                "2" : "CMP k7500 Gaming",
                "3" : "KJH Gaming Services",
            }
        },
        {
            id : 7,
            title : "LKS Loray Avidia 7x 8900k",
            sku : "SKU: G-HS-120",
            money : 900,
            discount : 10,
            productImages : {
                "1" : "assets/product-images/7/1.webp",
                "2" : "assets/product-images/7/2.webp",
                "3" : "assets/product-images/7/3.webp",
                "4" : "assets/product-images/7/4.webp",
                "5" : "assets/product-images/7/5.webp",
                "6" : "assets/product-images/7/6.webp",
                "7" : "assets/product-images/7/7.webp",
                "8" : "assets/product-images/7/8.webp",
            },
            info : {
                "1" : "7x 8900k Gaming",
                "2" : "LKS Avidia 7500 Gaming",
                "3" : "CMP Gaming Services",
            }
        },
        {
            id : 11,
            title : "OPM Kulzy AMP 2 2200X",
            sku : "SKU: G-HS-121",
            money : 320,
            discount : 5,
            productImages : {
                "1" : "assets/product-images/11/1.webp",
                "2" : "assets/product-images/11/2.webp",
                "3" : "assets/product-images/11/3.webp",
                "4" : "assets/product-images/11/4.webp",
                "5" : "assets/product-images/11/5.webp",
                "6" : "assets/product-images/11/6.webp",
                "7" : "assets/product-images/11/7.webp",
                "8" : "assets/product-images/11/8.webp",
            },
            info : {
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

// const globalCart = [];
function setCart(searchResult) {
    // console.log(searchResult);
    const cart = getCartData();
    cart.push(searchResult);
    // console.log(globalCart);
    window.sessionStorage.setItem("globalCart", JSON.stringify(cart));

    // const retrievedObject = sessionStorage.getItem('globalCart');
    // const retrievedObjectParse = JSON.parse(retrievedObject);
    // const lenghtObjects = Object.keys(retrievedObjectParse).length

    // console.log(lenghtObjects);
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
    for (const property in groupedCart) {
        let groupedProduct = groupedCart[property];

        let product = groupedProduct[0];

        let items = (groupedProduct.length > 1 ? 'items' : 'item');

        items = groupedProduct.length + ' ' + items;

        $('.cart-menu-short').append
        ('\
            <div class="cart-menu-product">\
                <div class="cart-menu-product-img"> \
                    <img class="img-fluid" src="assets/product-images/11/1.webp" alt="">\
                </div>\
                <div class="cart-menu-product-name">\
                    ' + product.title + ' \
                </div>\
                <div class="cart-menu-product-count">\
                    ' + items + ' \
                </div>\
                <div class="cart-menu-product-trash">\
                    <button class="btn"><i class="fa-solid fa-trash"></i></button>\
                </div>\
            </div>'
        );
        // console.log(groupedProduct[0].title);
    }
}


// $('#productCount').text(retrievedObjectParse.length);


// const retrievedObject = localStorage.getItem('globalCart');
// console.log('globalCart: ', JSON.parse(retrievedObject));

// window.localStorage.setItem("globalCart", JSON.stringify(globalCart));
// const retrievedObject = localStorage.getItem('globalCart');
// console.log('cartStorage: ', JSON.parse(retrievedObject));

// console.log('globalCart: ', JSON.parse(retrievedObject));