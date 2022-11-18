//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
//let newPrice; //Variable to show new price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts

//Donuts
const donuts = [
  {
      img: 'assets/photos/bild1.jpg', //Donut picture
      name: 'Classic', //Donut name
      category: 'Övrigt', //Donut category
      // TODO: lägg på keys
      35, //Donut price
      `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>`, //rating
      0, //Total price
      0, //Amount
  },

]

for (let i = 0; i <donuts.length; i++) {
  donuts[i].name // => Donut med socker
  donutContainer.innerHTML += `
  <section class="donut-container">
                <div class="donut-image-container">
                    <img src="./assets/photos/bild1.jpg" alt="${donut[i].name}">
                </div>
                <div class="donut-info-container">
                    <h2 class="donutName"><span class="donut-price"></span> kr</h2>
                    <p class="donutCategory"></p>
                    <div class="ratingContainer"></div>
  
                    
                    <p>pris: <span class="tot-price">${donut[i].price}</span> kr</p>
                    <p>antal: <span class="tot-amount"></span> st</p>
                    <button data-operator="decreaseBtn">-</button>
                    <button data-operator="increaseBtn">+</button>
                </div>
            </section>
            <aside class=" donut-info">
                <img src="./assets/photos/donut-with-sugar-hole2.jpg">
                <h3> Ingredienser</h3>
                <p><b>Munk</b>: Vetemjöl, socker, rapsolja, skummjölkspulver, sojamjöl, bakpulver (E450, E500),
                    äggulepulver, salt,
                    modifierad stärkelse, aromämne, emulgeringsmedel (E322[soja]), stabiliseringsmedel (E466).<br>
                    <b>Frosting</b>: Socker, kokosfett, vasslemjölkspulver, emulgeringsmedel, sojalecitin, vaniljarom,
                    glykossirap, fuktighetsbevarande medel, sorbitolsirap, emulgeringsmedel E471, konserveringsmedel,
                    citronsyra
                </p>
            </aside>
  `;

}

const donut2 = [
  {
    properties: [
      'assets/photos/bild1.jpg', //Donut picture
      'Donut med socker', //Donut name
      'classic', //Donut category
      40, //Donut price
      `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>`, //rating
      0, //Total price
      0, //Amount
    ]
  }
]

function init() {
  //Declares variables
  btnLower = document.querySelectorAll('button[data-operator="decreaseBtn"]');
  btnHigher = document.querySelectorAll('button[data-operator="increaseBtn"]');
  standardPrice = document.querySelectorAll(".donut-price");
  //Calling functions
  for (let i = 0; i < btnLower.length; i++) {
    btnLower[i].addEventListener("click", reduceTotDonut);
  }
  for (let i = 0; i < btnHigher.length; i++) {
    btnHigher[i].addEventListener("click", increaseTotDonut);
  }
} //End init

//Function to reduce total amount of donuts
function reduceTotDonut(e) {
  const amountLevel =
    e.currentTarget.parentElement.querySelector(".tot-amount"); //Const which goes through the parent element to find .tot-amount
  console.log(standardPrice); //Console log to make sure that it is done correctly
  newAmount = Number(amountLevel.innerText); //Specifies the variable newAmount equal to amountLevel. Uses Number to convert it from string to number, innerText to read.

  if (newAmount <= 0) {
    //If the total amount of donuts allready is at 0, don't do the function
    return;
  }

  amountLevel.innerHTML = newAmount - 1; //Reduces the total amount of donuts by one each btn klick
  console.log(amountLevel.innerText); //Console log to make sure that it is done correctly

  newPrice = Number(standardPrice.innerText); //Specifies  newPrice equal to Number standardPrice
  console.log(newPrice.innerText);

  updateDonutSum(e.currentTarget.parentElement); //Calls the function updateDonutSum with parameters
}

//Function to increase total amount of donuts
function increaseTotDonut(e) {
  const amountLevel =
    e.currentTarget.parentElement.querySelector(".tot-amount");
  console.log(amountLevel.innerText);
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

const orderButton = document.querySelector("#order");
const nameField = document.querySelector("#name");
const addressField = document.querySelector("#address");
const zipcodeField = document.querySelector("#zipcode");
const cityField = document.querySelector("#city");
const codeField = document.querySelector("#code");
const phoneField = document.querySelector("#phone");
const emailField = document.querySelector("#email");
const paymentMethodChoice = document.querySelector("#paymentmethod");
let nameIsOk = false;
const paymentMethod1 = document.querySelector("#card");
const paymentMethod2 = document.querySelector("#invoice");

// formulär

nameField.addEventListener("change", checkName);

function checkName() {
  console.log("+In function checkName: nameField = " + nameField.value);
  if (nameField.value.indexOf(" ") > -1) {
    //Kollar att det finns mellanslag i namnet
    nameIsOk = true;
  } else {
    nameIsOk = false;
  }
  activateOrderButton();
}

function activateOrderButton() {
  if (nameIsOk) {
    orderButton.removeAttribute("disabled");
  } else {
    orderButton.setAttribute("disabled", true);
  }
}
paymentMethod1.addEventListener("click", showCardContent);
paymentMethod2.addEventListener("click", showInvoiceContent);

function showInvoiceContent() {
  document.querySelector(".paymentCardContainer").classList.remove("visible");
  document.querySelector(".paymentInvoiceContainer").classList.add("visible");
}

function showCardContent() {
  document
    .querySelector(".paymentInvoiceContainer")
    .classList.remove("visible");
  document.querySelector(".paymentCardContainer").classList.add("visible");
}

document.getElementById("nav-links").onclick = function () {
  document.getElementById("toggle").click();
};
