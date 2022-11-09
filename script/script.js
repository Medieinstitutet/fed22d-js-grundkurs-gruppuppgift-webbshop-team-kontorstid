console.log("hej")

//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
let amountLevel; //Label to show total amount
let newPrice = 0;

function init(){

    //Declares variables 
    btnLower = document.querySelector("#decreaseBtn");
    btnHigher = document.querySelector("#increaseBtn");
    priceLabel = document.querySelector("#tot-price");
    amountLevel = document.querySelector("#tot-amount");
    
    //Calling functions
    btnLower.addEventListener("click", test);
    btnHigher.addEventListener("click", test2);
    console.log("hej");
} //End init


function test(){
    newPrice --;
    priceLabel.innerHTML = newPrice;
}

function test2(){
    newPrice ++;
    priceLabel.innerHTML = newPrice;
}

init();