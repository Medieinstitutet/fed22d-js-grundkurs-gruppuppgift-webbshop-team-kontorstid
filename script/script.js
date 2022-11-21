//Global variables

let btnLower; //Button to decrease amount of donuts
let btnHigher; //Button to increase amount of donuts
let priceLabel; //Label to show total price
//let newPrice; //Variable to show new price
let standardPrice; //Variable for the price for each donut
let newAmount; //Variable to show new amount of donuts
let donutContainer; //Variable to select donutContainer from HTML
let donutImageContainer;

//Donuts
const donuts = [
  {
    /*images: [
      {
        url: 'assets/photos/bild1.jpg',
        alt: 'Munk 1',
        width: 100,
        height: 'auto'
      }, // `<img src='${images[i].url}' alt='${images[i].alt}' width='${images[i].width}' class="donut-img">`
    ],*/
    img: 'assets/photos/bild1.jpg', //Donut picture
    name: 'Classic', //Donut name
    category: 'Övrigt', //Donut category
      // TODO: lägg på keys
    price: 35, //Donut price
    rating: 5, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img: 'assets/photos/bild1.jpg', //Donut picture
    name:'Raspberry pie', //Donut name
    category: 'Övrigt', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice:0, //Total price
    totAmount: 0, //Amount 
  },
  {
    img:'assets/photos/bild3.jpg', //Donut picture
    name:'Sugar dream', //Donut name
    category:'Övrigt', //Donut category
    price: 40, //Donut price
    rating: 5, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img:'assets/photos/bild5.jpg', //Donut picture
    name:'Dragon Tail', //Donut name
    category:'Övrigt', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img: 'assets/photos/bild4.jpg', //Donut picture
    name: 'Unicorn', //Donut name
    category: 'Strössel', //Donut category
    price: 40, //Donut price
    rating: 5, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img: 'assets/photos/bild6.jpg', //Donut picture
    name: 'Hungover', //Donut name
    category: 'Strössel', //Donut category
    price: 40, //Donut price
    rating: 3, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img: 'assets/photos/bild7.jpg', //Donut picture
    name: 'Smarties', //Donut name
    category: 'Strössel', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img: 'assets/photos/bild8.jpg', //Donut picture
    name: 'Monster', //Donut name
    category:'Strössel', //Donut category
    price: 40, //Donut price
    rating: 3, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
  },
  {
    img: 'assets/photos/bild9.jpg', //Donut picture
    name: 'Chocoholic', //Donut name
    category:'Choklad', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
    },
    {
    img:'assets/photos/bild10.jpg', //Donut picture
    name: 'Chocoloco', //Donut name
    category: 'Choklad', //Donut category
    price: 40, //Donut price
    rating: 4, //rating
    totPrice: 0, //Total price
    totAmount: 0, //Amount
    },
    {
      img:'assets/photos/bild11.jpg', //Donut picture
      name: 'Chocolate rain', //Donut name
      category: 'Choklad', //Donut category
      price:  40, //Donut price
      rating: 4, //rating
      totPrice: 0, //Total price
      totAmount: 0, //Amount
    },
    {
      img: 'assets/photos/bild12.jpg', //Donut picture
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
  donutContainer = document.querySelector(".donutContainer");
  donutImageContainer = document.querySelector(".donutImageContainer");
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
   
    donutImageContainer.setAttribute('src', donuts[i].img);

    donutContainer.innerHTML += `
    <section class="donut-container">
      <div class="donut-image-container">
          <img src="${donuts[i].img}" alt="${donuts[i].alt}">
      </div>
      <div class="donut-info-container">
          <h2 class="${donuts[i].name}"><span class="donut-price">${donuts[i].price}</span> kr</h2>
          <p class="donutCategory">${donuts[i].category}</p>
          <div class="ratingContainer"></div>
          
          <p>pris: <span class="tot-price">${donuts[i].totPrice}</span> kr</p>
          <p>antal: <span class="tot-amount">${donuts[i].totAmount}</span> st</p>
          <button data-operator="decreaseBtn">-</button>
          <button data-operator="increaseBtn">+</button>
      </div>
    </section>
    `;
    console.log(donutContainer.innerHTML);
  }

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