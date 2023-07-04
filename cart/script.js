let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];

console.log(cartProduct);

let first = document.getElementById('first');
let second = document.getElementById('second');
let id=0,sum=0;


cartProduct.forEach((product)=>{
        //items shown in the cart 
        first.innerHTML += `<div class=container-3 id=${id}>
        <img class="product-image" src="${product.image}" alt="item picture">
        <h5>${product.title}</h5>
        <p>Price: $${product.price} Rating: ${product.rating.rate}</p>
        </div>`
        id++;

        //cost of items and its total
        sum += product.price;
        second.innerHTML += `<div class="product-price">
                                <p>${product.title}</p>
                                <p>$${product.price}</p>
                            </div>`
    });


second.innerHTML += `<p>Total price: $${sum}</p>
                     <button id="cart-btn">Click To Checkout</button>`;

let Checkout = document.getElementById('cart-btn');
Checkout.addEventListener('click',()=>{
    window.location.href = '../razorpay';
    localStorage.setItem('totalPrice',JSON.stringify(sum));
})

