document.addEventListener("DOMContentLoaded", function () {
  // Swiper
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: true,
		loopedSlides: 1,
    effect: "fade",
    autoplay: {
      delay: 2000 // 시간 설정
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });
});