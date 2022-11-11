//Global variables

let array = [35, 29, 23, 47]

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
let amountLevel; //Label to show total amount
let newPrice; //Variable to show new price
let standardPrice; 
let newAmount; //Variable to show new amount of donuts

function init(){

    //Declares variables 
    btnLower = document.querySelector("#decreaseBtn");
    btnHigher = document.querySelector("#increaseBtn");
    standardPrice = document.querySelector("#donut-price");
    priceLabel = document.querySelector("#tot-price");
    amountLevel = document.querySelector("#tot-amount");
    
    //Calling functions
    btnLower.addEventListener("click", reduceTotDonut);
    btnHigher.addEventListener("click", increaseTotDonut);
    console.log(standardPrice.innerText)
} //End init


function reduceTotDonut(){
    newPrice = Number(standardPrice.innerText);
    console.log(newPrice);
    newAmount = Number(amountLevel.innerText);
    if(newAmount -1 < 0) {
        return;
    }
    newAmount --;
    amountLevel.innerHTML = newAmount;
    priceLabel.innerHTML = newAmount * newPrice;
}

function increaseTotDonut(){
    newPrice = Number(standardPrice.innerText);
    console.log(newPrice);
    newAmount = Number(amountLevel.innerText);
    newAmount ++;
    amountLevel.innerHTML = newAmount;
    priceLabel.innerHTML = newAmount * newPrice;
}

function checkPrice() {
        btnLower.removeAttribute("disabled", true);
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
const paymentMethod1 = document.querySelector('#card');
const paymentMethod2 = document.querySelector('#invoice');

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
paymentMethod1.addEventListener('click', showCardContent);
paymentMethod2.addEventListener('click', showInvoiceContent);

function showInvoiceContent () {
    document.querySelector('.paymentCardContainer').classList.remove('visible');
    document.querySelector('.paymentInvoiceContainer').classList.add('visible');
}

function showCardContent (){
    document.querySelector('.paymentInvoiceContainer').classList.remove('visible');
    document.querySelector('.paymentCardContainer').classList.add('visible');
}
