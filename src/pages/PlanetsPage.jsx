import { useContext, useEffect, useState } from "react";
import { dataContext } from "../contexts/DataContext";

const PlanetsPage = () => {
  const data = useContext(dataContext);
  const [planet, setPlanet] = useState();
  const planetUrl = data.map((film) => film.planets)[0][0];
  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await fetch(planetUrl);
        if (!response.ok) {
          console.log(`response not ok. Status: ${response.status}`);
          throw new Error(`response not ok. Status: ${response.status}`);
        }
        const planet = await response.json();
        setPlanet(planet);
      } catch (err) {
        console.log(err);
        throw new Error("fetch planet error");
      }
    };
    fetchPlanet();
  }, []);

  return (
    <>
      {planet &&
        Object.keys(planet).map((key) => (
          <p>
            {key}: <span>{planet[key]}</span>
          </p>
        ))}
    </>
  );
}

export default PlanetsPage
