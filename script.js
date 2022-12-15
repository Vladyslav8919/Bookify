/* 
----------------
NAVBAR
----------------
*/
const btnToggleNav = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

btnToggleNav.addEventListener("click", function () {
  navLinks.classList.toggle("show-links");
});

/*
-----------
SIDEBAR
-----------
*/
const sidebar = document.querySelector(".sidebar");
const btnToggleSidebar = document.querySelector(".sidebar-toggle");
const btnCloseSidebar = document.querySelector(".close-btn");

btnToggleSidebar.addEventListener("click", function () {
  sidebar.classList.toggle("show-sidebar");
});

btnCloseSidebar.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});

/*
-----------
REVIEWS
-----------
*/
// local reviews data
const reviews = [
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text: "I accidentally updated the billing address on an order rather than the shipping address, which resulted in both addresses being incorrect. Bookshop.org actually sent out a second order with the correct shipping and billing addresses before they received the first order back. They also didn't charge me anything extra! It was one of the best online support experiences I've ever had.",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "Fast delivery, good choice. I know what I want to read and I don't like being forced down 'woke' paths to choose my books. Bookshop.org doesn't do that meanwhile supporting local bookshops rather than the tax-avoiding megacorps that dominate the net.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "I emailed to ask why my order was…I emailed to ask why my order was delayed. Turns out there was a delay in publication, Bookshop.org emailed me personally. A REAL PERSON contacted me. Fantastic. I will definitely buy again.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "student",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Win, Win, Win, Win for us. Excellent selection of books, easy to use website, competitive prices - and support for local bookshops. That's a Win, Win, Win, Win for us. And delivery was precisely as promised. Our thanks to all involved.P&P, Liverpool",
  },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentReview = 0;

const showReview = function (review) {
  img.src = review.img;
  author.textContent = review.name;
  job.textContent = review.job;
  info.textContent = review.text;
};

window.addEventListener("DOMContentLoaded", function () {
  showReview(reviews[currentReview]);
});

prevBtn.addEventListener("click", function () {
  currentReview--;

  if (currentReview < 0) {
    currentReview = reviews.length - 1;
  }

  showReview(reviews[currentReview]);
});

nextBtn.addEventListener("click", function () {
  currentReview++;

  if (currentReview > reviews.length - 1) {
    currentReview = 0;
  }

  showReview(reviews[currentReview]);
});

randomBtn.addEventListener("click", function () {
  const randomReview = Math.floor(Math.random() * reviews.length);

  // 0-3
  // console.log(randomReview);

  showReview(reviews[randomReview]);
});
