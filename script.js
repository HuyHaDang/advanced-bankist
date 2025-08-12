'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
console.log(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
btnScrollTo.addEventListener(`click`, function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo(
  //   s1coords.x + window.pageXOffset,
  //   s1coords.y + window.pageYOffset
  // );

  //method2

  section1.scrollIntoView({ behavior: `smooth` });
});

////////////////////////////
//Page Navigation
//METHOD 1
// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

//METHOD 2
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  if (e.target.classList.contains(`nav__link`)) {
    console.log(e.target);
    const id = e.target.getAttribute(`href`);
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

const h1 = document.querySelector(`h1`);
console.log(h1);
console.log(h1.querySelectorAll(`.highlight`));
console.log(h1.childNodes);

//TAB COMPONENT
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  // Deactivate all tabs and content first
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Guard clause
  if (!clicked) return;
  // console.log(clicked);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate the clicked tab
  clicked.classList.add('operations__tab--active');
  // Activate the corresponding content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

//MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`nav`).querySelector(`img`);
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector(`.nav`);

//passing argument to functions
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));

/////////////////////////////////////////
//sticky navigation
//METHOD 1
// const navHeight = document.querySelector(`.header`);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserve.observe(header);

// METHOD 2

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener(`scroll`, function () {
//   console.log(window.scrollY);
//   if (window.scrollY >= initialCoords.top) nav.classList.add(`sticky`);
//   else nav.classList.add(`sticky`);
// });

//REVEAL SECTIONS
const revealSection = function (entries, observe) {
  const [entry] = entries;
  // console.log(entries);
  // console.log(entry);
  if (entry.isIntersecting === false) return;
  entry.target.classList.remove(`section--hidden`);
  console.log(entry.target);
  observe.unobserve(entry.target);
};
const sectionObsserve = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObsserve.observe(section);
  section.classList.add(`section--hidden`);
});
