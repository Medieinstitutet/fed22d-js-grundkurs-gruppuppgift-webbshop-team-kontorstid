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

    newPrice = priceLabel + standardPrice;


    newPrice = Number(priceLabel.innerText); //New price equal to priceLabel. Transform priceLabel from string to number
    console.log(newPrice); 
    newPrice /= 2; //Takes the number from the label and divides it by two
    console.log(newPrice);

    /*if(newPrice <= 35) {
        btnLower.setAttribute("disabled", true);
    } */
    
    newPrice.innerHTML = newPrice; //Writes out the new number to the label    

    newAmount = Number(amountLevel.innerText);
    newAmount --;
    amountLevel.innerHTML = newAmount;
}

function increaseTotDonut(){
    let secondPrice = Number(priceLabel);

    newPrice = Number(standardPrice.innerText);
    console.log(newPrice);

    secondPrice = newPrice + priceLabel;
    let thirdPrice = secondPrice + newPrice;
    console.log(thirdPrice);
    console.log(secondPrice)

    priceLabel.innerHTML = thirdPrice;

    /*newPrice = priceLabel + standardPrice; //New price equal to priceLabel. Transform priceLabel from string to number
    console.log(newPrice);
    newPrice = newPrice + newPrice; //Takes the number from the label and divides it by two
    console.log(newPrice);

    newPrice.innerHTML = newPrice; //Writes out the new number to the label

    if(newPrice >= 35) {
        checkPrice();
    } else {
        btnLower.setAttribute("disabled", true)
    }*/

    newAmount = Number(amountLevel.innerText);
    newAmount ++;
    amountLevel.innerHTML = newAmount;

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