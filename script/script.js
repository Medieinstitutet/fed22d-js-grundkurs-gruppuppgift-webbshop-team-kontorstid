//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts
let donutContainer; //Variable to select donutContainer from HTML
let priceContainer; //Variable to select the container surrounding the shopping cart
let donutPrice; //Price of each donut
let donutAmount; //Amount of each donut
let sortDonuts; //Variable to sort donuts e.g. after pricv
let donutBox; //Variable to select donut pop up

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");

const nextBtn = document.querySelector('#previousImage');
const nextBtn2 = document.querySelector('#nextImage');

const slideshow = document.querySelector('#slideshow');

const orderForm = document.querySelector(".checkout-container");
const showOrderFormButton = document.querySelector("button[data-operator='moveOnBtn']");
const weekendPrice = new Date(); //Variable to adjust the price of each donut during the weekend
const isFriday = weekendPrice.getDay() === 5;
const isMonday = weekendPrice.getDay() === 1;
const time = weekendPrice.getHours();

let currentImageIndex = 0;
let indicatorDots;
let moveForwardTimer = null;
let shoppingCart;

// Fade-related variables
let opacityTimer = null;
let opacity = 100;
let firstImageOnTop = true;
const fadeTimeInSec = 1;
let displayState=0;
let lockState=0;
let donutName = document.querySelector('.donutName');
let dimmer = document.querySelector('.dimmer');
let last_clicked=0;


const donuts = [ //Array which stores all info about the donut, e.g. name
  { images: [ { img: "assets/photos/bild1.jpg", img2:"assets/photos/donut-with-sugar-hole2.jpg", alt: "Munk-med-socker", width: 100, height: "auto" } ], name: "Gottfrids ", category: "Klassisk", price: 35, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild2.jpg", img2:"assets/photos/donut-with-sugar.jpg", alt: "Munk-med-sylt", width: 100, height: "auto" } ], name: "Raspberry pie ", category: "Klassisk", price: 36, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild3.jpg", img2:"assets/photos/donut-with-icing-sugar2.jpg", alt: "Munk-med-florsocker", width: 100, height: "auto" } ], name: "Sugar dream ", category: "Klassisk", price: 37, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild5.jpg", img2:"assets/photos/donut-with-topping2.jpg", alt: "Munk-med-topping", width: 100, height: "auto" } ], name: "Dragon Tail ", category: "Klassisk", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild4.jpg", img2:"assets/photos/donut-with-sprinkles-frosting2.jpg", alt: "Munk-med-strossel", width: 100, height: "auto" } ], name: "Unicorn ", category: "Strössel", price: 42, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild6.jpg", img2:"assets/photos/donut-with-sprinkles-chocolate2.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Hungover ", category: "Strössel", price: 45, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild7.jpg", img2:"assets/photos/donut-with-smarties2.jpg", alt: "Munk-med-smarties", width: 100, height: "auto" } ], name: "Smarties ", category: "Strössel", price: 42, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild8.jpg", img2:"assets/photos/donut-with-character2.jpg", alt: "Munk-med-figur", width: 100, height: "auto" } ], name: "Monster ", category: "Strössel", price: 40, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild9.jpg", img2:"assets/photos/donut-with-chocolate-frosting2.jpg", alt: "Munk-med-choklad", width: 100, height: "auto" } ], name: "Chocoholic ", category: "Choklad", price: 39, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild10.jpg", img2:"assets/photos/Donut-with-chocolate-bits2.jpg", alt: "Munk-med-chokladbitar", width: 100, height: "auto" } ], name: "Chocoloco ", category: "Choklad", price: 41, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild11.jpg", img2:"assets/photos/donut-with-chocolate-sprinkles2.jpg", alt: "Munk-med-chokladstrossel", width: 100, height: "auto" } ], name: "Chocolate rain ", category: "Choklad", price: 41, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild12.jpg", img2:"assets/photos/donut-with-sprinkles-on-chocolate2.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Rainbow ", category: "Choklad", price: 42, rating: 5, totPrice: 0, totAmount: 0 },
];



let images = [
  {
    url: "",
  },
  {
    url: "",
  },
];


function init() { //Function to declare HTML elements
  standardPrice = document.querySelectorAll(".donut-price"); //Total price of donuts 
  donutContainer = document.querySelector(".donutContainer"); //Container surrounding each donut
  totalSum = document.querySelector(".totSum"); //HTML element to display total sum 
  priceContainer = document.querySelector(".priceContainer");
  sortDonuts = document.querySelector(".sortDonuts").addEventListener("change", updateSorting); //Adds an eventlistener to the sort donut list
  shoppingCartContainer = document.querySelector(".shoppingCartContainer");
  donutOrderedName = document.querySelector(".donutOrderedName");
  donutOrderedPrice =document.querySelector(".donutOrderedPrice");
  shoppingCart=document.querySelector(".shoppingCart")

  if ((isFriday && time >= 15) && (isMonday && time <= 03)) {
    for (let i = 0; i < donuts.length; i++) {
      console.log("Öka pris")
      donuts[i].price = Math.round(donuts[i].price * 1.15);
      console.log(donuts[i].price)
    }
  }

} //End init


function initButtons() { //Function to declare buttons
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
} //End initButtons
 

function initImg() {
  donutBox = document.querySelector(".donutBox");
  donutBox.style.display='none';
  //This is a click event for the donut popups. The click function first checksa if the donut image container is clicked.
  // If the donut image container is clicked, the HTML code is written and displayed as a block. A elif is used to make sure that the popup does not disappear,
  // if the popup is clicked on. At last the else is used to remove the popup if a click event occurs outside the popup box by displaying none.

  document.addEventListener("click", function (e) {
    if (lockState == 0){
    if (e.target.closest(".donut-image-container")) {
      img1.setAttribute('src',e.target.getAttribute('src'));
      img1.setAttribute('alt',e.target.getAttribute('alt'));
      donutName.innerHTML=e.target.parentElement.parentElement.querySelector("h2").innerHTML;
    if (displayState==0){

      dimmer.style.display="block";
      donutBox.style.display = 'block';
      document.body.style.overflow="hidden";
    }

    displayState=1;
    lockState=1;
      }}
    else{
    if (e.target.closest(".donutBox")) {
    }
    else{
      //document.html.style.backgroundColor="white";
      dimmer.style.display="none";
      donutBox.style.display = 'none';
      document.body.style.overflow="scroll";
      displayState=0;
      lockState=0;
      if (currentImageIndex + 1 > images.length - 1) {
        // Restart from beginning
        currentImageIndex = 0;
        swapImages(images.length - 1, currentImageIndex);
      } else {
        }
      highlightDot();
    }
    for (let i = 0; i < donuts.length; i++) {
      if(donuts[i].images[0].img===img1.getAttribute('src')){
        img2.setAttribute('src', donuts[i].images[0].img2);
      }
    }}
    images[0].url=img1.getAttribute('src');
    images[1].url=img2.getAttribute('src');
    img2.setAttribute('alt',img1.getAttribute('alt'))
  });
}


function highlightDot() {
  indicatorDots.forEach((dot, index) => {
    if (index === currentImageIndex) { // = * 3
      dot.classList.add('selected');
    } else {
      dot.classList.remove('selected');
    }
  });
}


function changeOpacity() {
  opacity -= 10;

  if (opacity <= -10) {
    clearInterval(opacityTimer);
    firstImageOnTop = !firstImageOnTop;
    opacity = 100;
  } else if (firstImageOnTop){
    img1.style.opacity = `${opacity}%`;
    img2.style.opacity = `${100 - opacity}%`;
  } else {
    img2.style.opacity = `${opacity}%`;
    img1.style.opacity = `${100 - opacity}%`;
  }
}


function swapImages(fadeOut, fadeIn) {
  const img1X = firstImageOnTop ? img1 : img2;
  const img2X = firstImageOnTop ? img2 : img1;

  img1X.setAttribute('src', images[fadeOut].url);
  img2X.setAttribute('src', images[fadeIn].url);
  opacityTimer = setInterval(changeOpacity, (fadeTimeInSec * 1000) / 25);
}


function nextImage() {
  if (Date.now()-last_clicked<500) return;
  last_clicked=Date.now()
  if (currentImageIndex + 1 > images.length - 1) {
    // Restart from beginning
    currentImageIndex = 0;
    swapImages(images.length - 1, currentImageIndex);
  } else {
    currentImageIndex += 1;
    swapImages(currentImageIndex - 1, currentImageIndex);
  }
  highlightDot();
}


function createDots() {
  const dotsContainer = document.querySelector('#indicatorDots');
  for (let i = 0; i < images.length; i++) {
    dotsContainer.innerHTML += `<span class="dot"></span>`;
  }
  indicatorDots = document.querySelectorAll('.dot');
  highlightDot();
}


function showDonuts() {  //Function to display what is in the array/the donuts
  donutContainer.innerHTML = "";
  //For-loop to loop through every donut
  for (let i = 0; i < donuts.length; i++) {
    let donutRating = "";
    for (let j = 0; j < donuts[i].rating; j++){
      donutRating += "<span class='fa fa-star checked'></span>";
    }
    for (let j = 0; j < 5 - donuts[i].rating; j++){
      donutRating += "<span class='fa fa-star'></span>";
    }    
    
    donutContainer.innerHTML += `
    <section class="donut-container">
      <div class="donut-image-container">
          <img src="${donuts[i].images[0].img}" alt="${donuts[i].images[0].alt}">
      </div>
      <div class="donut-info-container">
          <h2 class="donutName">${donuts[i].name}<span class="donut-price">${donuts[i].price}</span> kr</h2>
          <p class="donutCategory">${donuts[i].category}</p>
          <div class="ratingContainer">${donutRating}</div>
          
          <p>pris: <span class="tot-price">${donuts[i].totPrice}</span> kr</p>
          <p>antal: <span class="tot-amount">${donuts[i].totAmount}</span> st</p>
          <button data-operator="decreaseBtn" data-id = "${i}">-</button>
          <button data-operator="increaseBtn" data-id = "${i}">+</button>
      </div>
    </section>
    `;
  }
  /*for (let i = 0; i < donuts.rating; i++) {
    rating += `<div class="ratingContainer">fa fa-star checked</div>`
    }
    console.log(donuts[i].rating);*/
  showShoppingCart();
  initButtons();

}


function updateSorting(e) { //Function to update sorting
  const selectedSortingValue = e.currentTarget.value;

  if (selectedSortingValue === 'donutName') {
    sortAfterName();
  }

  if (selectedSortingValue === 'donutLowestPrice') {
    sortAfterLowPrice();
  }

  if (selectedSortingValue === 'donutHighestPrice') {
    sortAfterHighPrice();
  }
}


function sortAfterName () { //Function to sort array after name
  donuts.sort((donut1, donut2) => {
    if (donut1.name > donut2.name) {
      return 1;
    } else if(donut1.name < donut2.name) {
      return -1;
    }
    return 0;
  });
  console.table(donuts);
  showDonuts();
  initButtons()
}


function sortAfterLowPrice() {
  donuts.sort((donut1, donut2) => {
    return donut1.price - donut2.price;
  });

  showDonuts();
  initButtons();
}


function sortAfterHighPrice() {
  donuts.sort((donut1, donut2) => {
    return donut2.price - donut1.price;
  });

  showDonuts();
  initButtons();
}


function calculateTotalPrice() {
  const monday = new Date();
  let newSum; 
  //EJ DEFINERAD//priceContainer.innerHTML = "";
  const sum = donuts.reduce(
    (previousValue, donut) => {
      // Om kunden har beställt minst 10 munkar av samma sort
      //ska munkpriset för just denna munksort rabatteras med 10 %
      // Detta betydyder att , om antalet donuts <10 så ska vi inte ge rabatt.
      if (donut.totAmount < 10){ 
      return donut.totAmount * donut.price + previousValue;
    } // Om vi har 10 eller fler munkar av samma sort så lägger vi till 10% rabatt.
    else{
      return Math.round(donut.totAmount * donut.price*0.9) + previousValue;
    }
    },
    0
  );
  if (monday.getDay() === 2 && monday.getHours() < 10 ) { 
    newSum = Math.round(sum * 0.9);
    return newSum;
  } else {
    return sum;
  }

}

function showShoppingCart() {
  let sum = calculateTotalPrice();
  priceContainer.innerHTML = `
  <p> Totalsumma: <span class="totSum"> ${sum} </span> kr </p>`

  //printOrdredDonuts();


  
}

function printOrdredDonuts() {
  priceContainer.innerHTML = "";

  for(let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      pr.innerHTML += `<p>${donuts[i].name}</p>`;
    }
  }
}


function reduceTotDonut(e) { //Function to reduce total amount of donuts
  if (donuts[e.currentTarget.dataset.id].totAmount <= 0) {
    return;
  }
  donuts[e.currentTarget.dataset.id].totAmount -= 1;

  updateDonutSum();
  showShoppingCart();
  showShoppingCartView();
}

                                
function increaseTotDonut(e) { //Function to increase total amount of donuts
  donuts[e.currentTarget.dataset.id].totAmount += 1;

  updateDonutSum();
  showShoppingCart();
  showShoppingCartView();
}


function updateDonutSum() { //Function to update donut sum
  //Declaration of local variables

  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].totAmount < 10){
      donuts[i].totPrice = donuts[i].price * donuts[i].totAmount;
    } else{
      donuts[i].totPrice = Math.round(donuts[i].price * donuts[i].totAmount*0.9);
    }
  }
  
  showDonuts();

}

const sum = donuts.reduce(
  (previousValue, donut) => {
    // Om kunden har beställt minst 10 munkar av samma sort
    //ska munkpriset för just denna munksort rabatteras med 10 %
    // Detta betydyder att , om antalet donuts <10 så ska vi inte ge rabatt.
    if (donut.totAmount < 10){ 
    return donut.totAmount * donut.price + previousValue;
  } // Om vi har 10 eller fler munkar av samma sort så lägger vi till 10% rabatt.
  else{
    return Math.round(donut.totAmount * donut.price*0.9) + previousValue;
  }
  },
  0
);
function showShoppingCartView() {  //Function to display what is in the shopping cart
  shoppingCart.innerHTML = "";
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].totAmount == 0) {
    } else {

        shoppingCart.innerHTML += `
        <div class="donutOrderedContainer">
      <p class="donutOrderedName" id="${donuts[i].name}">Namn: ${donuts[i].name}</p>
      <p class="donutOrderedTotAmount" id="${donuts[i].totAmount}">Antal: ${donuts[i].totAmount}</p>
      <p class="donutOrderedPrice" id="${donuts[i].totPrice}"> Belopp: ${donuts[i].totPrice} kr</p>
      </div>`;
      }
  }
  if (shoppingCart.innerHTML.length > 0) { // Ifall varukorgen har mer en 0, alltså 1+ så visar vi varukorgen.
    let donutTotalPrice = calculateTotalPrice();
    shoppingCart.innerHTML += `<div class="donutTotalPrice">Totalpris: ${donutTotalPrice} kr</div>`;
    // visa det totala priset för alla valda munkar
    
    shoppingCartContainer.style.display ="block";
  }
  else{ // Om vi har noll varor så visar vi inte varukorgen mer.
    shoppingCartContainer.style.display ="none";
  }
}

function showOrderForm() {
    shoppingCartContainer.style.display = "none";
    orderForm.style.display = "block";
}


// Tillagt 221109 av Sussie
// generella variabler

const orderButton = document.querySelector("#order");
const nameField1 = document.querySelector("#name1");
const nameField2 = document.querySelector("#name2");
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
const consentOfPersonalData = document.querySelector("#consent")

// formulär

nameField1.addEventListener("change", checkFormAndToggleOrderButton);
nameField2.addEventListener("change", checkFormAndToggleOrderButton);
addressField.addEventListener("change", checkFormAndToggleOrderButton);
zipcodeField.addEventListener("change", checkFormAndToggleOrderButton);
cityField.addEventListener("change", checkFormAndToggleOrderButton);
phoneField.addEventListener("change", checkFormAndToggleOrderButton);
emailField.addEventListener("change", checkFormAndToggleOrderButton);
consentOfPersonalData.addEventListener("change", checkFormAndToggleOrderButton);

function checkFormAndToggleOrderButton() {
  if (checkName1() && checkName2() && checkAddress() && checkZipcode() && checkCity() && checkPhoneNumber() && checkEmail() && checkConsent()) {
    activateOrderButton();
  } else {
    disableOrderButton();
  }
}

function checkName1() {
  if (nameField1.value.length > 1) {
   //Kollar att det är mer än ett tecken
    return true;
  } else {
    return false;
  }
}

function checkName2() {
  if (nameField2.value.length > 1) {
    //Kollar att det är mer än ett tecken
    return true;
  } else {
    return false;
  }
}

function checkAddress() {
  if (/^.{1,}\s{1,}[^\s]{1,}$/.test(addressField.value)) {
    return true;
  } else {
    return false;
  }
}

function checkZipcode() {
  if (/^[0-9]{3}\s?[0-9]{2}$/.test(zipcodeField.value)) {
    return true;
  } else {
    return false;
  }
}

function checkCity() {
  if (cityField.value.length > 1) {
    //Kollar att det är minst ett tecken
    return true;
  } else {
    return false;
  }
}

function checkPhoneNumber () {
    if(/^(\+?46|0)7\d{8}$/.test(phoneField.value)) {
        return true;
    } else {
        return false;
    }
}

function checkEmail () {
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailField.value)) {
        return true;
    } else {
        return false;
    }
}

function checkConsent() {
    return consentOfPersonalData.checked;
}
function activateOrderButton() {
  orderButton.removeAttribute("disabled");
}
function disableOrderButton() {
  orderButton.setAttribute("disabled", true);
}

paymentMethodCard.addEventListener("click", showCardContent);
paymentMethodInvoice.addEventListener("click", showInvoiceContent);

function showInvoiceContent() {
  document.querySelector(".paymentCardContainer").classList.remove("visible");
  document.querySelector(".paymentInvoiceContainer").classList.add("visible");
}

function showCardContent() {
  document.querySelector(".paymentInvoiceContainer").classList.remove("visible");
  document.querySelector(".paymentCardContainer").classList.add("visible");
}


document.getElementById("nav-links").onclick = function () {
document.getElementById("checkbox").style.display= "none";
document.querySelector(".menuCloser").style.display ="none";
document.querySelector(".menuOpener").style.display ="block";
};

document.querySelector(".menuOpener").onclick = function () {
document.getElementById("checkbox").style.display= "block";
document.querySelector(".menuCloser").style.display ="block";
document.querySelector(".menuOpener").style.display ="none";
}

document.querySelector(".menuCloser").onclick = function () {
  document.getElementById("checkbox").style.display= "none";
  document.querySelector(".menuCloser").style.display ="none";
  document.querySelector(".menuOpener").style.display ="block";
}

/*document.addEventListener("click", showShoppingCartView);*/
nextBtn.addEventListener('click', nextImage);
nextBtn2.addEventListener('click', nextImage);
showOrderFormButton.addEventListener('click',showOrderForm);
createDots();
setInterval(time,1000);

init();
showDonuts();
initButtons();
initImg();