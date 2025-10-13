# NavScrolling

A JavaScript utility for automatically centering active navigation items in horizontally scrollable navigation menus with smooth animations and cross-page position persistence.

## What It Does

The `navScrollManager` function automatically detects the currently active navigation item and smoothly scrolls the navigation container to center that item. This is particularly useful for:

- **Horizontal navigation menus** that overflow their container
- **Tab interfaces** where the active tab should be visible and centered
- **Breadcrumb navigation** that needs to scroll to show the current location
- **Multi-page applications** where navigation context should be preserved

## Key Features

### 🎯 **Smart Centering**

- Automatically finds the active/current navigation item
- Calculates the exact scroll position needed to center it
- Respects container boundaries (won't scroll beyond edges)

### ✨ **Smooth Animation**

- Custom `requestAnimationFrame` animation with cubic easing
- 400ms duration for natural feel
- Prevents animation conflicts and interruptions
- Always starts from current position (never jumps to start)

### 🔄 **Cross-Page Persistence**

- Stores scroll position in `sessionStorage`
- Restores previous position on page load
- Creates seamless navigation experience across page changes
- Position persists throughout browser session

### 🛡️ **Robust Error Handling**

- Validates all required elements exist
- Warns when containers or active items are not found
- Gracefully handles missing scroll containers
- Prevents execution if no scrolling is needed

## How It Works

1. **Element Detection**: Finds the navigation container and active item
2. **Container Resolution**: Identifies the scrollable parent container
3. **Position Restoration**: Restores previous scroll position from storage
4. **Calculation**: Determines target position to center the active item
5. **Animation**: Smoothly animates from current to target position
6. **Storage**: Saves final position for next page load

## Usage

### Basic Usage

```javascript
// Simple usage with default selectors
navScrollManager();
```

### Custom Configuration

```javascript
navScrollManager({
  scrollContainerSelector: ".custom-scroll-container",
  menuContainerSelector: ".nav-menu",
  activeItemSelector: ".active",
  useParentAsScrollContainer: false,
  storageKey: "customNavPosition",
});
```

### Parameters

| Parameter                    | Type    | Default                                       | Description                                |
| ---------------------------- | ------- | --------------------------------------------- | ------------------------------------------ |
| `scrollContainerSelector`    | string  | `null`                                        | CSS selector for specific scroll container |
| `menuContainerSelector`      | string  | `".div-block-69"`                             | CSS selector for navigation menu           |
| `activeItemSelector`         | string  | `".w--current, .active, .selected, .current"` | CSS selector for active item               |
| `useParentAsScrollContainer` | boolean | `true`                                        | Use parent element as scroll container     |
| `storageKey`                 | string  | `"navScrollPosition"`                         | SessionStorage key for position            |

## Requirements

### HTML Structure

```html
<div class="scroll-container">
  <nav class="div-block-69">
    <a href="/page1" class="nav-item">Page 1</a>
    <a href="/page2" class="nav-item w--current">Page 2</a>
    <a href="/page3" class="nav-item">Page 3</a>
  </nav>
</div>
```

### CSS Requirements

```css
.scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  /* Ensure horizontal scrolling is possible */
}

.nav-menu {
  display: inline-flex;
  /* Or display: flex with flex-wrap: nowrap */
}
```

## Browser Support

- Modern browsers with `requestAnimationFrame` support
- `sessionStorage` API support
- ES6+ features (arrow functions, const/let)

## Integration Examples

### Webflow Integration

```javascript
// Call on page ready
document.addEventListener("DOMContentLoaded", function () {
  navScrollManager({
    menuContainerSelector: ".nav-menu",
    activeItemSelector: ".w--current",
  });
});
```

### React/SPA Integration

```javascript
// Call after navigation changes
useEffect(() => {
  navScrollManager({
    activeItemSelector: ".active",
  });
}, [currentRoute]);
```

## Troubleshooting

### Common Issues

1. **Animation always starts from 0**

   - Check if scroll container has `overflow-x: auto/scroll`
   - Verify the correct parent element is scrollable

2. **Active item not found**

   - Ensure active item has the correct class
   - Check `activeItemSelector` matches your CSS

3. **No scrolling occurs**

   - Verify container width is smaller than content width
   - Check CSS `white-space: nowrap` on container

4. **Position not restored on page load**
   - Ensure function runs after DOM is ready
   - Check browser's sessionStorage is enabled

## Performance Notes

- Uses `requestAnimationFrame` for optimal performance
- Minimal DOM queries (cached selectors)
- Early exit conditions prevent unnecessary calculations
- No memory leaks (animations are properly cleaned up)
