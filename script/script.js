//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
//let newPrice; //Variable to show new price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts
let donutContainer; //Variable to select donutContainer from HTML
let donutBox; //Variable to select donut pop up

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");

const nextBtn = document.querySelector('#nextImage');
const nextBtn2 = document.querySelector('#nextImage2');

let currentImageIndex = 0;

let indicatorDots = [];

let moveForwardTimer = null;

// Fade-related variables
let opacityTimer = null;
let opacity = 100;
let firstImageOnTop = true;
const fadeTimeInSec = 1;
let displayState=0;
let lockState=0;
let donutName;
let dimmer = document.querySelector('.dimmer');

//Donuts
    /*images: [
      {
        url: 'assets/photos/bild1.jpg',
        alt: 'Munk 1',
        width: 100,
        height: 'auto'
      }, // `<img src='${images[i].url}' alt='${images[i].alt}' width='${images[i].width}' class="donut-img">`
    ],*/
const donuts = [
  { images: [ { img: "assets/photos/bild1.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-socker", width: 100, height: "auto" } ], name: "Classic ", category: "Övrigt", price: 35, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild2.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-sylt", width: 100, height: "auto" } ], name: "Raspberry pie ", category: "Övrigt", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild3.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-florsocker", width: 100, height: "auto" } ], name: "Sugar dream ", category: "Övrigt", price: 40, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild5.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-topping", width: 100, height: "auto" } ], name: "Dragon Tail ", category: "Övrigt", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild4.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-strossel", width: 100, height: "auto" } ], name: "Unicorn ", category: "Strössel", price: 40, rating: 5, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild6.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Hungover ", category: "Strössel", price: 40, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild7.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-smarties", width: 100, height: "auto" } ], name: "Smarties ", category: "Strössel", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild8.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-figur", width: 100, height: "auto" } ], name: "Monster ", category: "Strössel", price: 40, rating: 3, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild9.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-choklad", width: 100, height: "auto" } ], name: "Chocoholic ", category: "Choklad", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild10.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-chokladbitar", width: 100, height: "auto" } ], name: "Chocoloco ", category: "Choklad", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild11.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-chokladstrossel", width: 100, height: "auto" } ], name: "Chocolate rain ", category: "Choklad", price: 40, rating: 4, totPrice: 0, totAmount: 0 },
  { images: [ { img: "assets/photos/bild12.jpg",img2:"assets/photos/bild11.jpg", alt: "Munk-med-choklad-och-strossel", width: 100, height: "auto" } ], name: "Rainbow ", category: "Övrigt", price: 40, rating: 5, totPrice: 0, totAmount: 0 },
];

let images = [
  {
    url: '',
  },
  {
    url: '',
  },
];

function init() {
  //Declares variables
  standardPrice = document.querySelectorAll(".donut-price");
  donutContainer = document.querySelector(".donutContainer"); 
  donutName = document.querySelector("#donutName");
} //End init


function initButtons() {
  //Declares variables
  btnLower = document.querySelectorAll("button[data-operator='decreaseBtn']");
  btnHigher = document.querySelectorAll("button[data-operator='increaseBtn']");
  
  //Calling functions
  for (let i = 0; i < btnLower.length; i++) {
    btnLower[i].addEventListener("click", reduceTotDonut);
    console.log("Added an event listener");
  }
  for (let i = 0; i < btnHigher.length; i++) {
    btnHigher[i].addEventListener("click", increaseTotDonut);
  }
} //End init
 
function initImg() {
  donutBox = document.querySelector(".donutBox");
  donutBox.style.display='none';

  //This is a click event for the donut popups. The click function first checksa if the donut image container is clicked.
  // If the donut image container is clicked, the HTML code is written and displayed as a block. A elif is used to make sure that the popup does not disappear,
  // if the popup is clicked on. At last the else is used to remove the popup if a click event occurs outside the popup box by displaying none.

  document.addEventListener("click", function (e) {
    if(lockState==0){
      //document.html.style.backgroundColor="black";
      dimmer.style.display="block";
    if (e.target.closest(".donut-image-container")) {
      donutBox.style.display = 'block';
      img1.setAttribute('src',e.target.getAttribute('src'));
      donutName.innerHTML=e.target.parentElement.parentElement.querySelector("h2").innerHTML;
      if (displayState==0){
      images[0].url=img1.getAttribute('src');
      images[1].url=img2.getAttribute('src');
      
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
      displayState=0;
      lockState=0;
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

  console.log(img1X)
  console.log(img2X)
  img1X.setAttribute('src', images[fadeOut].url);
  img2X.setAttribute('src', images[fadeIn].url);

  opacityTimer = setInterval(changeOpacity, (fadeTimeInSec * 1000) / 25);
}

function nextImage() {
  if (currentImageIndex + 1 > images.length - 1) {
    // Restart from beginning
    currentImageIndex = 0;
    swapImages(images.length - 1, currentImageIndex);
  } else {
    currentImageIndex += 1;
    swapImages(currentImageIndex - 1, currentImageIndex);
  }

  console.log('nextImage', currentImageIndex);

  highlightDot();
}

function nextImage2() {
  if (currentImageIndex + 1 > images.length - 1) {
    // Restart from beginning
    currentImageIndex = 0;
    swapImages(images.length - 1, currentImageIndex);
  } else {
    currentImageIndex += 1;
    swapImages(currentImageIndex - 1, currentImageIndex);
  }

  console.log('nextImage', currentImageIndex);

  highlightDot();
}


function createDots() {
  const dotsContainer = document.querySelector('#indicatorDots');
  console.log(images.length)
  for (let i = 0; i < images.length; i++) {
    dotsContainer.innerHTML += '<span class="dot"></span>';
  }
  indicatorDots = document.querySelectorAll('.dot');
  highlightDot();
}

function autoPlay() {
  moveForwardTimer = setInterval(nextImage, 1000);
}


function showDonuts() {
  // `<img src='${images[i].url}' alt='${images[i].alt}' width='${images[i].width}' class="donut-img">`
  for (let i = 0; i < donuts.length; i++) {
    //For-loop to loop through every donut


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
          <button data-operator="decreaseBtn">-</button>
          <button data-operator="increaseBtn">+</button>
      </div>
    </section>
    `;
    console.log(donuts[i].name);
  }
}

//Function to reduce total amount of donuts
function reduceTotDonut(e) {
  const amountLevel =
    e.currentTarget.parentElement.querySelector(".tot-amount"); //Const which goes through the parent element to find .tot-amount
  console.log("+In reduceTotDonut"+standardPrice); //Console log to make sure that it is done correctly
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

nextBtn.addEventListener('click', nextImage);
nextBtn2.addEventListener('click', nextImage2);
createDots();
init();
showDonuts();
initButtons();
initImg();

