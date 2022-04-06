import React from "react";
import { Flex, Box } from "@react-three/flex";
import { useFrame } from "@react-three/fiber";
import { useGames } from "../hooks/useGames";
import { GameCard } from "./GameCard";
import { BonusCard } from "./BonusCard";

export function GamesGrid({
  imageWidth,
  imageHeight,
  spaceBetweenCards,
  colsNumber,
  rowsNumber,
  contentWidth,
  contentHeight,
  enableMovement,
}) {
  const games = useGames(colsNumber * rowsNumber);
  const gridRef = React.useRef();
  const enableMovementRef = React.useRef(enableMovement);

  useFrame(() => {
    if (enableMovementRef.current && gridRef.current) {
      if (gridRef.current.position.x > -contentWidth) {
        gridRef.current.position.x -= 0.4;
      } else {
        gridRef.current.position.x = 0;
      }
    }
  });

  return (
    <React.Suspense fallback={null}>
      <Flex
        ref={gridRef}
        onPointerOver={() => {
          enableMovementRef.current = false;
        }}
      >
        <Flex
          size={[contentWidth, contentHeight, 0]}
          position={[-(contentWidth / 2), contentHeight / 2, 0]}
          flexDir="row"
          flexWrap="wrap"
        >
          {games.map((game, i) => (
            <Box key={i} centerAnchor={true} margin={spaceBetweenCards / 2}>
              {game.huge ? (
                <BonusCard
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  spaceBetweenCards={spaceBetweenCards}
                  game={game}
                />
              ) : (
                <GameCard
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  spaceBetweenCards={spaceBetweenCards}
                  game={game}
                />
              )}
            </Box>
          ))}
        </Flex>
        {/* Duplicate for animation */}
        {enableMovement && (
          <Flex
            size={[contentWidth, contentHeight, 0]}
            position={[contentWidth / 2, contentHeight / 2, 0]}
            flexDir="row"
            flexWrap="wrap"
          >
            {games.map((game, i) => (
              <Box key={i} centerAnchor={true} margin={spaceBetweenCards / 2}>
                {game.huge ? (
                  <BonusCard
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    spaceBetweenCards={spaceBetweenCards}
                    game={game}
                  />
                ) : (
                  <GameCard
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    spaceBetweenCards={spaceBetweenCards}
                    game={game}
                  />
                )}
              </Box>
            ))}
          </Flex>
        )}
      </Flex>
    </React.Suspense>
  );
}
