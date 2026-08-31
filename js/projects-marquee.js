document.addEventListener("DOMContentLoaded", function () {
  const marquees = document.querySelectorAll(".js-projects-marquee");
  if (!marquees.length || typeof Swiper === "undefined") return;

  marquees.forEach(function (el) {
    new Swiper(el, {
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      simulateTouch: false,
      a11y: false,
      speed: 8000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        reverseDirection: el.dataset.direction === "reverse",
      },
    });
  });
});
