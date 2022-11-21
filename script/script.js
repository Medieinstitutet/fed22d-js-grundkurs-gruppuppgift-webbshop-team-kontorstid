//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
//let newPrice; //Variable to show new price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts
let donutContainer; //Variable to select donutContainer from HTML

//Donuts
const donuts = [
  {
    images [
      {
        url: 'assets/photos/bild1.jpg',
        alt: 'Donut-med-socker',
        width: 100;
        height: auto;
      },
    ],
    /* // `<img src='${images[i].url}' alt='${images[i].alt}' width='${images[i].width}' class="donut-img">`
    ],*/
    name: 'Classic', //Donut name
    category: 'Övrigt', //Donut category
    price: 35, //Donut price
    rating: 5, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild2.jpg',
        alt: 'Klassisk-syltmunk',
        width: 100;
        height: auto;
      },
    ],
    name:'Raspberry pie', //Donut name
    category: 'Övrigt', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice:0, //Total price
    totAmount: 0, //Amount 
  },
  {
    images [
      {
        url: 'assets/photos/bild3.jpg',
        alt: 'Munk-med-florsocker',
        width: 100;
        height: auto;
      },
    ],
    name:'Sugar dream', //Donut name
    category:'Övrigt', //Donut category
    price: 40, //Donut price
    rating: 5, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild5.jpg',
        alt: 'Munk-med-topping',
        width: 100;
        height: auto;
      },
    ],
    name:'Dragon Tail', //Donut name
    category:'Övrigt', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild4.jpg',
        alt: 'Munk-med-fargglatt-strossel',
        width: 100;
        height: auto;
      },
    ],
    name: 'Unicorn', //Donut name
    category: 'Strössel', //Donut category
    price: 40, //Donut price
    rating: 5, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild6.jpg'
        alt: 'Munk-med-chokladtopping-och-strossel'
        width: 100;
        height: auto;
      },
    ],
    name: 'Hungover', //Donut name
    category: 'Strössel', //Donut category
    price: 40, //Donut price
    rating: 3, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild7.jpg', 
        alt: 'Munk-med-smarties',
        width: 100;
        height: auto;
      },
    ],
    name: 'Smarties', //Donut name
    category: 'Strössel', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild8.jpg', 
        alt: 'Munk-med-figur',
        width: 100;
        height: auto;
      },
    ],
    name: 'Monster', //Donut name
    category:'Strössel', //Donut category
    price: 40, //Donut price
    rating: 3, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    images [
      {
        url: 'assets/photos/bild9.jpg',
        alt: 'Munk-med-chokladstrossel',
        width: 100;
        height: auto;
      },
    ],
    //Donut picture - kolla upp att alt-text stämmer med bild på munk 9-12
    name: 'Chocoholic', //Donut name
    category:'Choklad', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
    },
    {
      images [
        {
          url:'assets/photos/bild10.jpg',
          alt: 'Munk-med-chokladbitar-pa-chokladfrosting'
          width: 100;
          height: auto;
        },
      ],
    name: 'Chocoloco', //Donut name
    category: 'Choklad', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
    },
    {
      images [
        {
          url: 'assets/photos/bild11.jpg',
          alt: 'Munk-med-strossel-pa-choklad',
          width: 100;
          height: auto;
        },
      ],
      name: 'Chocolate rain', //Donut name
      category: 'Choklad', //Donut category
      price:  40, //Donut price
      rating: 4, //rating
      totPrice: 0, //Total price
      totAmount: 0, //Amount
    },
    {
      images [
        {
          url: 'assets/photos/bild12.jpg',
          alt: 'Munk-med-fargglatt-strossel',
          width: 100;
          height: auto;
        },
      ],
      name: 'Rainbow', //Donut name
      category:'Övrigt', //Donut category
      price: 40, //Donut price
      rating: 5, //rating
      totPrice: 0, //Total price
      totAmount: 0, //Amount
    }
  ]



function init() {
  //Declares variables
  btnLower = document.querySelectorAll("button[data-operator='decreaseBtn']");
  btnHigher = document.querySelectorAll("button[data-operator='increaseBtn']");
  standardPrice = document.querySelectorAll(".donut-price");
  donutContainer = document.querySelector("#donutContainer");
  //Calling functions
  for (let i = 0; i < btnLower.length; i++) {
    btnLower[i].addEventListener("click", reduceTotDonut);
  }
  for (let i = 0; i < btnHigher.length; i++) {
    btnHigher[i].addEventListener("click", increaseTotDonut);
  }
} //End init

function showDonuts() {
    // `<img src='${images[i].url}' alt='${images[i].alt}' width='${images[i].width}' class="donut-img">`
for (let i = 0; i <donuts.length; i++) { //For-loop to loop through every donut
  donuts[i].name // => Donut med socker
  donutContainer.innerHTML += `
  <section class="donut-container">
                <div class="donut-image-container">
                    <img src="${donut[i].img}" alt="${donut[i].alt}">
                </div>
                <div class="donut-info-container">
                    <h2 class="${donut[i].name}"><span class="donut-price">${donut[i].price}</span> kr</h2>
                    <p class="donutCategory">${donut[i].category}</p>
                    <div class="ratingContainer"></div>
                    
                    <p>pris: <span class="tot-price">${donut[i].tot-price}</span> kr</p>
                    <p>antal: <span class="tot-amount">${donut[i].totAmount}</span> st</p>
                </div>
            </section>
  `;
}
console.log("hej")
}

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


init();
showDonuts();