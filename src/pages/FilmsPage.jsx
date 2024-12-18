import { useContext, useEffect, useState } from "react";
import { dataContext } from "../contexts/DataContext";

const FilmsPage = () => {
  const data = useContext(dataContext);
  const [films, setFilms] = useState(data);
  return (
    <>
      {films &&
        films.map((film) =>
          Object.keys(film).map((key) => (
            <p>
              {key}: <span>{film[key]}</span>
            </p>
          ))
        )}
    </>
  );
};

export default FilmsPage;
