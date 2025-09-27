# CDN - JavaScript Components Library

A collection of lightweight, vanilla JavaScript components and CSS utilities for modern web development. This CDN provides easy-to-use carousel components, slideshow functionality, and styling utilities that can be integrated into any web project.

## 📦 Components

### 🎠 Rolling Carousel

**Location**: `library/carousalRolling/`

A sophisticated 3D rolling carousel with smooth animations and depth effects.

#### Features

- 3D rolling animation with zoom effects
- Configurable card dimensions and hiding percentages
- Smooth transitions between cards
- Click-to-focus interaction
- Customizable styling

#### Usage

```javascript
rollingCarousel({
  parentId: "c2Wrapper",
  cardClass: "card",
  cardWidth: 500,
  cardHeight: 500,
  cardHidePct: 50,
  startZoomValue: 1,
  endZoomValue: 0.8,
});
```

#### Files

- `carousalRolling_v2_2.js` - Latest version of the rolling carousel
- `carousalRolling.html` - Demo HTML
- `carousalRolling.md` - Component documentation

---

### 🖼️ Simple Slideshow

**Location**: `simpleSlideShow/`

A lightweight slideshow/carousel implementation with auto-scroll and manual navigation.

#### Features

- Smooth CSS-based transitions
- Auto-scroll with configurable timing
- Manual navigation controls
- Loop support
- Viewport detection (auto-pause when out of view)
- Touch and mouse support
- Responsive design

#### Usage

```javascript
simpleSlideShow({
  wrapper: "#slideshow-wrapper",
  slides: ".slide",
  leftArrow: "#left-arrow",
  rightArrow: "#right-arrow",
  autoScroll: true,
  scrollDelay: 3000,
});
```

#### Files

- `simpleSlideShow_v1_2.js` - Latest version
- `simpleSlideShow.js` - Base version
- `README.md` - Detailed documentation

---

### 🎭 Bambino Components

**Location**: `bambino/`

A collection of advanced UI components and utilities.

#### Features

- Advanced carousel functionality
- Gradient styling utilities
- Legacy support components
- Custom CSS animations

#### Files

- `bambinoMain_2_2.css` - Main stylesheet (latest)
- `bambinoMainv2_1.js` - JavaScript utilities
- `carousalRolling_v2_2.js` - Carousel implementation
- `gradient.css` - Gradient utilities
- `swipper.css` - Swiper-like animations

## 🚀 Quick Start

### Option 1: Direct Include

Include the components directly in your HTML:

```html
<!-- For Rolling Carousel -->
<script src="library/carousalRolling/carousalRolling_v2_2.js"></script>

<!-- For Simple Slideshow -->
<script src="simpleSlideShow/simpleSlideShow_v1_2.js"></script>

<!-- For Bambino Components -->
<link rel="stylesheet" href="bambino/bambinoMain_2_2.css" />
<script src="bambino/bambinoMainv2_1.js"></script>
```

### Option 2: CDN Usage

If hosting these files on a CDN, reference them directly:

```html
<script src="https://your-cdn-domain.com/library/carousalRolling/carousalRolling_v2_2.js"></script>
<link
  rel="stylesheet"
  href="https://your-cdn-domain.com/bambino/bambinoMain_2_2.css"
/>
```

## 📁 Project Structure

```
cdn/
├── README.md                           # This file
├── listStyler.css                      # List styling utilities
├── bambino/                            # Bambino component suite
│   ├── bambinoMain_2_2.css            # Main styles (latest)
│   ├── bambinoMainv2_1.js             # Main JavaScript
│   ├── carousalRolling_v2_2.js        # Carousel component
│   ├── gradient.css                   # Gradient utilities
│   ├── ourlegacy.js                   # Legacy support
│   ├── simpleSlideShow_v1_2.js        # Slideshow component
│   ├── swipper.css                    # Swiper animations
│   └── backup/                        # Archived versions
├── library/                           # Core component library
│   ├── carousel2_v2.js               # Alternative carousel
│   ├── carousalRolling/               # Rolling carousel suite
│   └── css/                           # Shared CSS utilities
└── simpleSlideShow/                   # Slideshow component
    ├── README.md                      # Detailed documentation
    ├── simpleSlideShow_v1_2.js        # Latest version
    └── simpleSlideShow.js             # Base version
```

## 🎨 Styling

### CSS Utilities

- `listStyler.css` - List styling utilities
- `gradient.css` - Gradient background utilities
- `swipper.css` - Animation and transition utilities

### Custom Styling

All components support custom CSS classes and can be styled to match your design system.

## 🔧 Configuration Options

### Rolling Carousel Options

| Option           | Type   | Default     | Description                |
| ---------------- | ------ | ----------- | -------------------------- |
| `parentId`       | string | "c2Wrapper" | Container element ID       |
| `cardClass`      | string | "card"      | CSS class for cards        |
| `cardWidth`      | number | 500         | Card width in pixels       |
| `cardHeight`     | number | cardWidth   | Card height in pixels      |
| `cardHidePct`    | number | 50          | Percentage of card to hide |
| `startZoomValue` | number | 1           | Initial zoom scale         |
| `endZoomValue`   | number | 0.8         | Final zoom scale           |

### Simple Slideshow Options

| Option        | Type            | Default              | Description            |
| ------------- | --------------- | -------------------- | ---------------------- |
| `wrapper`     | string/Element  | "#slideshow-wrapper" | Container selector     |
| `slides`      | string/NodeList | ".slide"             | Slide selector         |
| `leftArrow`   | string/Element  | "#left-arrow"        | Left navigation        |
| `rightArrow`  | string/Element  | "#right-arrow"       | Right navigation       |
| `autoScroll`  | boolean         | true                 | Enable auto-scroll     |
| `scrollDelay` | number          | 3000                 | Auto-scroll delay (ms) |

## 🌐 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- IE11+ (with polyfills)

## 📝 License

This project is open source. Please check individual component files for specific licensing information.

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. Components are tested across supported browsers
3. Documentation is updated for new features
4. Version numbers are incremented appropriately

## 📧 Support

For issues, questions, or contributions, please contact the maintainer or create an issue in the repository.

---

**Version**: 2.2  
**Last Updated**: September 2025
