//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
//let newPrice; //Variable to show new price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts
let donutContainer; //Variable to select donutContainer from HTML
let amountLevel;
let priceContainer;
let donutPrice; //Price of each donut
let donutAmount; //Amount of each donut


const donuts = [ //Array which stores all info about the donut, e.g. name
  { images: [ { img: "assets/photos/bild1.jpg", alt: "Munk-med-socker", width: 100, height: "auto" } ], name: "Classic ", category: "Övrigt", price: 35, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild2.jpg", alt: "Munk-med-sylt", width: 100, height: "auto" } ], name: "Raspberry pie ", category: "Övrigt", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild3.jpg", alt: "Munk-med-florsocker", width: 100, height: "auto" } ], name: "Sugar dream ", category: "Övrigt", price: 40, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild5.jpg", alt: "Munk-med-topping", width: 100, height: "auto" } ], name: "Dragon Tail ", category: "Övrigt", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild4.jpg", alt: "Munk-med-strossel", width: 100, height: "auto" } ], name: "Unicorn ", category: "Strössel", price: 40, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild6.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Hungover ", category: "Strössel", price: 40, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild7.jpg", alt: "Munk-med-smarties", width: 100, height: "auto" } ], name: "Smarties ", category: "Strössel", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild8.jpg", alt: "Munk-med-figur", width: 100, height: "auto" } ], name: "Monster ", category: "Strössel", price: 40, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild9.jpg", alt: "Munk-med-choklad", width: 100, height: "auto" } ], name: "Chocoholic ", category: "Choklad", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild10.jpg", alt: "Munk-med-chokladbitar", width: 100, height: "auto" } ], name: "Chocoloco ", category: "Choklad", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild11.jpg", alt: "Munk-med-chokladstrossel", width: 100, height: "auto" } ], name: "Chocolate rain ", category: "Choklad", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild12.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Rainbow ", category: "Övrigt", price: 40, rating: 5, totPrice: 0, totAmount: 0 },
];


function init() { //Function to declare HTML elements
  standardPrice = document.querySelectorAll(".donut-price"); //Total price of donuts 
  donutContainer = document.querySelector(".donutContainer"); //Container surrounding each donut
  totalSum = document.querySelector(".totSum"); //HTML element to display total sum 
  priceContainer = document.querySelector(".priceContainer");
} //End init


function initButtons() {
  //Declare variables
  btnLower = document.querySelectorAll("button[data-operator='decreaseBtn']");
  btnHigher = document.querySelectorAll("button[data-operator='increaseBtn']");
  
  //Calling functions
  for (let i = 0; i < btnLower.length; i++) {
    btnLower[i].addEventListener("click", reduceTotDonut);
  }
  for (let i = 0; i < btnHigher.length; i++) {
    btnHigher[i].addEventListener("click", increaseTotDonut);

  }
} //End init


function showDonuts() {
  donutContainer.innerHTML = "";
  //For-loop to loop through every donut
  for (let i = 0; i < donuts.length; i++) {
    donutContainer.innerHTML += `
    <section class="donut-container">
      <div class="donut-image-container">
          <img src="${donuts[i].images[0].img}" alt="${donuts[i].images[0].alt}">
      </div>
      <div class="donut-info-container">
          <h2 class="donutName">${donuts[i].name}<span class="donut-price">${donuts[i].price}</span> kr</h2>
          <p class="donutCategory">${donuts[i].category}</p>
          <div class="ratingContainer">${donuts[i].rating}</div>
          
          <p>pris: <span class="tot-price">${donuts[i].totPrice}</span> kr</p>
          <p>antal: <span class="tot-amount">${donuts[i].totAmount}</span> st</p>
          <button data-operator="decreaseBtn" data-id = "${i}">-</button>
          <button data-operator="increaseBtn" data-id = "${i}">+</button>
      </div>
    </section>
    `;
    console.log(donuts[i].totPrice)
  }
  priceContainer.innerHTML += `
  <p> Totalsumma: <span class="totSum"></span> 0 kr </p>`
}

function showShoppingCart() {
  priceContainer.innerHTML = "";
  const sum = donuts.reduce(
    (previousValue, donut) => {
      return (donut.totAmount * donut.price) + previousValue;
    },
    0
  );

  printOrdredDonuts();

  priceContainer.innerHTML += `
  <p> Totalsumma: <span class="totSum"> ${sum} </span> kr </p>`
}

function printOrdredDonuts() {
  priceContainer.innerHTML = "";

  for(let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      pr.innerHTML += `<p>${donuts[i].name}</p>`;
    }
  }
}

/** Todo
 *  X Öka totAmount när man klickar på plusknappen i arrayen
 *  X Kontrollera om donuts är över noll
 *  Skriv ut priset på varje donut till varukorgen (som är över 0)
*/


function reduceTotDonut(e) { //Function to reduce total amount of donuts
  if (donuts[e.currentTarget.dataset.id].totAmount <= 0) {
    return;
  }
  amountLevel = donuts[e.currentTarget.dataset.id].totAmount -= 1;

  showShoppingCart();
}

                                
function increaseTotDonut(e) { //Function to increase total amount of donuts
  amountLevel = donuts[e.currentTarget.dataset.id].totAmount += 1;
  console.log(amountLevel);

  updateDonutSum();
  showShoppingCart(amountLevel);
}


function updateDonutSum() {
  //Declaration of local variables

  const monday = new Date();

  for (let i = 0; i < donuts.length; i++) {
      if (donuts[i].totAmount > 0) {
          donuts[i].totPrice = donuts[i].price * amountLevel;
          //console.log(donuts[i].totPrice);
      }
  }

  showDonuts();

  //const reducedPriceMonday = totalPrice * 0.9;

  /*if (monday.getDay() === 1) {
    console.log(reducedPriceMonday);
    totalSum.innerHTML = reducedPriceMonday;
  } else {
    totalSum.innerHTML = totalPrice;
  }*/

}

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
const paymentMethodCard = document.querySelector("#card");
const paymentMethodInvoice = document.querySelector("#invoice");

// formulär

nameField.addEventListener("change", checkName);

function checkName() {
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
paymentMethodCard.addEventListener("click", showCardContent);
paymentMethodInvoice.addEventListener("click", showInvoiceContent);

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

init();
showDonuts();
initButtons();

