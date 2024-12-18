import { useContext, useEffect, useState } from "react";
import { dataContext } from "../contexts/DataContext";

const StarshipsPage = () => {
  const data = useContext(dataContext);
  const starshipsUrl = data.map((film) => film.starships)[0][0];
  const [starships, setStarships] = useState();
  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await fetch(starshipsUrl);
        if (!response.ok) {
          console.log(`response not ok. Status: ${response.status}`);
          throw new Error(`response not ok. Status: ${response.status}`);
        }
        const starships = await response.json();
        setStarships(starships);
      } catch (err) {
        console.log(err);
        throw new Error("fetch starships error");
      }
    };
    fetchStarships();
  }, []);

  return (
    <>
      {starships &&
        Object.keys(starships).map((key) => (
          <p>
            {key}: <span>{starships[key]}</span>
          </p>
        ))}
    </>
  );
};

export default StarshipsPage;
