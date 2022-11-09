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

// Tillagt 221109 av Sussie
// generella variabler

const orderButton = document.querySelector('#order');
const nameField = document.querySelector('#name');
const addressField = document.querySelector('#address');
const zipcodeField = document.querySelector('#zipcode');
const cityField = document.querySelector('#city');
const codeField = document.querySelector('#code');
const phoneField = document.querySelector('#phone');
const emailField = document.querySelector('#email');
const paymentMethodChoice = document.querySelector('#paymentmethod');
let nameIsOk = false;

// formulär

nameField.addEventListener('change', checkName);

function checkName (){
    console.log("+In function checkName: nameField = " + nameField.value);
    if (nameField.value.indexOf(' ') > -1) { //Kollar att det finns mellanslag i namnet
        nameIsOk = true;
    } else {
        nameIsOk = false;
    }
    activateOrderButton();
}

function activateOrderButton() {
    if (nameIsOk) {
        orderButton.removeAttribute('disabled');
    } else {
        orderButton.setAttribute('disabled', true);
    }
}