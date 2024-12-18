import { useContext, useEffect, useState } from "react";
import { dataContext } from "../contexts/DataContext";

const PeoplePage = () => {
  const data = useContext(dataContext);
  const peopleUrl = data.map((film) => film.characters)[0][0];
  const [people, setPeople] = useState();
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(peopleUrl);
        if (!response.ok) {
          console.log(`response not ok. Status: ${response.status}`);
          throw new Error(`response not ok. Status: ${response.status}`);
        }
        const people = await response.json();
        setPeople(people);
      } catch (err) {
        console.log(err);
        throw new Error("fetch people error");
      }
    };
    fetchPeople();
  }, []);

  return (
    <>
      {people &&
        Object.keys(people).map((key) => (
          <p>
            {key}: <span>{people[key]}</span>
          </p>
        ))}
    </>
  );
};

// {
//   "name": "Luke Skywalker",
//   "height": "172",
//   "mass": "77",
//   "hair_color": "blond",
//   "skin_color": "fair",
//   "eye_color": "blue",
//   "birth_year": "19BBY",
//   "gender": "male",
//   "homeworld": "https://swapi.py4e.com/api/planets/1/",
//   "films": [
//       "https://swapi.py4e.com/api/films/1/",
//       "https://swapi.py4e.com/api/films/2/",
//       "https://swapi.py4e.com/api/films/3/",
//       "https://swapi.py4e.com/api/films/6/",
//       "https://swapi.py4e.com/api/films/7/"
//   ],
//   "species": [
//       "https://swapi.py4e.com/api/species/1/"
//   ],
//   "vehicles": [
//       "https://swapi.py4e.com/api/vehicles/14/",
//       "https://swapi.py4e.com/api/vehicles/30/"
//   ],
//   "starships": [
//       "https://swapi.py4e.com/api/starships/12/",
//       "https://swapi.py4e.com/api/starships/22/"
//   ],
//   "created": "2014-12-09T13:50:51.644000Z",
//   "edited": "2014-12-20T21:17:56.891000Z",
//   "url": "https://swapi.py4e.com/api/people/1/"
// }

export default PeoplePage;
