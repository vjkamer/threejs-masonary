import React from "react";
import { useThree } from "@react-three/fiber";

import { Camera } from "./components/Camera";
import { GamesGrid } from "./components/GamesGrid";
import { Controls } from "./components/Controls";

export function App() {
  const { size } = useThree();
  const spaceBetweenCards = size.width > 773 ? 16 : 8;
  const imageWidth =
    size.width > 773 ? 358 : size.width / 2 - spaceBetweenCards;
  const imageHeight = (imageWidth * 187) / 358;
  const colsNumber = 10;
  const rowsNumber = 10;
  const contentWidth = (imageWidth + spaceBetweenCards) * colsNumber;
  const contentHeight = (imageHeight + spaceBetweenCards) * rowsNumber;

  return (
    <>
      <Camera />
      <Controls
        contentWidth={contentWidth}
        contentHeight={contentHeight}
        extraWidthSpace={spaceBetweenCards / 2}
        extraTopSpace={60 + spaceBetweenCards / 2}
        extraBotSpace={spaceBetweenCards / 2}
      />
      <GamesGrid
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        spaceBetweenCards={spaceBetweenCards}
        colsNumber={colsNumber}
        rowsNumber={rowsNumber}
        contentWidth={contentWidth}
        contentHeight={contentHeight}
        enableMovement={false}
      />
    </>
  );
}
