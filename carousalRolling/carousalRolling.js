const carouselRolling = ({
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
    cards.forEach((card, idx) => {
      if (rearrangedPos[idx]) {
        const { startPos, scale, width, height, zindex, positionTop } =
          rearrangedPos[idx];

        // Adjust so card is centered at startPos instead of left-aligned
        const centeredLeft = startPos - width / 2;

        card.style.position = "absolute";
        card.style.left = `${centeredLeft}px`;
        card.style.transform = `scale(${scale})`;
        card.style.width = `${width}px`;
        card.style.height = `${height}px`;
        card.style.zIndex = zindex;
        card.style.top = `${positionTop}px`;

        card.textContent = `Center: ${startPos.toFixed(2)}, index: ${idx}`;
      } else {
        card.style.display = "none";
      }
    });
  };

  /** get elements */
  const c2Wrapper = document.getElementById(parentId);
  const cards = c2Wrapper.querySelectorAll(`.${cardClass}`);
  // Add transition CSS to all cards at init
  cards.forEach((card) => {
    card.style.transition =
      "left 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s, height 0.4s";
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

  // console.log(positionsCenteredToCanvas);

  const draw = (selectedIndex) => {
    const cardsToLeft = selectedIndex;
    const cardsToRight = totalCards - selectedIndex - 1;

    const surroundingCards = getSurroundingCards(
      positionsCenteredToCanvas,
      cardsToLeft,
      cardsToRight,
      true
    );
    drawCards(cards, surroundingCards);
  };

  draw(Math.round(totalCards / 2));

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

carouselRolling({
  parentId: "carousalRolling",
  cardHidePct: 50,
  cardClass: "card",
});
