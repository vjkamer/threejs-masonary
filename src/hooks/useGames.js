import { useState, useEffect } from "react";

const brokenGames = ["Caribbean Draw Poker", "Three Kingdom Wars"];

export function useGames(maxSize) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://bonus.chatwindow.info/api/rtg/punt/games"
      );
      const games = await response.json();
      const normalizedGames = games["data"]
        .reverse()
        .filter((game) => !brokenGames.includes(game.name))
        .map((game) => ({
          link: `/game/?game=${game.simple_name}&gamename=${game.name}`,
          url: `https://assets.punt.casino/rtg/games/${game.simple_name}.jpg`,
        }));
      const beforeBonus = normalizedGames.slice(0, 54);
      const bonus = [
        {
          link: "/cashier/?bonuscode=bonus1000",
          url: "./bonus.png",
          huge: true,
        },
      ];
      const afterBonus = normalizedGames.slice(54, 98);
      setGames([...beforeBonus, ...bonus, ...afterBonus]);
    })();
  }, [maxSize, setGames]);

  return games;
}
