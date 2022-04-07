import React from "react";
import { Image } from "@react-three/drei";
import { animated, useSpring, config } from "@react-spring/three";

function GameCardCore({
  zPosition,
  game,
  imageWidth,
  imageHeight,
  spaceBetweenCards,
  setHover,
  scaleIndex,
}) {
  const ref = React.useRef();

  const mayBeHugeImageWidth = game.huge
    ? imageWidth * 2 + spaceBetweenCards
    : imageWidth;

  return (
    <Image
      ref={ref}
      url={game.url}
      scale={[mayBeHugeImageWidth * scaleIndex, imageHeight * scaleIndex, 1]}
      position={[0, 0, zPosition]}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "grab";
        setHover(false);
      }}
      onClick={(e) => {
        if (e.delta !== undefined && e.delta <= 1) {
          window.location = game.link;
        }
      }}
    />
  );
}

const AnimatedCard = animated(GameCardCore);

export function GameCard(props) {
  const [hover, setHover] = React.useState(false);

  const { zPosition } = useSpring({
    from: { zPosition: -250 },
    zPosition: 0,
    config: { duration: 500 },
  });

  const { scaleIndex } = useSpring({
    from: { scaleIndex: 1 },
    scaleIndex: hover ? 1.07 : 1,
    config: config.gentle,
  });

  return (
    <AnimatedCard
      zPosition={zPosition}
      hover={hover}
      scaleIndex={scaleIndex}
      setHover={setHover}
      {...props}
    />
  );
}
