const navScrollManager = () => {
  // Get the scrollable parent container (with fixed width and overflow auto)
  const scrollContainer = document.querySelector(".div-block-69").parentElement;

  // Get the navigation menu container
  const menuContainer = document.querySelector(".div-block-69");

  // Find the currently selected/active menu item
  const activeMenuItem = menuContainer.querySelector(
    ".w--current, .active, .selected, .current"
  );

  if (!scrollContainer || !menuContainer || !activeMenuItem) {
    console.warn("Required elements not found for accordion menu positioning");
    return;
  }

  // Get container and active item positions
  const containerRect = scrollContainer.getBoundingClientRect();
  const activeItemRect = activeMenuItem.getBoundingClientRect();

  // Calculate the current scroll position
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

  // Smooth scroll to the calculated position
  scrollContainer.scrollTo({
    left: finalScrollLeft,
    behavior: "smooth",
  });
};
navScrollManager();
