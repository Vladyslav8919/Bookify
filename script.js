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
