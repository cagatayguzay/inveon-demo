let productsData = 
    [
        {
            id : 3,
            title : "ABMX Eien Xyzen 5 3100",
            sku : "SKU: G-HS-119",
            money : 500,
            src : "https://picsum.photos/id/1/200/300",
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
            src : "https://picsum.photos/id/2/200/300",
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
            src : "https://picsum.photos/id/0/200/300",
            info : {
                "1" : "2 2200x Gaming",
                "2" : "VCV AMP 1650S Gaming",
                "3" : "MNM Gaming Services",
            }
        }
    ]

window.localStorage.setItem("productsData", JSON.stringify(productsData));

const globalCart = [];
function setCart(searchResult) {
    // console.log(searchResult);
    globalCart.push(searchResult);
    // console.log(globalCart);
    window.localStorage.setItem("globalCart", JSON.stringify(globalCart));
}

const retrievedObject = localStorage.getItem('globalCart');
const retrievedObjectParse = JSON.parse(retrievedObject);
console.log(retrievedObjectParse);
$('#productCount').text(retrievedObjectParse.length);


// const retrievedObject = localStorage.getItem('globalCart');
// console.log('globalCart: ', JSON.parse(retrievedObject));

// window.localStorage.setItem("globalCart", JSON.stringify(globalCart));
// const retrievedObject = localStorage.getItem('globalCart');
// console.log('cartStorage: ', JSON.parse(retrievedObject));

// console.log('globalCart: ', JSON.parse(retrievedObject));