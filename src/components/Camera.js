import React from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const FOV = 45;
const VERTICAL_FOV_IN_RADIANS = FOV * (Math.PI / 180);

export function Camera() {
  const { size } = useThree();
  const cameraRef = React.useRef();
  const [initialCameraZPosition] = React.useState(
    calculageCameraZpositionPreserveUnitToPixelRatio(size.height)
  );

  React.useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.position.z = calculageCameraZpositionPreserveUnitToPixelRatio(
        size.height
      );
    }
  }, [size]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, initialCameraZPosition]}
      fov={45}
      up={[0, 0, 1]}
    />
  );
}

function calculageCameraZpositionPreserveUnitToPixelRatio(screenHeight) {
  return screenHeight / (2 * Math.tan(VERTICAL_FOV_IN_RADIANS / 2));
}
