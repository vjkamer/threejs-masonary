import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";
import { animated, useSpring } from "@react-spring/three";

export function BonusCardCore({
  zPosition,
  game,
  imageWidth,
  imageHeight,
  spaceBetweenCards,
}) {
  const spriteTexture = useLoader(THREE.TextureLoader, "./sprite.png");
  const animator = new PlainAnimator(spriteTexture, 10, 4, 40, 12);
  const texture = animator.init();
  const ref = React.useRef();

  useFrame(() => {
    animator.animate();
  });

  return (
    <mesh
      ref={ref}
      position={[0, 0, zPosition]}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "grab";
      }}
      onClick={(e) => {
        if (e.delta !== undefined && e.delta <= 1) {
          window.location = game.link;
        }
      }}
    >
      <planeGeometry args={[imageWidth * 2 + spaceBetweenCards, imageHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

const AnimatedCard = animated(BonusCardCore);

export function BonusCard(props) {
  const { zPosition } = useSpring({
    from: { zPosition: -250 },
    zPosition: 0,
    config: { duration: 500 },
  });

  return <AnimatedCard zPosition={zPosition} {...props} />;
}
