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
let discountCodeFactor = 1; //Variable to set discount to 1 or 0
let shippingFee = 25; //Standard shipping fee

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");

const nextBtn = document.querySelector("#previousImage");
const nextBtn2 = document.querySelector("#nextImage");

const slideshow = document.querySelector("#slideshow");

const orderForm = document.querySelector(".checkout-container");
const showOrderFormButton = document.querySelector(
  "button[data-operator='moveOnBtn']"
);
const weekendPrice = new Date(); //Variable to adjust the price of each donut during the weekend
const isFriday = weekendPrice.getDay() === 5;
const isMonday = weekendPrice.getDay() === 1;
const time = weekendPrice.getHours();
const discountElement = document.querySelector("#discountCode");

const priceRangeSlider = document.querySelector("#priceRange"); //Constant to refer to the HTML element priceRange
const currentRangeValue = document.querySelector("#currentRangeValue"); //Constant to refer to the HTML element currentRangeValue

let currentImageIndex = 0;
let indicatorDots;
let moveForwardTimer = null;
let shoppingCart;

let minuteTimer; //Används för att veta när vi öppnat orderformuläret.
let deliveryInfo = 30; // Denna variabel är leveranstiden.
// Fade-related variables
let opacityTimer = null;
let opacity = 100;
let firstImageOnTop = true;
const fadeTimeInSec = 1;
let donutName = document.querySelector(".donutName");
let dimmer = document.querySelector(".dimmer");
let last_clicked = 0;
let maxFilterPrice = 500;
let openImage;

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

function init() {
  //Function to declare HTML elements
  standardPrice = document.querySelectorAll(".donut-price"); //Total price of donuts
  donutContainer = document.querySelector(".donutContainer"); //Container surrounding each donut
  totalSum = document.querySelector(".totSum"); //HTML element to display total sum
  priceContainer = document.querySelector(".priceContainer");
  sortDonuts = document.querySelector(".sortDonuts").addEventListener("change", updateSorting); //Adds an eventlistener to the sort donut list
  shoppingCartContainer = document.querySelector(".shoppingCartContainer");
  donutOrderedName = document.querySelector(".donutOrderedName");
  donutOrderedPrice = document.querySelector(".donutOrderedPrice");
  shoppingCart = document.querySelector(".shoppingCart");
  priceRangeSlider.addEventListener("input", changePriceRange); //Adds an eventlistener to changePriceRange

  if (isFriday && time >= 15 && isMonday && time <= 03) {
    for (let i = 0; i < donuts.length; i++) {
      console.log("Öka pris");
      donuts[i].price = Math.round(donuts[i].price * 1.15);
      console.log(donuts[i].price);
    }
  }
  checkName1() ||
    checkName2() ||
    checkAddress() ||
    checkZipcode() ||
    checkCity() ||
    checkPhoneNumber() ||
    checkEmail() ||
    checkConsent() ||
    checkPersonalNumber();
} //End init

function initButtons() {
  //Function to declare buttons
  //Declare variables
  btnLower = document.querySelectorAll("button[data-operator='decreaseBtn']");
  btnHigher = document.querySelectorAll("button[data-operator='increaseBtn']");
  donutImages = document.querySelectorAll("img[data-operator='donutImage']");

  //Calling functions
  for (let i = 0; i < btnLower.length; i++) {
    btnLower[i].addEventListener("click", reduceTotDonut);
  }
  for (let i = 0; i < btnHigher.length; i++) {
    btnHigher[i].addEventListener("click", increaseTotDonut);
  }
  for (let i = 0; i < donutImages.length; i++) 
  {donutImages[i].addEventListener("keyup", checkKeyPressAndOpenImage);}
} //End initButtons

function initImg() {
  donutBox = document.querySelector(".donutBox");
  donutBox.style.display = "none";
  const donutImageContainer = document.querySelectorAll(".donut-image-container");
  donutImageContainer.forEach((item) => {
    item.addEventListener("click", SlideShowAttributes);
  });
  donutBox.addEventListener("click", imageSlideShow);
  document.querySelector("html").addEventListener("click", closeSlideShow);
}

function highlightDot() {
  indicatorDots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      // = * 3
      dot.classList.add("selected");
    } else {
      dot.classList.remove("selected");
    }
  });
}

function changeOpacity() {
  opacity -= 10;

  if (opacity <= -10) {
    clearInterval(opacityTimer);
    firstImageOnTop = !firstImageOnTop;
    opacity = 100;
  } else if (firstImageOnTop) {
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

  img1X.setAttribute("src", images[fadeOut].url);
  img2X.setAttribute("src", images[fadeIn].url);
  opacityTimer = setInterval(changeOpacity, (fadeTimeInSec * 1000) / 25);
}

function nextImage() {
  if (Date.now() - last_clicked < 500) return; //Tittar ifall ett klick på knappen har skett inom en halv sekund. Ifall man tryckt på knappen inom en halv sekund så kommer man inte kunna gå vidare i koden.
  last_clicked = Date.now();
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
  const dotsContainer = document.querySelector("#indicatorDots");
  for (let i = 0; i < images.length; i++) {
    dotsContainer.innerHTML += `<span class="dot"></span>`;
  }
  indicatorDots = document.querySelectorAll(".dot");
  highlightDot();
}

function showDonuts() {
  //Function to display what is in the array/the donuts
  donutContainer.innerHTML = "";
  //For-loop to loop through every donut
  for (let i = 0; i < donuts.length; i++) {
    let donutRating = "";
    for (let j = 0; j < donuts[i].rating; j++) {
      donutRating += "<span class='fa fa-star checked'></span>";
    }
    for (let j = 0; j < 5 - donuts[i].rating; j++) {
      donutRating += "<span class='fa fa-star'></span>";
    }
    if (donuts[i].price <= maxFilterPrice) {
      donutContainer.innerHTML += `
      <section class="donut-container">
        <div class="donut-image-container">
        <img src="${donuts[i].images[0].img}" alt="${donuts[i].images[0].alt}" data-operator="donutImage" tabindex=0 >
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
  }

  showShoppingCart();
  initButtons();
}

function changePriceRange(e) {
  maxFilterPrice = priceRangeSlider.value;
  currentRangeValue.innerHTML = maxFilterPrice;

  //filteredDonutsInPriceRange = filteredDonuts.filter((donut) => donut.price <= currentPrice);

  showDonuts();
}

function updateSorting(e) {
  //Function to update sorting
  const selectedSortingValue = e.currentTarget.value;

  if (selectedSortingValue === "donutName") {
    sortAfterName();
  }

  if (selectedSortingValue === "donutLowestPrice") {
    sortAfterLowPrice();
  }

  if (selectedSortingValue === "donutHighestPrice") {
    sortAfterHighPrice();
  }

  if (selectedSortingValue === "donutRating") {
    sortAfterRating();
  }

  if (selectedSortingValue === "donutCategory") {
    sortAfterCategory();
  }
}

function sortAfterName() {
  //Function to sort array after name
  donuts.sort((donut1, donut2) => {
    if (donut1.name > donut2.name) {
      return 1;
    } else if (donut1.name < donut2.name) {
      return -1;
    }
    return 0;
  });
  showDonuts();
  initButtons();
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


function sortAfterRating() {
  donuts.sort((donut1, donut2) => {
    return donut2.rating - donut1.rating;
  });

  showDonuts();
  initButtons();
}


function sortAfterCategory() {
  donuts.sort((donut1, donut2) => {
    if (donut1.category > donut2.category) {
      return 1
    } else if (donut1.category < donut2.category) {
      return -1
    } else {
      return 0
    }
    
      
  });

  showDonuts();
  initButtons();
}


function checkKeyPressAndOpenImage(e) {
  if( e.key === 'Enter') {
    e.currentTarget.click();
  }
}

function calculateTotalPrice() {
  const monday = new Date();
  let newSum;
  //EJ DEFINERAD//priceContainer.innerHTML = "";
  const sum = donuts.reduce((previousValue, donut) => {
    // Om kunden har beställt minst 10 munkar av samma sort
    //ska munkpriset för just denna munksort rabatteras med 10 %
    // Detta betydyder att , om antalet donuts <10 så ska vi inte ge rabatt.
    if (donut.totAmount < 10) {
      return donut.totAmount * donut.price + previousValue;
    } // Om vi har 10 eller fler munkar av samma sort så lägger vi till 10% rabatt.
    else {
      return Math.round(donut.totAmount * donut.price * 0.9) + previousValue;
    }
  }, 0);
  if (monday.getDay() === 2 && monday.getHours() < 10) {
    newSum = Math.round(sum * 0.9);
    return newSum * discountCodeFactor;
  } else {
    return sum * discountCodeFactor;
  }
}

function showShoppingCart() {
  let sum = calculateTotalPrice();
  priceContainer.innerHTML = `
  <p> Totalsumma: <span class="totSum"> ${sum} </span> kr </p>`;
}

function printOrdredDonuts() {
  priceContainer.innerHTML = "";

  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].amount > 0) {
      pr.innerHTML += `<p>${donuts[i].name}</p>`;
    }
  }
}

function reduceTotDonut(e) {
  //Function to reduce total amount of donuts
  if (donuts[e.currentTarget.dataset.id].totAmount <= 0) {
    return;
  }
  if (orderForm.style.display === "" || orderForm.style.display === "none") {
    donuts[e.currentTarget.dataset.id].totAmount -= 1;
    checkSumInvoice();
    updateDonutSum();
    showShoppingCart();
    showShoppingCartView();
  }
}

function increaseTotDonut(e) {
  //Function to increase total amount of donuts
  if (orderForm.style.display === "" || orderForm.style.display === "none") {
    donuts[e.currentTarget.dataset.id].totAmount += 1;
    checkSumInvoice();
    updateDonutSum();
    showShoppingCart();
    showShoppingCartView();
  }
}

function updateDonutSum() {
  //Function to update donut sum
  //Declaration of local variables

  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].totAmount < 10) {
      donuts[i].totPrice = donuts[i].price * donuts[i].totAmount;
    } else {
      donuts[i].totPrice = Math.round(
        donuts[i].price * donuts[i].totAmount * 0.9
      );
    }
  }

  showDonuts();
}

function showShoppingCartView() {
  //Function to display what is in the shopping cart
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
  if (shoppingCart.innerHTML.length > 0) {
    // Ifall varukorgen har mer en 0, alltså 1+ så visar vi varukorgen.
    let donutTotalPrice = calculateTotalPrice();
    shoppingCart.innerHTML += `<div class="donutTotalPrice">Totalpris: ${donutTotalPrice} kr</div>`;
    // visa det totala priset för alla valda munkar

    shoppingCartContainer.style.display = "block";
  } else {
    // Om vi har noll varor så visar vi inte varukorgen mer.
    shoppingCartContainer.style.display = "none";
  }
}

function showOrderForm() {
  shoppingCartContainer.style.display = "none";
  orderForm.style.display = "block";
  orderForm.scrollIntoView();
  minuteTimer = new Date().getTime();
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
const personalNumber = document.querySelector("#personalnumber");
const consentOfPersonalData = document.querySelector("#consent");

// formulär

nameField1.addEventListener("change", checkFormAndToggleOrderButton);
nameField2.addEventListener("change", checkFormAndToggleOrderButton);
addressField.addEventListener("change", checkFormAndToggleOrderButton);
zipcodeField.addEventListener("change", checkFormAndToggleOrderButton);
cityField.addEventListener("change", checkFormAndToggleOrderButton);
phoneField.addEventListener("change", checkFormAndToggleOrderButton);
emailField.addEventListener("change", checkFormAndToggleOrderButton);
consentOfPersonalData.addEventListener("change", checkFormAndToggleOrderButton);
discountElement.addEventListener("change", changeDiscountFactor);
paymentMethodInvoice.addEventListener("change", checkFormAndToggleOrderButton);
personalNumber.addEventListener("change", checkFormAndToggleOrderButton);

function checkFormAndToggleOrderButton() {
  if (
    checkName1() &&
    checkName2() &&
    checkAddress() &&
    checkZipcode() &&
    checkCity() &&
    checkPhoneNumber() &&
    checkEmail() &&
    checkConsent() &&
    checkPersonalNumber()
  ) {
    activateOrderButton();
  } else {
    disableOrderButton();
  }
}

function checkName1() {
  if (nameField1.value.length > 1) {
    //Kollar att det är mer än ett tecken
    const errormMessageFirstname = document.querySelector(
      "#errormessagefirstname"
    );
    errormMessageFirstname.innerHTML = "";
    errormMessageFirstname.style.border = "";
    return true;
  } else {
    const errormMessageFirstname = document.querySelector(
      "#errormessagefirstname"
    );
    errormMessageFirstname.innerHTML = "Vänligen fyll i ditt förnamn!";
    errormMessageFirstname.style.border = "solid 2px red";
    return false;
  }
}

function checkName2() {
  if (nameField2.value.length > 1) {
    //Kollar att det är mer än ett tecken
    const errormMessageSurname = document.querySelector("#errormessagesurname");
    errormMessageSurname.innerHTML = "";
    errormMessageSurname.style.border = "";
    return true;
  } else {
    const errormMessageSurname = document.querySelector("#errormessagesurname");
    errormMessageSurname.innerHTML = "Vänligen fyll i ditt efternamn!";
    errormMessageSurname.style.border = "solid 2px red";
    return false;
  }
}

function checkAddress() {
  if (/^.{1,}\s{1,}[^\s]{1,}$/.test(addressField.value)) {
    const errormMessageAddress = document.querySelector("#errormessageaddress");
    errormMessageAddress.innerHTML = "";
    errormMessageAddress.style.border = "";
    return true;
  } else {
    const errormMessageAddress = document.querySelector("#errormessageaddress");
    errormMessageAddress.innerHTML = "Vänligen fyll i din adress!";
    errormMessageAddress.style.border = "solid 2px red";
    return false;
  }
}

function checkZipcode() {
  if (/^[0-9]{3}\s?[0-9]{2}$/.test(zipcodeField.value)) {
    const errormMessageZipcode = document.querySelector("#errormessagezipcode");
    errormMessageZipcode.innerHTML = "";
    errormMessageZipcode.style.border = "";
    return true;
  } else {
    const errormMessageZipcode = document.querySelector("#errormessagezipcode");
    errormMessageZipcode.innerHTML =
      "Vänligen fyll i din postnummer, fem siffror!";
    errormMessageZipcode.style.border = "solid 2px red";
    return false;
  }
}

function checkCity() {
  if (cityField.value.length > 1) {
    //Kollar att det är minst ett tecken
    const errormMessageCity = document.querySelector("#errormessagecity");
    errormMessageCity.innerHTML = "";
    errormMessageCity.style.border = "";
    return true;
  } else {
    const errormMessageCity = document.querySelector("#errormessagecity");
    errormMessageCity.innerHTML = "Vänligen fyll i din postort!";
    errormMessageCity.style.border = "solid 2px red";
    return false;
  }
}

function checkPhoneNumber() {
  if (/^(\+?46|0)7\d{8}$/.test(phoneField.value)) {
    const errormMessagePhone = document.querySelector("#errormessagephone");
    errormMessagePhone.innerHTML = "";
    errormMessagePhone.style.border = "";
    return true;
  } else {
    const errormMessagePhone = document.querySelector("#errormessagephone");
    errormMessagePhone.innerHTML = "Vänligen fyll i ditt svenska mobilnummer!";
    errormMessagePhone.style.border = "solid 2px red";
    return false;
  }
}

function checkEmail() {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailField.value)) {
    const errormMessageEmail = document.querySelector("#errormessageemail");
    errormMessageEmail.innerHTML = "";
    errormMessageEmail.style.border = "";
    return true;
  } else {
    const errormMessageEmail = document.querySelector("#errormessageemail");
    errormMessageEmail.innerHTML = "Vänligen fyll i din email, ex abc@123.com";
    errormMessageEmail.style.border = "solid 2px red";
    return false;
  }
}

function checkPersonalNumber() {
  if (paymentMethodCard.checked) {
    return true;
  }

  if (
    /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})$/.test(
      personalNumber.value
    )
  ) {
    const errorMessagePersonalNumber = document.querySelector(
      "#errormessagepersonalnumber"
    );
    errorMessagePersonalNumber.innerHTML = "";
    errorMessagePersonalNumber.style.border = "";
    return true;
  } else {
    const errorMessagePersonalNumber = document.querySelector(
      "#errormessagepersonalnumber"
    );
    errorMessagePersonalNumber.innerHTML =
      "Vänligen fyll i ditt personnummer enligt format yymmdd-xxxx";
    errorMessagePersonalNumber.style.border = "solid 2px red";
    return false;
  }
}

function checkSumInvoice() {
  if (calculateTotalPrice() <= 800) {
    paymentMethodInvoice.removeAttribute("disabled");
  } else {
    paymentMethodInvoice.setAttribute("disabled", true);
    //Här behöver vi lägga till så att "card" väljs så att kunden inte kan välja faktura och sedan höja priset
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

function changeDiscountFactor() {
  if (discountElement.value === "a_damn_fine-cup_of-coffee") {
    discountCodeFactor = 0;
  } else discountCodeFactor = 1;
  showShoppingCart();
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
  document.getElementById("checkbox").style.display = "none";
  document.querySelector(".menuCloser").style.display = "none";
  document.querySelector(".menuOpener").style.display = "block";
};

document.querySelector(".menuOpener").onclick = function () {
  document.getElementById("checkbox").style.display = "block";
  document.querySelector(".menuCloser").style.display = "block";
  document.querySelector(".menuOpener").style.display = "none";
};

document.querySelector(".menuCloser").onclick = function () {
  document.getElementById("checkbox").style.display = "none";
  document.querySelector(".menuCloser").style.display = "none";
  document.querySelector(".menuOpener").style.display = "block";
};

document.querySelector(".shoppingCloser").onclick = function (){
  shoppingCartContainer.style.display="none";
  shoppingCartContainer.style.top="";
  shoppingCartContainer.style.left="";
  shoppingCartContainer.querySelector("h2").innerHTML="Varukorg";
  document.querySelector(".shoppingCartButton").style.display="block";
  for(let i=0; i< donuts.length;i++)
  {
    donuts[i].totPrice=0;
    donuts[i].totAmount=0;
  }
  showShoppingCartView();
  updateDonutSum();
}

document.querySelector(".toSlowCloser").onclick = function(){
  document.querySelector(".toSlowContainer").style.display="none";
}

document.querySelector(".buttonOrder").onclick = function () {
  shoppingCartContainer.querySelector("h2").innerHTML =
    "Tack för din beställning! Beräknad leveranstid: " +
    deliveryInfo.toString() +
    " min" +
    "<br/>" +
    "Din beställning består av följande:";
  shoppingCartContainer.style.display = "block";
  orderForm.style.display = "none";
  shoppingCartContainer.style.top = "50%";
  shoppingCartContainer.style.left = "50%";
  document.querySelector(".shoppingCartButton").style.display = "none";
};

/*document.addEventListener("click", showShoppingCartView);*/
nextBtn.addEventListener("click", nextImage);
nextBtn2.addEventListener("click", nextImage);
showOrderFormButton.addEventListener("click", showOrderForm);

function orderCloseTimer() {
  let countDown = new Date().getTime();
  let minuteWaited = Math.floor(
    ((countDown - minuteTimer) % (1000 * 60 *60)) / (1000*60 )
  );
  if (minuteWaited >= 15 && orderForm.style.display=="block") {
    orderForm.style.display = "none";
    document.querySelector(".toSlowContainer").style.display="flex";
  }
}


  // If the donut image container is clicked, the HTML code is written and displayed as a block. A elif is used to make sure that the popup does not disappear,
  // if the popup is clicked on. At last the else is used to remove the popup if a click event occurs outside the popup box by displaying none.
function closeSlideShow(e) {
  const isClosest =e.target.closest(".donutBox");
  const onImageClick = e.target.closest(".donut-image-container");
  if(!isClosest && !onImageClick){
    dimmer.style.display = "none";
    donutBox.style.display = "none";
    document.body.style.overflow ="";
    if (currentImageIndex + 1 > images.length - 1) {
      // Restart from beginning
      currentImageIndex = 0;
      swapImages(images.length - 1, currentImageIndex);
    }
    highlightDot();
  }
}

function SlideShowAttributes(e) {
  img1.setAttribute("src", e.target.getAttribute("src"));
  img1.setAttribute("alt", e.target.getAttribute("alt"));
  donutName.innerHTML =e.target.parentElement.parentElement.querySelector("h2").innerHTML;

  document.body.style.overflow = "scroll";

    dimmer.style.display = "block";
    donutBox.style.display = "block";
    document.body.style.overflow = "hidden";

  images[0].url = img1.getAttribute("src");
  images[1].url = img2.getAttribute("src");
  img2.setAttribute("alt", img1.getAttribute("alt"));
}

function imageSlideShow(e) {
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].images[0].img === img1.getAttribute("src")) {
      img2.setAttribute("src", donuts[i].images[0].img2);
    }
  }
}

function removeCartItems(){
  donutContainer.scrollIntoView();
  orderForm.style.display="none";
  for(let i=0; i< donuts.length;i++)
  {
    donuts[i].totPrice=0;
    donuts[i].totAmount=0;
  }
  showShoppingCartView();
  updateDonutSum();
}

document.querySelector(".discardOrder").addEventListener("click",removeCartItems);

createDots();
setInterval(time, 1000);
setInterval(orderCloseTimer, 5000);
init();
showDonuts();
initButtons();
initImg();
