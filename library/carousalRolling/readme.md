# Rolling Carousel v2.2

A sophisticated 3D rolling carousel component with smooth animations, depth effects, and mobile responsiveness. This vanilla JavaScript component creates an engaging visual experience with cards that roll and scale as users interact with them.

![Rolling Carousel Demo](./outcome.jpg)

## ✨ Features

- **3D Rolling Effect**: Cards smoothly roll in and out with realistic depth perception
- **Dynamic Scaling**: Progressive zoom effects from center to edges
- **Smooth Animations**: CSS transitions with cubic-bezier easing
- **Mobile Responsive**: Automatically switches to horizontal scroll on mobile devices
- **Click Navigation**: Click any visible card to bring it to focus
- **Configurable Parameters**: Extensive customization options
- **Opacity Gradients**: Cards fade as they move away from center
- **Z-index Management**: Proper layering for 3D effect
- **Performance Optimized**: Efficient rendering and position calculations

## 🚀 Quick Start

### HTML Structure

```html
<div id="carousalRolling" style="width: 100%; height: 600px;">
  <div class="card-rolling">
    <img src="image1.jpg" alt="Card 1" />
    <!-- Card content -->
  </div>
  <div class="card-rolling">
    <img src="image2.jpg" alt="Card 2" />
    <!-- Card content -->
  </div>
  <div class="card-rolling">
    <img src="image3.jpg" alt="Card 3" />
    <!-- Card content -->
  </div>
  <!-- Add more cards as needed -->
</div>
```

### JavaScript Integration

```html
<script src="carousalRolling_v2_2.js"></script>
```

The carousel will automatically initialize with default settings when the script loads.

## 🔧 Configuration Options

### Primary Function: `carouselRolling(options)`

| Parameter     | Type   | Default             | Description                        |
| ------------- | ------ | ------------------- | ---------------------------------- |
| `parentId`    | string | `"carousalRolling"` | ID of the container element        |
| `cardClass`   | string | `"card-rolling"`    | CSS class for carousel cards       |
| `cardWidth`   | number | `450`               | Width of each card in pixels       |
| `cardHeight`  | number | `550`               | Height of each card in pixels      |
| `cardHidePct` | number | `50`                | Percentage of card overlap (0-100) |
| `aspectRatio` | number | `800/976`           | Aspect ratio for mobile layout     |

### Advanced Function: `rollingCarousel(options)`

| Parameter        | Type   | Default       | Description                 |
| ---------------- | ------ | ------------- | --------------------------- |
| `parentId`       | string | `"c2Wrapper"` | Container element ID        |
| `cardClass`      | string | `"card"`      | CSS class for cards         |
| `cardWidth`      | number | `500`         | Card width in pixels        |
| `cardHeight`     | number | `cardWidth`   | Card height in pixels       |
| `cardHidePct`    | number | `50`          | Card overlap percentage     |
| `startZoomValue` | number | `1`           | Scale value for center card |
| `endZoomValue`   | number | `0.8`         | Scale value for edge cards  |

## 💻 Usage Examples

### Basic Implementation

```javascript
carouselRolling({
  parentId: "my-carousel",
  cardClass: "my-card",
  cardWidth: 400,
  cardHeight: 500,
  cardHidePct: 40,
});
```

### Advanced Configuration

```javascript
rollingCarousel({
  parentId: "advanced-carousel",
  cardClass: "gallery-card",
  cardWidth: 600,
  cardHeight: 400,
  cardHidePct: 60,
  startZoomValue: 1.1,
  endZoomValue: 0.7,
});
```

### Custom Mobile Settings

```javascript
carouselRolling({
  parentId: "responsive-carousel",
  cardClass: "responsive-card",
  cardWidth: 350,
  cardHeight: 450,
  aspectRatio: 4 / 3, // Custom aspect ratio for mobile
});
```

## 🎨 Styling Requirements

### Container CSS

```css
#carousalRolling {
  width: 100%;
  height: 600px; /* Required: Set explicit height */
  position: relative;
  overflow: hidden; /* Applied automatically by script */
}
```

### Card CSS

```css
.card-rolling {
  width: 450px;
  height: 550px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  /* Transitions applied automatically by script */
}

.card-rolling img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
```

## 📱 Mobile Behavior

The carousel automatically detects mobile devices and switches to a mobile-optimized mode:

- **Desktop**: 3D rolling carousel with click navigation
- **Mobile**: Horizontal scrolling layout with touch support
- **Detection**: Uses user agent string to identify mobile devices

### Mobile Features

- Horizontal scroll layout
- Touch-friendly interactions
- Optimized spacing and sizing
- Smooth scroll behavior

## 🔧 Technical Details

### Position Calculation Algorithm

The carousel uses a sophisticated algorithm to calculate card positions:

1. **Initial Positioning**: Calculates positions based on canvas width and card dimensions
2. **Scale Interpolation**: Applies progressive scaling from center to edges
3. **Overlap Calculation**: Manages card overlap based on `cardHidePct`
4. **Z-index Management**: Assigns proper layering for 3D effect
5. **Center Alignment**: Centers the pattern within the canvas

### Animation System

- **CSS Transitions**: Hardware-accelerated transforms
- **Cubic Bezier Easing**: `cubic-bezier(0.4,0,0.2,1)` for smooth motion
- **Multi-property Animation**: Coordinates left, transform, and scale properties
- **Opacity Fading**: Gradual fade for non-focused cards

### Performance Optimizations

- **Efficient Rendering**: Only renders visible cards
- **Minimal DOM Manipulation**: Optimized style updates
- **Event Delegation**: Efficient click handling
- **Calculation Caching**: Pre-computed positions for smooth interactions

## 🌐 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Safari**: 12+
- **Chrome Mobile**: 60+

## 🐛 Troubleshooting

### Common Issues

**Carousel not rendering:**

- Ensure container has explicit width and height
- Check that `parentId` matches the container element ID
- Verify cards have the correct class name

**Cards not animating smoothly:**

- Ensure container has `position: relative`
- Check that cards don't have conflicting CSS transitions
- Verify browser supports CSS transforms

**Mobile layout not working:**

- Check user agent detection
- Ensure container allows horizontal scrolling
- Verify cards have appropriate sizing

### Debug Mode

Add console logging by modifying the script:

```javascript
// Uncomment debug lines in the source code
console.log({ cardsToLeft, cardsToRight, selectedIndex, surroundingCards });
```

## 📄 Version History

### v2.2 (Current)

- Enhanced mobile responsiveness
- Improved position calculation algorithm
- Better opacity management
- Optimized performance
- Added aspect ratio support for mobile

### v2.1

- Added mobile device detection
- Implemented horizontal scroll fallback
- Enhanced touch interactions

### v2.0

- Complete rewrite with improved architecture
- Added z-index management
- Enhanced animation system
- Better configurability

## 🔗 Related Files

- `carousalRolling.html` - Demo implementation
- `carousalRolling.jpg` - Visual example
- `outcome.jpg` - Expected output reference
- `carousalRolling_v2.js` - Previous version
- `carousalRolling.js` - Original version

## 📝 License

Open source component - check main project for licensing details.

---

**Author**: MeshachSandesh  
**Version**: 2.2  
**Last Updated**: September 2025
