//navbar stuff
const navLinksNode = document.querySelector(".nav-links");
const navBurgerNode = document.querySelector(".nav-burger");
const navNode = document.querySelector("nav");

const toggleNavLinks = () => {
  navLinksNode.classList.toggle("nav-links-active");
  navBurgerNode.classList.toggle("nav-burger-active");
  navNode.classList.toggle("nav-active");
  if (navBurgerNode.classList.contains("nav-burger-active")){
    navBurgerNode.style.borderBottomRightRadius = 0;
    navBurgerNode.style.borderBottomLeftRadius = 0;
  }
  else {
    navBurgerNode.style.borderRadius = "1rem";
  }
};