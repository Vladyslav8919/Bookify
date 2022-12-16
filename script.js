/* 
----------------
NAVBAR
----------------
*/
const btnToggleNav = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

btnToggleNav.addEventListener("click", function () {
  console.log(navLinks.classList);
  navLinks.classList.toggle("show-links");
});

/*
-----------
SIDEBAR
-----------
*/
const sidebar = document.querySelector(".sidebar");
const btnToggleSidebar = document.querySelector(".sidebar-toggle");
const btnCloseSidebar = document.querySelector(".close-sidebar");

btnToggleSidebar.addEventListener("click", function () {
  sidebar.classList.toggle("show-sidebar");
});

btnCloseSidebar.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});

/*
-----------
ASSORTMENT
-----------
*/

const assortment = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionAssortment = document.querySelector(".section--assortment");
const btnContainerAssortment = document.querySelector(
  ".btn-container--assortment"
);

window.addEventListener("DOMContentLoaded", function () {
  displayAssortmentItems(assortment);

  displayAssortmentBtns();
});

const displayAssortmentItems = function (assortment) {
  const displayItems = assortment
    .map(function (item) {
      return `
      <article class="menu-item">
          <img class="photo" src="${item.img}" alt="${item.title}" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>
  `;
    })
    .join("");
  sectionAssortment.innerHTML = displayItems;
};

const displayAssortmentBtns = function () {
  const categories = [...new Set(assortment.map((item) => item.category))];
  categories.unshift("all");

  const categoryBtns = categories
    .map(
      (category) =>
        `<button class="btn filter-btn" type="button"  data-id="${category}">${category}</button>`
    )
    .join("");

  btnContainerAssortment.innerHTML = categoryBtns;

  // filter items
  const filterBtns = btnContainerAssortment.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;

      const assortmentCategory = assortment.filter(function (assortmentItem) {
        if (assortmentItem.category === category) {
          return assortmentItem;
        }
      });

      if (category === "all") {
        displayAssortmentItems(assortment);
      } else {
        displayAssortmentItems(assortmentCategory);
      }
    });
  });
};

/*
-----------
QUESTIONS
-----------
*/
const questionBtns = document.querySelectorAll(".question-btn");
const questions = document.querySelectorAll(".question");

questionBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const question = e.currentTarget.parentElement.parentElement;

    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});

/*
-----------
MODAL
-----------
*/
const btnOpenModal = document.getElementById("log-in");
const btnCloseModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

btnOpenModal.addEventListener("click", function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", function () {
  closeModal();
});

btnCloseModal.addEventListener("click", function () {
  closeModal();
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
    text: "I accidentally updated the billing address on an order rather than the shipping address, which resulted in both addresses being incorrect. Bookify actually sent out a second order with the correct shipping and billing addresses before they received the first order back. They also didn't charge me anything extra! It was one of the best online support experiences I've ever had.",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "Fast delivery, good choice. I know what I want to read and I don't like being forced down 'woke' paths to choose my books. Bookify doesn't do that meanwhile supporting local bookshops rather than the tax-avoiding megacorps that dominate the net.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "I emailed to ask why my order was…I emailed to ask why my order was delayed. Turns out there was a delay in publication, Bookify emailed me personally. A REAL PERSON contacted me. Fantastic. I will definitely buy again.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "student",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Win, Win, Win, Win for us. Excellent selection of books, easy to use website, competitive prices - and support for local bookshops. That's a Win, Win, Win, Win for us. And delivery was precisely as promised. Our thanks to all involved. P&P, Liverpool",
  },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

// const prevBtn = document.querySelector(".prev-btn");
// const nextBtn = document.querySelector(".next-btn");
// const randomBtn = document.querySelector(".random-btn");

// Test
const btnContainer = document.querySelector(".button-container");

let currentReview = 0;

btnContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn");

  if (!btn) return;
  console.log(btn);

  if (btn.classList.contains("prev-btn")) {
    currentReview--;
    if (currentReview < 0) {
      currentReview = reviews.length - 1;
    }
    showReview(reviews[currentReview]);
  }

  if (btn.classList.contains("next-btn")) {
    currentReview++;
    if (currentReview > reviews.length - 1) {
      currentReview = 0;
    }
    showReview(reviews[currentReview]);
  }

  if (btn.classList.contains("random-btn")) {
    const randomReview = Math.floor(Math.random() * reviews.length);
    showReview(reviews[randomReview]);
  }
});

const showReview = function (review) {
  img.src = review.img;
  author.textContent = review.name;
  job.textContent = review.job;
  info.textContent = review.text;
};

window.addEventListener("DOMContentLoaded", function () {
  showReview(reviews[currentReview]);
});

// prevBtn.addEventListener("click", function () {
//   currentReview--;

//   if (currentReview < 0) {
//     currentReview = reviews.length - 1;
//   }

//   showReview(reviews[currentReview]);
// });

// nextBtn.addEventListener("click", function () {
//   currentReview++;

//   if (currentReview > reviews.length - 1) {
//     currentReview = 0;
//   }

//   showReview(reviews[currentReview]);
// });

// randomBtn.addEventListener("click", function () {
//   const randomReview = Math.floor(Math.random() * reviews.length);

//   showReview(reviews[randomReview]);
// });
