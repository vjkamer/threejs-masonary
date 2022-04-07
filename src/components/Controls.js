import React from "react";
import { useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import useMobileDetect from "use-mobile-detect-hook";

export const Controls = ({
  contentWidth,
  contentHeight,
  extraWidthSpace = 0,
  extraTopSpace = 0,
  extraBotSpace = 0,
}) => {
  const { camera, size } = useThree();
  const controlsRef = React.useRef();
  const detectMobile = useMobileDetect();

  const limitPanning = (e) => {
    const {
      target: {
        target: { x, y },
      },
    } = e;

    const xBoundary =
      size.width < contentWidth
        ? contentWidth / 2 + extraWidthSpace - size.width / 2
        : size.width / 2 - extraWidthSpace - contentWidth / 2;

    if (x < -xBoundary) {
      e.target.target.x = -xBoundary;
      camera.position.x = -xBoundary;
    } else if (x > xBoundary) {
      e.target.target.x = xBoundary;
      camera.position.x = xBoundary;
    }

    const topBoundary =
      size.height < contentHeight
        ? contentHeight / 2 + extraTopSpace - size.height / 2
        : size.height / 2 - extraTopSpace - contentHeight / 2;

    const botBoundary =
      size.height < contentHeight
        ? contentHeight / 2 +
          extraBotSpace +
          (detectMobile.isMobile() ? 120 : 0) -
          size.height / 2
        : size.height / 2 - extraBotSpace - contentHeight / 2;

    if (y < -botBoundary) {
      e.target.target.y = -botBoundary;
      camera.position.y = -botBoundary;
    } else if (y > topBoundary) {
      e.target.target.y = topBoundary;
      camera.position.y = topBoundary;
    }
  };

  return (
    <MapControls
      ref={controlsRef}
      enableRotate={false}
      panSpeed={size.width > 773 ? 0.7 : 1.5}
      enableZoom={false}
      // maxZoom={1000}
      // minZoom={500}
      // zoomSpeed={0.35}
      onChange={limitPanning}
    />
  );
};
