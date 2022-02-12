
let carts = document.querySelectorAll('.add')
let products = [
    {name: "Devil's Reign: Winter Soldier/( 2022) #1", tag: 'Comic 1', price: 5, inCart: 0
    },
    {name: 'Winter Guard (2021) #4 2021', tag: 'Comic 2', price: 5, inCart: 0
    },
    {name: 'Darkhawk (2021)', tag: 'Comic 3', price: 5, inCart: 0
    },
    {name: 'Amazing Fantasy (2021)', tag: 'Comic 4', price: 5, inCart: 0
    },
 
];


for(let i=0; i < carts.length;i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
   
}

function onLoadCardNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.carts span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    //console.log("The product clicked is", product);
    let productNum = localStorage.getItem('cartNumbers');
    productNum = parseInt(productNum);
    console.log(productNum)

    if(productNum){
        localStorage.setItem('cartNumbers', productNum + 1);
        document.querySelector('.carts span').textContent = productNum + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.carts span').textContent = 1;
    }
   setItems(product)
}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log('My cartItems are ', cartItems);

    if(cartItems != null){
        if(cartItems[products.tag] == undefined){
            cartItems ={
                ...cartItems,
                [products.tag]: products
            }
        }  
        cartItems[products.tag].inCart += 1;
    }else{
        products.inCart = 1;
        cartItems = {[products.tag]: products}
    }
    products.inCart = 1;
    
    cartItems = {[products.tag]: products}

    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem("totalCost");
    //console.log("The product price is, ", products.price);
    
    localStorage.setItem("totalCost", products.price);
    console.log('My cartCost is ', cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    }else{
        localStorage.setItem("totalCost", products.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem("totalCost");

    console.log(cartItems);
    if( cartItems && productContainer){
       productContainer.innerHTML = '';
       Object.values(cartItems).map(item => {
           productContainer.innerHTML += `
        <div class="products">
            <img src="images/Cover/${item.tage}.jpg"></img>
            <span>${item.name}</span>
        </div>
        <div class="prices">${item.price}</div>
        <div class="quantity">
            
            <span>${item.inCart}</span>
            
        </div>
        <div class="total">
            $${item.inCart * item.price}.00
        </div>
        `
       });

       productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost}
            </h4>
        </div>
        <a href="thankyou.html"><button type="submit" class="btn">CONFIRM PURCHASE</button></a>
       `
    }
    
}

onLoadCardNumbers();
displayCart()