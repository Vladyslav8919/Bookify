/* 
----------------
NAVBAR
----------------
*/
const btnToggleNav = document.querySelector(".nav-toggle");
const navLinksContainer = document.querySelector(".links-container");
const navLinks = document.querySelector(".nav-links");

btnToggleNav.addEventListener("click", function () {
  const navLinksHeight = navLinks.getBoundingClientRect().height;
  const navLinksContainerHeight =
    navLinksContainer.getBoundingClientRect().height;

  if (navLinksContainerHeight === 0) {
    navLinksContainer.style.height = `${navLinksHeight}px`;
  } else {
    navLinksContainer.style.height = 0;
  }
});

// ******NAV SEARCH********
const categoryTitle = document.querySelector(".category-title");

let query = "christmas";
let page = 0;

const navSearchForm = document.querySelector(".nav-search--form");
const navSearchInput = document.querySelector(".nav-search--input");

navSearchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  categoryTitle.textContent = `Search Results for '${navSearchInput.value}'`;

  query = navSearchInput.value;

  getData(query, page);
});

/* Fixed navbar */
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

const newSection = document.getElementById("bestsellers");
const sectionCoords = Math.abs(newSection.offsetTop + newSection.offsetHeight);

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > sectionCoords) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > sectionCoords) {
    topLink.classList.add("show--top-link");
  } else {
    topLink.classList.remove("show--top-link");
  }
});

/*
-----------
SMOOTH SCROLL
-----------
*/
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);

    const id = e.currentTarget.getAttribute("href").slice(1);

    const element = document.getElementById(id);

    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    console.log("nav height: ", navHeight);
    const containerHeight = navLinksContainer.getBoundingClientRect().height;
    console.log("container height: ", containerHeight);
    const fixedNav = navbar.classList.contains("fixed-nav");

    let position = element.offsetTop;
    console.log(position);

    position = position - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }

    if (navHeight > 76) {
      position = position + containerHeight;
    }

    window.scrollTo({ left: 0, top: position });
    navLinksContainer.style.height = 0;
  });
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

const sidebarLinksContainer = document.querySelector(".sidebar-links");
const sidebarResultsContainer = document.querySelector(".section--assortment");

sidebarLinksContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const link = e.target;

  categoryTitle.textContent = link.textContent;

  query = link.dataset.category;

  getData(query, page);
});

/*
-----------
ASSORTMENT
-----------
*/
const spinner = document.querySelector(".spinner");

let assortment;

const getData = async function (query, startIndex) {
  spinner.classList.remove("hidden");
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10`
    );
    const data = await response.json();
    const { items } = data;
    assortment = items;
    console.log(assortment);
    displayAssortmentItems(assortment);
  } catch (err) {
    console.log(err);
  }
  spinner.classList.add("hidden");
};

getData(query, page);

const prevBtn = document.querySelector(".prevBtn");
prevBtn.addEventListener("click", function () {
  if (page > 10) {
    page -= 10;
  } else {
    page = 0;
    prevBtn.classList.remove("show-prevBtn");
  }
  getData(query, page);
});

const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", function () {
  page += 10;
  getData(query, page);
  prevBtn.classList.add("show-prevBtn");
});

const sectionAssortment = document.querySelector(".section--assortment");
const btnContainerAssortment = document.querySelector(
  ".btn-container--assortment"
);

const displayAssortmentItems = function (assortment) {
  const displayItems = assortment
    .map(function (item) {
      return `
      <article class="assortment-item">
          <img class="photo" src="${item.volumeInfo.imageLinks.thumbnail}" alt="${item.volumeInfo.title}" />
          <div class="item-info">
            <header>
              <h4><a href="${item.volumeInfo.canonicalVolumeLink}" referrer="no-referrer" target="_blank">${item.volumeInfo.title}</a></h4>
            </header>
          </div>
        </article>
  `;
    })
    .join("");
  sectionAssortment.innerHTML = displayItems;
};

/*
--------------------------------
GIFT *TAB COMPONENT*
--------------------------------
*/
const giftArticle = document.querySelector(".about");
const giftBtns = document.querySelectorAll(".tab-btn");
const giftContents = document.querySelectorAll(".content");

giftArticle.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    giftBtns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });

    giftContents.forEach(function (content) {
      content.classList.remove("active");
      const element = document.getElementById(id);
      element.classList.add("active");
    });
  }
});

/*
-----------
COUNTDOWN
-----------
*/
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const giveawayDeadline = document.querySelector(".giveaway-deadline");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 2, 16, 24, 13);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const day = futureDate.getDate();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();

giveawayDeadline.textContent = `Giveaway ends on ${weekday} ${day} ${month} ${year} ${hours}:${mins}`;

const getRemainingTime = function () {
  const today = new Date().getTime();
  const futureTime = futureDate.getTime();

  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  const format = function (item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  };

  items.forEach(function (item, i) {
    item.textContent = format(values[i]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired.</h4>`;
  }
};

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();

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
Cart
-----------
*/
// *Modal*
const overlay = document.querySelector(".overlay");
const openWishlistModalBtn = document.getElementById("wishlist");
const closeWishlistModalBtn = document.querySelector(".close-wishlist-modal");
const wishlistModal = document.querySelector(".wishlist");

openWishlistModalBtn.addEventListener("click", function (e) {
  e.preventDefault();

  wishlistModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
closeWishlistModalBtn.addEventListener("click", function () {
  wishlistModal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// *Wishlist*
const alert = document.querySelector(".alert");
const form = document.querySelector(".wishlist-form");
const wishlist = document.getElementById("wishlist");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".wishlist-container");
const list = document.querySelector(".wishlist-list");
const clearBtn = document.querySelector(".clear-btn");
const wishlistInput = document.getElementById("input--wishlist");

let editElement;
let editFlag = false;
let editId = "";

// ***Functions***
const addItem = function (e) {
  e.preventDefault();

  const value = wishlistInput.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    // add list item
    createListItem(id, value);

    displayAlert("Item added to the list", "success");

    container.classList.add("show-container");

    addToLocalStorage(id, value);

    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.textContent = value;
    displayAlert("Value changed", "success");

    // *Edit local storage
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter value", "danger");
  }
};

const displayAlert = function (message, action) {
  alert.textContent = message;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
};

const setBackToDefault = function () {
  wishlistInput.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "Submit";
};

const deleteItem = function (e) {
  const element = e.currentTarget.closest(".wishlist-item");
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }

  displayAlert("Item removed", "danger");

  setBackToDefault();

  removeFromLocalStorage(id);
};

const editItem = function (e) {
  const element = e.currentTarget.closest(".wishlist-item");

  editElement = e.currentTarget.parentElement.previousElementSibling;

  wishlistInput.value = editElement.textContent;
  editFlag = true;
  editId = element.dataset.id;

  submitBtn.textContent = "Edit";
};

const clearItems = function () {
  list.innerHTML = "";

  container.classList.remove("show-container");
  displayAlert("Empty list", "danger");

  setBackToDefault();

  localStorage.removeItem("list");
};

const setupItems = function () {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
};

// ***Event listeners***
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

// ***Local Storage***
const getLocalStorage = function () {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
};

const addToLocalStorage = function (id, value) {
  const item = { id, value };
  let items = getLocalStorage();
  items.push(item);
  console.log(items);
  localStorage.setItem("list", JSON.stringify(items));
};

const removeFromLocalStorage = function (id) {
  let items = getLocalStorage();

  console.log(items);
  items = items.filter((item) => {
    if (item.id !== id) return item;
  });

  localStorage.setItem("list", JSON.stringify(items));
};

const editLocalStorage = function (id, value) {
  const items = getLocalStorage();

  items.forEach((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
};

// ***Setup items******

const createListItem = function (id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;

  element.setAttributeNode(attr);
  element.classList.add("wishlist-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  list.appendChild(element);
};

/*
-----------
MODAL
-----------
*/
const btnOpenModal = document.getElementById("log-in");
const btnCloseModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");

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
  wishlistModal.classList.add("hidden");
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

// Test
const btnContainer = document.querySelector(".button-container");

let currentReview = 0;

btnContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn");

  if (!btn) return;

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

/*
-----------
FOOTER
-----------
*/
const date = document.getElementById("date");

date.textContent = new Date().getFullYear();
