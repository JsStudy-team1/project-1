document.addEventListener("DOMContentLoaded", function () {
  // Swiper
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2000 // 시간 설정
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});