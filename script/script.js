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

let currentImgIndex = 0;
let indicatorDots;
let moveForwardTimer = null;

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

//Donuts
    /*images: [
      {
        url: 'assets/photos/bild1.jpg',
        alt: 'Munk 1',
        width: 100,
        height: 'auto'
      }, // `<img src='${images[i].url}' alt='${images[i].alt}' width='${images[i].width}' class="donut-img">`
    ],*/
const donuts = [ //Array which stores all info about the donut, e.g. name
  { images: [ { img: "assets/photos/bild1.jpg", img2:"assets/photos/donut-with-sugar-hole2.jpg", alt: "Munk-med-socker", width: 100, height: "auto" } ], name: "Gottfrids ", category: "Klassisk", price: 35, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild2.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-sylt", width: 100, height: "auto" } ], name: "Raspberry pie ", category: "Klassisk", price: 36, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild3.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-florsocker", width: 100, height: "auto" } ], name: "Sugar dream ", category: "Klassisk", price: 37, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild5.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-topping", width: 100, height: "auto" } ], name: "Dragon Tail ", category: "Klassisk", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild4.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-strossel", width: 100, height: "auto" } ], name: "Unicorn ", category: "Strössel", price: 42, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild6.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Hungover ", category: "Strössel", price: 45, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild7.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-smarties", width: 100, height: "auto" } ], name: "Smarties ", category: "Strössel", price: 42, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild8.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-figur", width: 100, height: "auto" } ], name: "Monster ", category: "Strössel", price: 40, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild9.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-choklad", width: 100, height: "auto" } ], name: "Chocoholic ", category: "Choklad", price: 39, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild10.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-chokladbitar", width: 100, height: "auto" } ], name: "Chocoloco ", category: "Choklad", price: 41, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild11.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-chokladstrossel", width: 100, height: "auto" } ], name: "Chocolate rain ", category: "Choklad", price: 41, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild12.jpg", img2:"assets/photos/bild11.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Rainbow ", category: "Choklad", price: 42, rating: 5, totPrice: 0, totAmount: 0 },
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
  sortDonuts = document.querySelector(".sortDonuts").addEventListener("change", sort1Donuts);
  dimmer.addEventListener("click", removePopUp);
  
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
    for (let i = 0; i < donuts.length; i++) {
      img1.setAttribute('src', donuts[i].images[0].img);
      img1.setAttribute('alt', donuts[i].images[0].alt);
  
      img2.setAttribute('src', donuts[i].images[0].img2);
      img2.setAttribute('alt', donuts[i].images[0].alt);
    }

    if(lockState == 0){

    if (e.target.closest(".donut-image-container")) {
      img1.setAttribute('src',e.target.getAttribute('src'));
      donutName.innerHTML=e.target.parentElement.parentElement.querySelector("h2").innerHTML;
    if (displayState==0){
      images[0].url=img1.getAttribute('src');
      images[1].url=img2.getAttribute('src');
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
      images[0].url=img1.getAttribute('src');
      images[1].url=img2.getAttribute('src');
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
  });
}

function highlightDot() {
  indicatorDots.forEach((dot, index) => {
    if (index === currentImgIndex) { // = * 3
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

  console.log(img1X)
  console.log(img2X)
  img1X.setAttribute('src', images[fadeOut].url);
  img1X.setAttribute('alt', images[fadeOut].alt);

  img2X.setAttribute('src', images[fadeIn].url);
  img2X.setAttribute('alt', images[fadeIn].alt);

  opacityTimer = setInterval(changeOpacity, (fadeTimeInSec * 1000) / 10);
}

function nextImage() {
  
  if (Date.now()-last_clicked<500) return;
  last_clicked=Date.now()
  if (currentImageIndex + 1 > images.length - 1) {
    // Restart from beginning
    currentImageIndex = 0;
    swapImages(images.length - 1, currentImageIndex);
  } else {
    currentImgIndex -= 1;
    swapImages(currentImgIndex + 1, currentImgIndex);
  }
  console.log('prevImage', currentImgIndex);
  highlightDot();
}

function createDots() {
  const dotsContainer = document.querySelector('#indicatorDots');
  console.log(images.length)
  for (let i = 0; i < images.length; i++) {
    dotsContainer.innerHTML += `<span class="dot" data-index="${i}"></span>`;
  }
  indicatorDots = document.querySelectorAll('.dot');
  
  indicatorDots.forEach((dot) => {
    dot.addEventListener('click', goToImageIndex);
  });

  highlightDot();
}

/*function autoPlay() {
  moveForwardTimer = setInterval(nextImage, 1000);
}
*/

/*function pauseAutoplay() {
  console.log('autoplay paused');
  clearInterval(moveForwardTimer);
}*/

function showDonuts() {  //Function to display what is in the array/the donuts
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
  }

  showShoppingCart();
  initButtons();
}

function updateSorting(e) { //Function to update sorting
  const selectedSortingValue = e.currentTarget.value;
  if (selectedSortingValue === 'donutName') {
    sortAfterName();
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
}


/**Todo
 * Skapa en product.sort funktion = donuts.sort()
 * Lägg in två parametrar 
 * Returnera värdet
 * Kör en console.table för att se att det fungerar
 */

function sort1Donuts() {
  donuts.sort((donut1, donut2) => {
    return donut1.name > donut2.name; 
  });
  console.table(donuts)
  showDonuts();
  initButtons();
}

function showShoppingCart() {
  //EJ DEFINERAD//priceContainer.innerHTML = "";
  const sum = donuts.reduce(
    (previousValue, donut) => {
      return (donut.totAmount * donut.price) + previousValue;
    },
    0
  );

  printOrdredDonuts();


  priceContainer.innerHTML = `
  <p> Totalsumma: <span class="totSum"> ${sum} </span> kr </p>`
}

function printOrdredDonuts() {
  //EJ DEFINERAD// priceContainer.innerHTML = "";

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
}

                                
function increaseTotDonut(e) { //Function to increase total amount of donuts
  donuts[e.currentTarget.dataset.id].totAmount += 1;

  updateDonutSum();
  showShoppingCart();
}


function updateDonutSum() { //Function to update donut sum
  //Declaration of local variables

  const monday = new Date();

  for (let i = 0; i < donuts.length; i++) {
      donuts[i].totPrice = donuts[i].price * donuts[i].totAmount;
  }

  showDonuts();
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

// formulär

nameField1.addEventListener("change", checkFormAndToggleOrderButton);
nameField2.addEventListener("change", checkFormAndToggleOrderButton);
addressField.addEventListener("change", checkFormAndToggleOrderButton);
zipcodeField.addEventListener("change", checkFormAndToggleOrderButton);
cityField.addEventListener("change", checkFormAndToggleOrderButton);

function checkFormAndToggleOrderButton() {
  if (checkName1() && checkName2() && checkAddress() && checkZipcode()) {
    activateOrderButton();
  } else {
    disableOrderButton();
  }
}

function checkName1() {
  if (nameField1.value.length > 1) {
    //Kollar att det finns mellanslag i namnet
    return true;
  } else {
    return false;
  }
}

function checkName2() {
  if (nameField2.value.length > 1) {
    //Kollar att det finns mellanslag i namnet
    return true;
  } else {
    return false;
  }
}

function checkAddress() {
  if (addressField.value.indexOf(" ") > -1) {
    return true;
  } else {
    return false;
  }
}

function checkZipcode() {
  if (zipcodeField.value.length == 5) {
    return true;
  } else {
    return false;
  }
}

function checkCity() {
  if (cityField.value.length > 1) {
    //Kollar att det finns mellanslag i namnet
    return true;
  } else {
    return false;
  }
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
  document
    .querySelector(".paymentInvoiceContainer").classList.remove("visible");
  document.querySelector(".paymentCardContainer").classList.add("visible");
}

document.getElementById("nav-links").onclick = function () {
  document.getElementById("toggle").click();
};


nextBtn.addEventListener('click', nextImage);
nextBtn2.addEventListener('click', nextImage);
createDots();
document.querySelector(".sortDonuts").addEventListener('change', updateSorting);


init();
showDonuts();
initButtons();
initImg();

