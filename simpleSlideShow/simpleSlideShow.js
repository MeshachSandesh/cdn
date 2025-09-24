/**
 * This is a simple slideshow/carousel implementation in vanilla JS. Developed by Meshach Sandesh for 23DOT4
 *
 * Copyright (c) 2024 Meshach Sandesh. All rights reserved.
 *
 * createSlideShow(options)
 *
 * options: {
 *   wrapper: Element | selector (required)  - the element that will be transformed
 *   leftArrow: Element | selector (optional)
 *   rightArrow: Element | selector (optional)
 *   slideSelector: string (optional, default: '.slideitem') - used to compute total slides
 *   duration: number (ms) optional (default: 500)
 *   easing: string optional (default: 'ease')
 *   stepPercent: number optional (default: 100)
 *   loop: boolean optional (default: false) - whether next/prev wrap around
 * }
 *
 * Returns an object: { next, prev, goTo, destroy, getIndex }
 */
function createSlideShow(options = {}) {
  // resolve elements (accept selector or element)
  const resolve = (v) =>
    typeof v === "string"
      ? document.querySelector(v)
      : v instanceof Element
      ? v
      : null;

  const wrapper = resolve(options.wrapper);
  if (!wrapper)
    throw new Error("createSlideShow: wrapper element is required.");

  const leftArrow = resolve(options.leftArrow) || null;
  const rightArrow = resolve(options.rightArrow) || null;
  const slideSelector = options.slideSelector || ".slideitem";
  const duration =
    typeof options.duration === "number" ? options.duration : 500;
  const easing = options.easing || "ease";
  const stepPercent =
    typeof options.stepPercent === "number" ? options.stepPercent : 100;
  const loop = !!options.loop;

  const slides = Array.from(wrapper.querySelectorAll(slideSelector));
  const totalSlides = slides.length;
  let currentIndex = 0;
  let isAnimating = false;

  // set transition on wrapper
  wrapper.style.transition = `transform ${duration}ms ${easing}`;

  // helper: read current translateX in percent of wrapper width
  function getCurrentTranslatePercent() {
    const style = window.getComputedStyle(wrapper);
    const transform = style.transform || style.webkitTransform || "none";
    if (transform === "none") return 0;

    // parse matrix; DOMMatrixReadOnly safe in modern browsers
    try {
      const m = new DOMMatrixReadOnly(transform);
      const currentXpx = m.m41; // translateX in px
      const w = wrapper.offsetWidth || 1; // avoid division by zero
      return (currentXpx / w) * 100;
    } catch (err) {
      // fallback: try to extract translateX with regex (very defensive)
      const match = transform.match(/matrix.*\((.+)\)/);
      if (match) {
        const parts = match[1].split(",").map((s) => parseFloat(s.trim()));
        const tx = parts.length === 6 ? parts[4] : 0;
        const w = wrapper.offsetWidth || 1;
        return (tx / w) * 100;
      }
      return 0;
    }
  }

  function setTranslatePercent(p) {
    // round to avoid tiny decimals causing many repaint differences
    const val = Math.round(p * 1000) / 1000;
    wrapper.style.transform = `translateX(${val}%)`;
  }

  // manage arrow visibility (simple show/hide)
  function manageShowHideNav(index) {
    if (leftArrow)
      leftArrow.style.visibility = index === 0 && !loop ? "hidden" : "visible";
    if (rightArrow)
      rightArrow.style.visibility =
        index + 1 === totalSlides && !loop ? "hidden" : "visible";
  }

  // core slide move: direction = 'next' or 'prev'; optionally targetIndex to set exact index
  function move(direction = "next", targetIndex = null) {
    if (isAnimating) return;
    if (totalSlides === 0) return;

    let step = direction === "next" ? -stepPercent : stepPercent;

    // If targetIndex provided, compute required step (relative)
    if (Number.isInteger(targetIndex)) {
      // clamp or wrap depending on loop
      if (loop) {
        // normalize between 0..n-1
        targetIndex = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
      } else {
        targetIndex = Math.max(0, Math.min(totalSlides - 1, targetIndex));
      }
      const deltaSlides = targetIndex - currentIndex;
      // choose shortest path if loop enabled:
      if (loop && Math.abs(deltaSlides) > totalSlides / 2) {
        // go the other way
        const alt =
          deltaSlides > 0
            ? deltaSlides - totalSlides
            : deltaSlides + totalSlides;
        step = (alt > 0 ? 1 : -1) * stepPercent * Math.abs(alt);
      } else {
        step = (deltaSlides > 0 ? -1 : 1) * stepPercent * Math.abs(deltaSlides); // careful with signs
        // Explanation: moving to index+1 (next) is -stepPercent (move left). So deltaSlides positive -> negative step.
      }
    }

    const currentPercent = getCurrentTranslatePercent();
    const newPercent = currentPercent + step;

    // compute new currentIndex (best-effort)
    let nextIndex;
    if (typeof targetIndex === "number") {
      nextIndex = targetIndex;
    } else {
      // approximate: each stepPercent corresponds to one slide
      const indexDelta = -Math.round(
        (newPercent - currentPercent) / stepPercent
      );
      nextIndex = currentIndex + indexDelta;
      if (loop) {
        nextIndex = ((nextIndex % totalSlides) + totalSlides) % totalSlides;
      } else {
        nextIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex));
      }
    }

    // start animation
    isAnimating = true;
    // update nav visibility before animation starts
    manageShowHideNav(nextIndex);
    // apply transform
    // ensure layout read before setting transform so transition runs reliably
    wrapper.getBoundingClientRect();
    setTranslatePercent(newPercent);

    const onTransitionEnd = (e) => {
      if (e.propertyName !== "transform") return;
      wrapper.removeEventListener("transitionend", onTransitionEnd);
      currentIndex = nextIndex;
      isAnimating = false;
    };

    wrapper.addEventListener("transitionend", onTransitionEnd);

    // safety: in case the transitionend doesn't fire (e.g., user removed element),
    // clear after duration + a little buffer
    setTimeout(() => {
      if (isAnimating) {
        wrapper.removeEventListener("transitionend", onTransitionEnd);
        isAnimating = false;
        currentIndex = nextIndex;
      }
    }, duration + 50);
  }

  // public API:
  function next() {
    // compute next index for wrapping or clamping
    let nextIdx = currentIndex + 1;
    if (!loop && nextIdx >= totalSlides) nextIdx = totalSlides - 1;
    move("next", nextIdx);
  }
  function prev() {
    let prevIdx = currentIndex - 1;
    if (!loop && prevIdx < 0) prevIdx = 0;
    move("prev", prevIdx);
  }
  function goTo(index) {
    move(index > currentIndex ? "next" : "prev", index);
  }

  function destroy() {
    // remove listeners and clear inline styles we set
    if (leftArrow) leftArrow.removeEventListener("click", prev);
    if (rightArrow) rightArrow.removeEventListener("click", next);
    wrapper.style.transition = "";
    wrapper.style.transform = "";
  }

  // wire up arrows if provided
  if (leftArrow) leftArrow.addEventListener("click", prev);
  if (rightArrow) rightArrow.addEventListener("click", next);

  // initialize nav visibility
  manageShowHideNav(currentIndex);

  return {
    next,
    prev,
    goTo,
    destroy,
    getIndex: () => currentIndex,
  };
}

createSlideShow({
  wrapper: "#slideWrapperLeg",
  leftArrow: "#arrow-left",
  rightArrow: "#arrow-right",
  slideSelector: ".slideitem",
  duration: 500,
  easing: "cubic-bezier(.2,.9,.2,1)",
  stepPercent: 100,
  loop: false,
});
createSlideShow({
  wrapper: "#leg2slidewrapper",
  leftArrow: "#arrow-left-l2",
  rightArrow: "#arrow-right-l2",
  slideSelector: ".leg2slideitem",
  duration: 500,
  easing: "cubic-bezier(.2,.9,.2,1)",
  stepPercent: 100,
  loop: false,
});
