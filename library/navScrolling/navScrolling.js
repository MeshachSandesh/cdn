const navScrollManager = ({
  scrollContainerSelector = null, // Parent scrollable container selector
  menuContainerSelector = ".div-block-69", // Navigation menu container selector
  activeItemSelector = ".w--current, .active, .selected, .current", // Active menu item selector
  useParentAsScrollContainer = true, // Whether to use menuContainer's parent as scroll container
  storageKey = "navScrollPosition", // Key to store scroll position in sessionStorage
} = {}) => {
  // Get the navigation menu container first
  const menuContainer = document.querySelector(menuContainerSelector);

  if (!menuContainer) {
    console.warn(`Menu container not found: ${menuContainerSelector}`);
    return;
  }

  // Get the scrollable parent container
  let scrollContainer;
  if (scrollContainerSelector) {
    scrollContainer = document.querySelector(scrollContainerSelector);
  } else if (useParentAsScrollContainer) {
    scrollContainer = menuContainer.parentElement;
  } else {
    scrollContainer = menuContainer;
  }

  // Find the currently selected/active menu item
  const activeMenuItem = menuContainer.querySelector(activeItemSelector);

  if (!scrollContainer || !activeMenuItem) {
    console.warn(
      "Required elements not found for navigation scroll positioning"
    );
    return;
  }

  // Restore previous scroll position from storage (simulates continuous scrolling across page loads)
  const storedPosition = sessionStorage.getItem(storageKey);
  if (storedPosition && scrollContainer.scrollLeft === 0) {
    scrollContainer.scrollLeft = parseInt(storedPosition);
    console.log("Restored previous scroll position:", storedPosition);
  }

  // Get container and active item positions
  const containerRect = scrollContainer.getBoundingClientRect();
  const activeItemRect = activeMenuItem.getBoundingClientRect();

  // Calculate the current scroll position (now includes restored position)
  const currentScrollLeft = scrollContainer.scrollLeft;

  // Calculate where the active item is relative to the container
  const activeItemLeftRelativeToContainer =
    activeItemRect.left - containerRect.left + currentScrollLeft;

  // Calculate the center position we want the active item to be at
  const containerCenterX = containerRect.width / 2;
  const activeItemCenterX = activeItemRect.width / 2;

  // Calculate the target scroll position to center the active item
  const targetScrollLeft =
    activeItemLeftRelativeToContainer - containerCenterX + activeItemCenterX;

  // Ensure we don't scroll beyond the boundaries
  const maxScrollLeft = menuContainer.scrollWidth - containerRect.width;
  const finalScrollLeft = Math.max(
    0,
    Math.min(targetScrollLeft, maxScrollLeft)
  );

  // Store the target position for the next page load
  sessionStorage.setItem(storageKey, finalScrollLeft.toString());

  // Create smooth animation from current position (which may be restored) to target
  const startTime = performance.now();
  const startScrollLeft = currentScrollLeft;
  const duration = 400; // ms
  const distance = finalScrollLeft - startScrollLeft;

  console.log(
    `Animating from ${startScrollLeft} to ${finalScrollLeft} (distance: ${distance})`
  );

  // Cancel any existing animation
  if (scrollContainer._navScrollAnimation) {
    cancelAnimationFrame(scrollContainer._navScrollAnimation);
  }

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out cubic)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentPosition = startScrollLeft + distance * easedProgress;

    scrollContainer.scrollLeft = currentPosition;

    if (progress < 1) {
      scrollContainer._navScrollAnimation = requestAnimationFrame(animate);
    } else {
      // Ensure we end at exactly the target position
      scrollContainer.scrollLeft = finalScrollLeft;
      delete scrollContainer._navScrollAnimation;
    }
  };

  // Only animate if there's a meaningful distance to travel
  if (Math.abs(distance) > 1) {
    scrollContainer._navScrollAnimation = requestAnimationFrame(animate);
  }
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = navScrollManager;
}
