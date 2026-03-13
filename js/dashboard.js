let user = localStorage.getItem("user")

if(!user){
    window.location.href = "login.html"; // open login page.
}
document.getElementById("userEmail").innerHTML= user; // set email id in dashboard page.

let foodSelection = document.getElementById("foodSelection");   // reference of food selection section in dashboard page using id selector 
let cartSelection = document.getElementById("cartSelection");   // reference of cart selection section in dashboard page using id selector 

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html"; // open login page. 
}


foodSelection.style.display = ""; // let Tailwind grid handle layout
cartSelection.style.display = "none"; // hide cart selection section

function showFoodSelection(){
    foodSelection.style.display = ""; // let Tailwind grid handle layout
    cartSelection.style.display = "none"; // hide cart selection section
}
function showCartSelection(){
    foodSelection.style.display = "none"; // hide food selection section
    cartSelection.style.display = ""; // let Tailwind handle layout
}

let FOOD_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=pork"

fetch(FOOD_URL).then(response=>response.json()).
then(data=>{
    //console.log(data.meals)
    displayFood(data.meals)
}).catch(error=> {
    console.log(error)
})

//let price = 40;
function displayFood(meals){
 meals.forEach(meal=> {

    //console.log(meal.strMeal+" "+meal.strMealThumb)
    let price = Math.floor(Math.random()*40) + 10; // generate random price for food item between 10 and 50
    //console.log(price)
    //price = price + 10; // increase price by 10 for each food item
    foodSelection.innerHTML +=`
    <div class="row row-cols-1 row-cols-md-3 g-4"> 
        <div class="card" style="width: 18rem;">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">Price: $${price}</p>
                <button class="btn btn-primary" onclick="addToCart(${meal.idMeal},'${meal.strMeal}',${price})">Add to Cart</button>
            </div>
        </div>
    </div>
    `
   
 })   
}

let cart = []; // empty array to store cart items
document.getElementById("cartCount").innerHTML = `Cart Items: ${cart.length}`; // display cart item count in dashboard page
function addToCart(mealId, mealName, price){
    //console.log(mealId, mealName, price)
    // if item exists in cart it return that item information otherwise it return undefined
    let item  = cart.find(c=>c.mealId === mealId); // check if item already exists in cart
    
    if(item){
        item.quantity += 1; // if item exists, increase quantity by 1
    }else {
        cart.push({mealId, mealName, price, quantity: 1}); // add new item to cart with quantity 1
        document.getElementById("cartCount").innerHTML = `Cart Items: ${cart.length}`; // display cart 
    }
    console.log("After added to cart", cart )
    updateCart(); // update cart section in dashboard page after adding item to cart
}

function updateCart() {
    let cartItem = document.getElementById("cartItem");
    cartItem.innerHTML = ""; // clear previous cart items before displaying updated cart items

    let total = 0;
    cart.forEach(item => {
        cartItem.innerHTML += `
            <div class="cart-card">
                <div class="card-body">
                    <h3 class="card-title">${item.mealName}</h3>
                    <p class="card-text">Price: <span class="font-weight-bold">$${item.price}</span></p>
                    <p class="card-text">Quantity: <span class="font-weight-bold">${item.quantity}</span></p>
                </div>
                <div class="flex space-x-2 mt-2 md:mt-0">
                    <input type="button" value="+" onClick="changeQuantity(${item.mealId}, 1)"
                        class="btn btn-primary"/>
                    <input type="button" value="-" onClick="changeQuantity(${item.mealId}, -1)"
                        class="btn btn-danger"/>
                </div>
            </div>
        `;
        total += item.price * item.quantity;
    });
    if(cart.length > 0) {
        cartItem.innerHTML += `<div class="text-right mt-4"><h3 class="text-xl font-bold">Total Amount: <span class="text-green-600">$${total}</span></h3></div>`;
    }
}

// as of now working with only item 
function changeQuantity(mealId, change){
    cart = cart.map(item => {
        if(item.mealId === mealId){
            item.quantity += change; // change quantity by adding change value (can be positive or negative)
        }
       return item;
    }).filter(item => item.quantity > 0); // remove item from cart if quantity is less than or equal to 0  

    updateCart(); // update cart section in dashboard page after changing quantity
}

function checkOut(){
    if(cart.length === 0){
        alert("Cart is empty. Please add items to cart before checkout.");
        return false;
    }else {
        alert("Checkout successful! Thank you for your order.");
        cart = []; // clear cart after successful checkout
        document.getElementById("cartCount").innerHTML = `Cart Items: ${cart.length}`; // update cart item count in dashboard page after checkout
        updateCart(); // update cart section in dashboard page after checkout
    }
}