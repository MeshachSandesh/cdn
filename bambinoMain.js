/** swapers */

var swiper = new Swiper(".swipperWrapperH", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

class DraggableSlider {
  /**
   * Create a container that holds all the thumbnails,
   * pass this container into the class
   * This container should have:
   *    width:100vw, max-width:100vw, overflow:hidden
   * The class will then handle the scroll inside the container abased on the drag
   * hence moving the thumbnails inside
   *
   */
  constructor(sliderSelector) {
    this.slider = document.querySelector(sliderSelector);
    this.slider.style.cursor = "grab";
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.targetScroll = 0;
    this.easing = 0.1; // Adjust easing factor for smoothness
    this.bindEvents();
    this.setSmoothScroll();
  }

  setSmoothScroll() {
    // this.slider.style.scrollBehavior = "smooth"; // Enable smooth scroll
  }

  bindEvents() {
    this.slider.addEventListener("mousedown", this.mouseDown.bind(this));
    this.slider.addEventListener("mouseup", this.mouseUp.bind(this));
    this.slider.addEventListener("mouseleave", this.mouseLeave.bind(this));
    this.slider.addEventListener("mousemove", this.mouseMove.bind(this));

    // Touch events for mobile
    this.slider.addEventListener("touchstart", this.touchStart.bind(this));
    this.slider.addEventListener("touchend", this.touchEnd.bind(this));
    this.slider.addEventListener("touchmove", this.touchMove.bind(this));
  }

  mouseDown(e) {
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.pageX - this.slider.offsetLeft;
    this.scrollLeft = this.slider.scrollLeft;
  }

  mouseUp() {
    this.isDragging = false;
  }

  mouseLeave() {
    this.isDragging = false;
  }

  mouseMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.pageX - this.slider.offsetLeft;
    const walk = (x - this.startX) * 1.5; // Adjust scroll speed here
    this.targetScroll = this.scrollLeft - walk;

    // Start easing scroll animation
    requestAnimationFrame(this.smoothScroll.bind(this));
  }

  touchStart(e) {
    this.isDragging = true;
    this.startX = e.touches[0].pageX - this.slider.offsetLeft;
    this.scrollLeft = this.slider.scrollLeft;
  }

  touchEnd() {
    this.isDragging = false;
  }

  touchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - this.slider.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.targetScroll = this.scrollLeft - walk;

    // Start easing scroll animation
    requestAnimationFrame(this.smoothScroll.bind(this));
  }

  smoothScroll() {
    if (this.isDragging) {
      let currentScroll = this.slider.scrollLeft;
      let diff = this.targetScroll - currentScroll;

      // Apply easing
      this.slider.scrollLeft += diff * this.easing;

      // If close enough to the target, stop animating
      if (Math.abs(diff) > 0.5) {
        requestAnimationFrame(this.smoothScroll.bind(this));
      }
    }
  }
}

const swapRotate = ({ listItems }) => {
  /** home banner 
    
    -  This will animate 3 banners in a loop
      
    - caller
      const listItems = document.querySelectorAll("#swipperWrapper .homeswipperslide");
    */

  const classNames = ["hbleft", "hbcenter", "hbright"];
  const arrangeArr = [];
  listItems.forEach((item, index) => {
    arrangeArr.push(index);
  });

  const swapRotate = () => {
    [...Array(3)].map((item, index) => {
      const element = listItems[arrangeArr[index]];

      /** cleat the previous classes */
      classNames.forEach((className) => {
        if (element.classList.contains(className)) {
          element.classList.remove(className);
        }
      });

      /** assign the new class */
      element.classList.add(classNames[index]);
    });

    arrangeArr.push(arrangeArr.shift());
  };

  setInterval(() => swapRotate(), 5000);
  swapRotate();
};

const listItems = document.querySelectorAll(
  "#swipperWrapper .homeswipperslide"
);

swapRotate({ listItems });

/** end of swapers */
