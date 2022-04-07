    import { useState, useEffect } from "react";


    export function useGames(maxSize) {
      const [games, setGames] = useState([]);
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      useEffect(() => {
        (async () => {
          const card1 = new Array(33).fill({
            url: "./img.jpeg",
            link: "google.com",
          });
          const card2 = new Array(33).fill({
            url: "./img2.jpeg",
            link: "google.com",
          });
          const card3 = new Array(34).fill({
            url: "./img3.jpeg",
            link: "google.com",
          });
          const cards = [...card1,...card2,...card3];
          shuffle(cards);
          const firstHalf = cards.slice(0,54);
          const secondHalf =cards.slice(54, 98);
          const sprite = [
            {
              link: "/google",
              url: "./sprite.png",
              huge: true,
            },
          ];
          setGames([...firstHalf, ...sprite, ...secondHalf]);
        })();
      }, [maxSize, setGames]);

      return games;
    }
