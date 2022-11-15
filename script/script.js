//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts
let totSum;
let newTotSum;



function init(){
    //Declares variables 
    btnLower = document.querySelectorAll('button[data-operator="decreaseBtn"]');
    btnHigher = document.querySelectorAll('button[data-operator="increaseBtn"]');
    standardPrice = document.querySelectorAll(".donut-price");
    totSum = document.querySelector(".tot-sum");
    //Calling functions
    for (let i = 0; i < btnLower.length; i++){
        btnLower[i].addEventListener("click", reduceTotDonut);
    }
    for (let i = 0; i < btnHigher.length; i++){
        btnHigher[i].addEventListener("click", increaseTotDonut);
    }
    console.log(Number(totSum.innerText))
} //End init


//Function to reduce total amount of donuts
function reduceTotDonut(e){
    const amountLevel = e.currentTarget.parentElement.querySelector('.tot-amount'); //Const which goes through the parent element to find .tot-amount
    newAmount = Number(amountLevel.innerText); //Specifies the variable newAmount equal to amountLevel. Uses Number to convert it from string to number, innerText to read.

    if (newAmount <= 0) { //If the total amount of donuts allready is at 0, don't do the function
        return
      }
    
    amountLevel.innerHTML = newAmount - 1; //Reduces the total amount of donuts by one each btn klick

    updateDonutSum(e.currentTarget.parentElement); //Calls the function updateDonutSum with parameters
}

//Function to increase total amount of donuts
function increaseTotDonut(e){
    const amountLevel = e.currentTarget.parentElement.querySelector('.tot-amount');
    newAmount = Number(amountLevel.innerText);
    
    amountLevel.innerHTML = newAmount + 1;

    updateDonutSum(e.currentTarget.parentElement);
}

function updateDonutSum(donutElement) {
    const donutSinglePrice = donutElement.querySelector(".donut-price").innerText;
    const orderedAmount = donutElement.querySelector(".tot-amount").innerText;

    const sum = donutSinglePrice * orderedAmount;

    newTotSum = Number(totSum.innerText);
    console.log(newTotSum);
    newTotSum += Number(donutSinglePrice);
    console.log(sum);
    totSum.innerHTML = newTotSum;
    
    donutElement.querySelector(".tot-price").innerHTML = sum;
    

    /**
     * Skapa en variabel för totala summan i varukorgen, sätt den till 0.
     * Varje gång man klickar på lägg till donut, öka summan i varukorgen med vad donuten kostar (pris * antal)
     * Skriv ut summan till varukorgen
     */


    /*for (let i = 0; i < donutSinglePrice.length; i++){
        console.log(donutSinglePrice * orderedAmount)
        totSum = donutSinglePrice * orderedAmount;
        totalAmount();
    }*/
}

init();



/**
 * Skapa en for-loop som går igenom totala summan på alla munkar
 * Anropa en ny funktion för att addera ihop alla summor
 * Spara totala summan i en ny variabel
 * Skriv ut variabeln till varukorgen
 */

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
