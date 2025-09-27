createSlideShow({
  wrapper: "#slideWrapperLeg",
  leftArrow: "#arrow-left",
  rightArrow: "#arrow-right",
  slideSelector: ".slideitem",
  duration: 500,
  easing: "cubic-bezier(.2,.9,.2,1)",
  stepPercent: 100,
  loop: true,
  autoScroll: true,
  autoScrollDelay: 7000,
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
