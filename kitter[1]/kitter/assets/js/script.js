'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);


const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);

const addToCartButtons = document.querySelectorAll('.card-action-btn');
addToCartButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

let cartItems = [];

function addToCart(event) {
  const productCard = event.target.closest('.product-card');
  const productTitle = productCard.querySelector('.card-title').textContent;
  const productPrice = parseFloat(productCard.querySelector('.card-price').dataset.value);

  // Check if the product is already in the cart
  const existingItem = cartItems.find((item) => item.title === productTitle);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ title: productTitle, price: productPrice, quantity: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total-amount');
  const cartCountElement = document.getElementById('cart-count');

  // Clear the existing cart items
  cartItemsElement.innerHTML = '';

  // Update the cart items
  let totalAmount = 0;
  cartItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.title} - $${item.price.toFixed(2)} x ${item.quantity}`;
    cartItemsElement.appendChild(listItem);
    totalAmount += item.price * item.quantity;
  });

  // Update the cart total and count
  cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;
  cartCountElement.textContent = cartItems.length;
}

const cartIcon = document.querySelector('.action-btn[aria-label="cart"]');
const cartModal = document.getElementById('shopping-cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');

cartIcon.addEventListener('click', () => {
  cartModal.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('show');
});


