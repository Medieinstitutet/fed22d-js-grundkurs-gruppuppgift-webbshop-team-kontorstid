//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
//let newPrice; //Variable to show new price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts



function init(){

    //Declares variables 
    btnLower = document.querySelectorAll('button[data-operator="decreaseBtn"]');
    btnHigher = document.querySelectorAll('button[data-operator="increaseBtn"]');
    //standardPrice = document.querySelectorAll(".donut-price");
    //Calling functions
    for (let i = 0; i < btnLower.length; i++){
        btnLower[i].addEventListener("click", reduceTotDonut);
    }
    for (let i = 0; i < btnHigher.length; i++){
        btnHigher[i].addEventListener("click", increaseTotDonut);
    }
} //End init



function reduceTotDonut(e){
    const amountLevel = e.currentTarget.parentElement.querySelector('.tot-amount');
    console.log(standardPrice)
    newAmount = Number(amountLevel.innerText);

    if (newAmount <= 0) {
        return
      }
    
    amountLevel.innerHTML = newAmount - 1;
    console.log(amountLevel.innerText);

    newPrice = Number(standardPrice.innerText);
    console.log(newPrice.innerText)

    updateDonutSum(e.currentTarget.parentElement);
}

function increaseTotDonut(e){
    const amountLevel = e.currentTarget.parentElement.querySelector('.tot-amount');
    console.log(amountLevel.innerText)
    newAmount = Number(amountLevel.innerText);
    
    amountLevel.innerHTML = newAmount + 1;
    console.log(amountLevel.innerText);

    updateDonutSum(e.currentTarget.parentElement);
}

function updateDonutSum(donutElement) {
    const donutSinglePrice = donutElement.querySelector(".donut-price").innerText;
    const orderedAmount = donutElement.querySelector(".tot-amount").innerText;

    const sum = donutSinglePrice * orderedAmount;

    donutElement.querySelector(".tot-price").innerHTML = sum;
    console.log(sum);
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
