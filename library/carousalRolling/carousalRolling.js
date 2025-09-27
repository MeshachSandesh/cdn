const rollingCarousel = ({
  parentId = "c2Wrapper",
  cardClass = "card",
  cardWidth = 500,
  cardHeight = cardWidth,
  cardHidePct = 50,
  startZoomValue = 1,
  endZoomValue = 0.8,
}) => {
  /** Helper functions */
  function getInitialPositions({
    startZoomValue,
    endZoomValue,
    canvasPlaygroundRange,
    cardWidth,
    cardHeight,
    cardHidePct,
    maxLoops = 500,
  }) {
    let i = 0;
    let scale = 1;
    const positions = [];
    let loopCount = 0;
    while (loopCount < maxLoops / 2) {
      const thisCardWidth = cardWidth * scale;
      const thisCardHeight = cardHeight * scale;
      positions.push({
        startPos: i,
        width: thisCardWidth,
        scale,
        height: thisCardHeight,
        positionTop: (cardHeight - thisCardHeight) / 2,
      });
      const pct = (i + thisCardWidth) / canvasPlaygroundRange;
      const newCardScale =
        startZoomValue + (endZoomValue - startZoomValue) * pct;
      const newCardWidth = cardWidth * newCardScale;
      const newCardStartPos =
        i + thisCardWidth - newCardWidth * (cardHidePct / 100);
      i = Math.floor(newCardStartPos);
      i = i - (i / 100) * 10;
      scale = newCardScale;
      loopCount++;
    }
    const rvPos = positions.slice(1).map((pos) => ({
      ...pos,
      startPos: -pos.startPos,
    }));
    const fullPos = [...positions, ...rvPos].sort(
      (a, b) => a.startPos - b.startPos
    );
    return fullPos;
  }

  const addZindex = (selectedPositions) => {
    const centerIdx = Math.floor(selectedPositions.length / 2);
    selectedPositions.forEach((pos, idx) => {
      pos.zindex = selectedPositions.length - Math.abs(centerIdx - idx);
    });
  };

  function centerPatternOnCanvas(data, canvasWidth) {
    // find the card at startPos = 0 (center card)
    const centerCard = data.find((d) => d.startPos === 0);
    if (!centerCard) return data; // fallback

    // compute offset
    const offset = canvasWidth / 2 - centerCard.startPos;

    // shift all positions
    return data.map((d) => ({
      ...d,
      startPos: d.startPos + offset,
    }));
  }
  function getSurroundingCards(
    data,
    leftCount = 7,
    rightCount = 8,
    includeCenter = true
  ) {
    const centerIndex = Math.floor(data.length / 2);

    const leftCards = data.slice(
      Math.max(0, centerIndex - leftCount),
      centerIndex
    );
    const rightCards = data.slice(
      centerIndex + 1,
      centerIndex + 1 + rightCount
    );

    if (includeCenter) {
      return [...leftCards, data[centerIndex], ...rightCards];
    }
    return [...leftCards, ...rightCards];
  }

  /** drawing functions */
  const drawCards = (cards, rearrangedPos) => {
    // Find the selected card (opacity 1)
    const selectedIdx = rearrangedPos.findIndex(
      (pos) =>
        pos &&
        pos.scale === Math.max(...rearrangedPos.map((p) => (p ? p.scale : 0)))
    );
    cards.forEach((card, idx) => {
      if (rearrangedPos[idx]) {
        const { startPos, scale, width, height, zindex, positionTop } =
          rearrangedPos[idx];
        const centeredLeft = startPos - width / 2;
        card.style.position = "absolute";
        card.style.left = `${centeredLeft}px`;
        card.style.transform = `scale(${scale})`;
        card.style.scale = scale;
        card.style.zIndex = zindex;
        /** opacity */
        const dist = Math.abs(idx - selectedIdx);
        let opacity = 1 - dist * 0.2;
        if (opacity < 0.2) opacity = 0.2;
        Array.from(card.children).forEach((child) => {
          child.style.opacity = opacity;
        });
      } else {
        card.style.display = "none";
      }
    });
  };

  /** get elements */
  const c2Wrapper = document.getElementById(parentId);
  if (!c2Wrapper) {
    console.error(`Element with id ${parentId} not found`);
    return;
  }

  // Check if c2Wrapper has width and height
  const wrapperWidth = c2Wrapper.offsetWidth;
  const wrapperHeight = c2Wrapper.offsetHeight;
  if (!wrapperWidth || !wrapperHeight) {
    console.warn(
      `Warning: Element with id "${parentId}" does not have explicit width and/or height. Carousel may not render correctly.`
    );
  }

  // Add required CSS to c2Wrapper
  c2Wrapper.style.overflow = "hidden";
  c2Wrapper.style.position = "relative";

  const cards = c2Wrapper.querySelectorAll(`.${cardClass}`);
  // Add transition CSS to all cards at init

  cards.forEach((card) => {
    card.style.transition =
      "left 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1), scale 0.4s";
    // "left 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1), scale 0.4s, opacity 0.4s";
  });

  cards.forEach((card) => {
    Array.from(card.children).forEach((child) => {
      child.style.transition = "opacity 0.4s cubic-bezier(0.4,0,0.2,1)";
    });
  });

  /** constants */
  const canvasWidth = c2Wrapper.offsetWidth;
  const canvasPlaygroundRange = canvasWidth / 2 + cardWidth / 2;
  const totalCards = cards.length;

  /** prepare positions */
  const positionsCenteredTo0 = getInitialPositions({
    startZoomValue,
    endZoomValue,
    canvasPlaygroundRange,
    cardWidth,
    cardHeight,
    cardHidePct,
    maxLoops: totalCards * 2 + 2,
  });
  addZindex(positionsCenteredTo0);
  const positionsCenteredToCanvas = centerPatternOnCanvas(
    positionsCenteredTo0,
    canvasWidth
  );

  /** draw function: used once initially, then on click */
  const draw = (selectedIndex) => {
    const cardsToLeft = selectedIndex;
    const cardsToRight = totalCards - selectedIndex - 1;

    const surroundingCards = getSurroundingCards(
      positionsCenteredToCanvas,
      cardsToLeft,
      cardsToRight,
      true
    );

    // console.log({ cardsToLeft, cardsToRight, selectedIndex, surroundingCards });
    drawCards(cards, surroundingCards);
  };

  /** Initial draw and event handlers */
  draw(Math.round(totalCards / 2) - 1);

  /** event listeners */
  cards.forEach((card, idx) => {
    card.onclick = (event) => {
      event.stopPropagation();
      handleCardClick(idx, card);
    };
  });

  function handleCardClick(index, cardElement) {
    draw(index);
  }
};

/** for mobile */
function isMobileDevice() {
  return (
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
}
const rollingCarouselMobile = ({ parentId, cardClass, aspectRatio }) => {
  console.log("running mobile carousel");
  const c2Wrapper = document.getElementById(parentId);
  if (!c2Wrapper) {
    console.error(`Element with id ${parentId} not found`);
    return;
  }

  // Set flex styles for mobile
  c2Wrapper.style.display = "flex";
  c2Wrapper.style.flexDirection = "row";
  c2Wrapper.style.maxWidth = "max-content";
  c2Wrapper.style.overflowX = "scroll";
  c2Wrapper.style.position = "relative";

  // Get cards and set basic styles
  const cards = c2Wrapper.querySelectorAll(`.${cardClass}`);
  cards.forEach((card) => {
    card.style.flex = "0 0 auto";
    card.style.marginRight = "16px";
    card.style.transition = "transform 0.3s, opacity 0.3s";
    // if (aspectRatio) {
    //   card.style.width = "180px";
    //   card.style.height = `${180 / aspectRatio}px`;
    // }
  });

  // Optionally, scroll to center card on load
  const centerIdx = Math.floor(cards.length / 2);
  if (cards[centerIdx]) {
    cards[centerIdx].scrollIntoView({ inline: "center", behavior: "smooth" });
  }
};

const carouselRolling = ({
  parentId,
  cardHidePct,
  cardClass,
  cardWidth,
  cardHeight,
  aspectRatio,
}) => {
  isMobileDevice()
    ? rollingCarouselMobile({ parentId, cardClass, aspectRatio })
    : rollingCarousel({
        parentId,
        cardHidePct,
        cardClass,
        cardWidth,
        cardHeight,
      });
};

carouselRolling({
  parentId: "carousalRolling",
  cardHidePct: 50,
  cardClass: "card-rolling",
  cardWidth: 450,
  cardHeight: 550,
  aspectRatio: 800 / 976,
});
