# Simple Slideshow/Carousel Script

A lightweight, vanilla JavaScript slideshow/carousel implementation with auto-scroll functionality, manual navigation, and viewport detection.

## Features

- **Smooth Transitions**: CSS-based animations with customizable duration and easing
- **Auto-scroll**: Automatic slide progression with configurable delay
- **Manual Navigation**: Left/right arrow controls with click handlers
- **Loop Support**: Seamless looping between first and last slides
- **Viewport Detection**: Automatically pauses when slideshow goes out of view
- **Responsive**: Works with any slide width and container size
- **Touch-friendly**: Supports both mouse and touch interactions
- **Flexible Selectors**: Use CSS selectors or DOM elements for configuration

## Basic Usage

### HTML Structure

```html
<div id="slideshow-wrapper">
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
  <div class="slide">Slide 3</div>
</div>

<button id="left-arrow">◀</button>
<button id="right-arrow">▶</button>
```

### JavaScript Implementation

```javascript
const slideshow = createSlideShow({
  wrapper: "#slideshow-wrapper",
  leftArrow: "#left-arrow",
  rightArrow: "#right-arrow",
  slideSelector: ".slide",
});
```

## Configuration Options

| Option            | Type           | Default        | Description                                            |
| ----------------- | -------------- | -------------- | ------------------------------------------------------ |
| `wrapper`         | Element/String | **Required**   | Container element to be transformed                    |
| `leftArrow`       | Element/String | `null`         | Previous slide button                                  |
| `rightArrow`      | Element/String | `null`         | Next slide button                                      |
| `slideSelector`   | String         | `".slideitem"` | CSS selector for slide elements                        |
| `duration`        | Number         | `500`          | Transition duration in milliseconds                    |
| `easing`          | String         | `"ease"`       | CSS transition easing function                         |
| `stepPercent`     | Number         | `100`          | Percentage to move per slide (100% = full slide width) |
| `loop`            | Boolean        | `false`        | Enable seamless looping                                |
| `autoScroll`      | Boolean        | `true`         | Enable automatic slide progression                     |
| `autoScrollDelay` | Number         | `3000`         | Delay between auto slides in milliseconds              |

## Advanced Usage

### Multiple Slideshows

```javascript
// Hero banner with auto-scroll
const heroBanner = createSlideShow({
  wrapper: "#hero-slides",
  slideSelector: ".hero-slide",
  duration: 800,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  loop: true,
  autoScroll: true,
  autoScrollDelay: 5000,
});

// Product gallery without auto-scroll
const productGallery = createSlideShow({
  wrapper: "#product-images",
  leftArrow: "#prev-btn",
  rightArrow: "#next-btn",
  slideSelector: ".product-image",
  autoScroll: false,
});
```

### Manual Control

```javascript
const slideshow = createSlideShow({
  wrapper: "#slideshow",
  slideSelector: ".slide",
});

// Manual navigation
slideshow.next(); // Go to next slide
slideshow.prev(); // Go to previous slide
slideshow.goTo(2); // Go to specific slide (0-indexed)

// Auto-scroll control
slideshow.pauseAutoScroll(); // Pause auto-scrolling
slideshow.resumeAutoScroll(); // Resume auto-scrolling

// Get current state
console.log(slideshow.getIndex()); // Current slide index

// Cleanup
slideshow.destroy(); // Remove all listeners and reset styles
```

## API Methods

| Method               | Description                       |
| -------------------- | --------------------------------- |
| `next()`             | Move to next slide                |
| `prev()`             | Move to previous slide            |
| `goTo(index)`        | Jump to specific slide            |
| `pauseAutoScroll()`  | Pause automatic scrolling         |
| `resumeAutoScroll()` | Resume automatic scrolling        |
| `startAutoScroll()`  | Start auto-scroll interval        |
| `stopAutoScroll()`   | Stop auto-scroll interval         |
| `getIndex()`         | Get current slide index           |
| `destroy()`          | Clean up all listeners and styles |

## Behavior

### Auto-scroll Logic

- Automatically starts when `autoScroll: true`
- Pauses when user manually navigates
- Pauses when slideshow goes out of viewport
- Resumes when slideshow comes back into view
- Stops at last slide if `loop: false`

### Manual Interaction

- Arrow clicks pause auto-scrolling
- Smooth transitions with customizable easing
- Navigation buttons hide at boundaries (when `loop: false`)

### Viewport Detection

- Uses Intersection Observer API
- Automatically pauses when slideshow is not visible
- Resumes auto-scroll when slideshow comes back into view
- Resets pause state on re-entry

## CSS Requirements

The script handles positioning automatically, but you may want to add:

```css
.slideshow-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.slide {
  display: inline-block;
  width: 100%;
  flex-shrink: 0;
}
```

## Browser Support

- Modern browsers with CSS transforms
- Intersection Observer API support
- DOMMatrixReadOnly support (with fallback)

## License

Copyright (c) 2024 Meshach Sandesh. All rights reserved.

---

**Developed by Meshach Sandesh for 23DOT4**
