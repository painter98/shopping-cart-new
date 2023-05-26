let products = document.getElementById('products');
let myArr = [];
let myCart = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let curruser = JSON.parse(localStorage.getItem('currUser'));
console.log(curruser);

fetch('https://fakestoreapi.com/products').then((response)=>{ //fetch API dsta of products
    return response.json();
}).then((data)=>{
    data.forEach((product)=>{
        if(product.category!='jewelery'){
            product.colors = ["red","blue","black","green"]; //manually add colors and size filters to data
            product.sizes = ["s","l","m","xl"];
        }
        else{
            product.colors = [];
            product.sizes = [];
        }

        myArr.push(product);
    })
    showArray(myArr);
});

function showArray(array){ //showing data on the shop screen
    products.innerHTML = '';
    let id=0;
    array.forEach((product)=>{
        products.innerHTML += `<div class=container-3 id=${id}>
            <img class="product-image" src="${product.image}" alt="item picture">
            <h5>${product.title}</h5>
            <p>Price: $${product.price} Rating:${product.rating.rate}</p>
            <div> color
                <span class="color" style="background-color:${product.colors[0]}"></span>
                <span class="color" style="background-color:${product.colors[1]}"></span>
                <span class="color" style="background-color:${product.colors[2]}"></span>
                <span class="color" style="background-color:${product.colors[3]}"></span>
            </div>
            <button onclick="toCart(${id})" class="tocart">add to cart</button>
        </div>`
        
       id++;
    })
        
}

//filters baased on category
document.getElementById('all').addEventListener('click',()=>{
    showArray(myArr);
})

//mens clothing
document.getElementById('mens').addEventListener('click',()=>{
    let newArray = myArr.filter((product)=>{
        return product.category == "men's clothing";
    });
    console.log(newArray);
    showArray(newArray);
});

//womens clothing
document.getElementById('womens').addEventListener('click',()=>{
    let newArray = myArr.filter((product)=>{
        return product.category == "women's clothing";
    });
    console.log(newArray);
    showArray(newArray);
});

//jewellary
document.getElementById('jewels').addEventListener('click',()=>{
    let newArray = myArr.filter((product)=>{
        return product.category == "jewelery";
    });
    console.log(newArray);
    showArray(newArray);
});

//electronics
document.getElementById('electronics').addEventListener('click',()=>{
    let newArray = myArr.filter((product)=>{
        return product.category == "electronics";
    });
    console.log(newArray);
    showArray(newArray);
})
console.log(myArr);

//search the product
document.getElementById('search').addEventListener('change',()=>{
    let val = document.getElementById('search').value;
    let newArray = myArr.filter((product)=>{
        return product.title.toLowerCase().includes(val.trim().toLowerCase());
    });

    if(val=='') newArray = myArr;
    console.log(newArray);
    showArray(newArray);
});

//applying filters based on price and rating
function applyFilter(){

    console.log('filtering...');
    let newArray = [];

    let rate = document.getElementById('rate'); //rate default value is 0
        console.log(rate.value);
    
    let lowprice = document.getElementById('lprice');
    if(lowprice.checked){
        let temp = myArr.filter((product)=>{
            return product.price >=0 && product.price <= 25 && product.rating.rate <= rate.value;
        });
        temp.forEach((value)=>{
            if(!newArray.includes(value)) return newArray.push(value)});
        console.log(newArray);
    };

    let midprice = document.getElementById('mprice');
    if(midprice.checked){
        let temp = myArr.filter((product)=>{
            return product.price >=25 && product.price <=75 && product.rating.rate <= rate.value;
        });
        temp.forEach((value)=>{
            if(!newArray.includes(value)) return newArray.push(value)});
        console.log(newArray);
    };

    let highprice = document.getElementById('hprice');
    if(highprice.checked){
        let temp = myArr.filter((product)=>{
            return product.price >=75 && product.price <=125 && product.rating.rate <= rate.value;
        });
        temp.forEach((value)=>{
            if(!newArray.includes(value)) return newArray.push(value)});
        console.log(newArray);
    };

    let veryhighprice = document.getElementById('vhprice');
    if(veryhighprice.checked){
        let temp = myArr.filter((product)=>{
            return product.price >=125 && product.rating.rate <= rate.value;
        });
        console.log(temp);
        temp.forEach((value)=>{
            if(!newArray.includes(value)) return newArray.push(value)});
        console.log(newArray);
    };
    if(rate.value==0 && lowprice.checked == false && midprice.checked == false && highprice.checked == false && veryhighprice.checked == false){
        newArray = myArr;
        showArray(newArray); //no filter
      } 
    else if(rate.value>=0 && lowprice.checked == false && midprice.checked == false && highprice.checked == false && veryhighprice.checked == false){
        let temp = myArr.filter((product)=>{
            return product.rating.rate <= rate.value;
        });
        temp.forEach((value)=>{
            if(!newArray.includes(value)) return newArray.push(value)});
        console.log(newArray);
    }

      showArray(newArray); //display data on shop screen
    
}


//adding to cart
function toCart(itemId){
    console.log('hiii',itemId);

    let cartProduct = myArr.filter((product)=>{
        return product.id == itemId+1;
    });
    
    cart.push(cartProduct[0]);
    //cart = [];
    localStorage.setItem('cart',JSON.stringify(cart));
};
