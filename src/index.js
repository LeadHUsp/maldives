// JS
import "./js/";

// SCSS
import "./assets/scss/main.scss";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import Swiper, { Lazy, EffectFade, Navigation, Pagination } from "swiper";
import AOS from "aos";

/* preloader  */
window.onload = function () {
  document.body.classList.add("loaded_hiding");
  window.setTimeout(function () {
    document.body.classList.add("loaded");
    document.body.classList.remove("loaded_hiding");
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  /* AOS library init */
  AOS.init({
    easing: "ease-out",
    delay: 500,
  });
  /* fontawesome icons import */
  library.add(
    faBars,
    faFacebookF,
    faTwitter,
    faLinkedinIn,
    faGooglePlusG,
    faTimes
  );
  dom.watch();

  /* header slider initialize */
  Swiper.use([Lazy, EffectFade, Navigation, Pagination]);
  const headSwiper = new Swiper(".header__slider-images", {
    grabCursor: true,
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      loadOnTransitionStart: true,
    },
    navigation: {
      nextEl: ".header__slider-btn-next",
      prevEl: ".header__slider-btn-prev",
    },
    pagination: {
      el: ".header__slider-progressbar>.progressbar__line",
      type: "progressbar",
    },
  });
  const prevPageHeadSwiper = new Swiper(".header__slider-prev-container", {
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      loadOnTransitionStart: true,
    },
    effect: "fade",
  });

  function changeSlide() {
    var index;
    const totalSlides = headSwiper.slides.length;
    const prevSlideNumberEl = document.querySelector(
      ".header__slider-prev-page"
    );
    const activeSlideEl = document.querySelector(
      ".header__slider-page-current"
    );
    const totalSlidesEl = document.querySelector(".header__slider-page-total");
    const activeSlideProgressbarEl = document.querySelector(
      ".progressbar__page-current"
    );
    const totalSlidesProgressbarEl = document.querySelector(
      ".progressbar__page-total"
    );
    if (headSwiper.activeIndex === 0) {
      index = totalSlides - 1;
      prevSlideNumberEl.textContent = `0${totalSlides}`;
    } else {
      index = headSwiper.activeIndex - 1;
      prevSlideNumberEl.textContent = `0${headSwiper.activeIndex}`;
    }
    activeSlideEl.textContent = `0${headSwiper.activeIndex + 1}`;
    totalSlidesEl.textContent = `/ 0${totalSlides}`;
    activeSlideProgressbarEl.textContent = `0${headSwiper.activeIndex + 1}`;
    totalSlidesProgressbarEl.textContent = `0${totalSlides}`;
    prevPageHeadSwiper.slideTo(index);
  }
  changeSlide();

  headSwiper.on("slideChange", () => {
    changeSlide();
  });
  /*  run burgerMenu */
  let burgerShow = document.querySelector(".menu__btn-toggler"),
    burgerClose = document.querySelector(".close-btn"),
    nav = document.querySelector("#nav-panel");

  burgerShow.onclick = (e) => {
    e.preventDefault();
    nav.classList.toggle("menu-show");
  };
  burgerClose.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.remove("menu-show");
  });
  document.addEventListener("click", (e) => {
    let itsMenu = e.target == nav || nav.contains(e.target),
      itsHamburger = e.target == burgerShow,
      iconHumburger = e.target == document.querySelector(".fa-bars"),
      iconPath = e.target == document.querySelector(".fa-bars>path"),
      menuShow = nav.classList.contains("menu-show");

    if (!itsMenu && menuShow && !itsHamburger && !iconHumburger && !iconPath) {
      nav.classList.toggle("menu-show");
    }
  });

  /* -----about section slider initialization----- */

  const aboutSwiper = new Swiper(".about__slider-container", {
    slidesPerView: "1",
    centeredSlidesBounds: true,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      loadOnTransitionStart: true,
      loadPrevNext: true,
    },
    navigation: {
      nextEl: ".about__slider-panel>.about__slider-nav>.about__slider-next",
      prevEl: ".about__slider-panel>.about__slider-nav>.about__slider-prev",
    },
    breakpoints: {
      993: {
        slidesPerView: "1.35",
      },
    },
  });

  function changePageAboutSlider() {
    const totalSlides = Math.ceil(aboutSwiper.slides.length / 2);
    const activeSlideEl = document.querySelector(".about__page-current");
    const totalSlidesEl = document.querySelector(".about__page-total");
    let currentPage = aboutSwiper.realIndex + 1;
    activeSlideEl.textContent = `0${currentPage}`;
    if (aboutSwiper.loopedSlides > 1) {
      totalSlidesEl.textContent = `/ 0${totalSlides}`;
    } else {
      totalSlidesEl.textContent = `/ 0${totalSlides + 1}`;
    }
  }
  changePageAboutSlider();
  aboutSwiper.on("slideChange", () => {
    changePageAboutSlider();
  });

  /* -----gallery slider initialization---- */

  const gallerySlider = new Swiper(".gallery__slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    preloadImages: false,

    // Enable lazy loading
    lazy: {
      loadOnTransitionStart: true,
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    navigation: {
      nextEl: ".gallery__slider-btn-next",
      prevEl: ".gallery__slider-btn-prev",
    },
  });
  gallerySlider.init();
});
