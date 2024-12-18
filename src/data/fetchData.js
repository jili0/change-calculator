const fetchData = async () => {
  try {
    const response = await fetch("https://swapi.py4e.com/api/films/");
    if (!response.ok) {
      console.log(`Fetching data: response not ok. Status: ${response.status}`);
      throw new Error(
        `Fetching data: response not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err);
    throw new Error("Error by fetching Data");
  }
};

const data = await fetchData()

// {
//   "title": "The Force Awakens",
//   "episode_id": 7,
//   "opening_crawl": "Luke Skywalker has vanished.\r\nIn his absence, the sinister\r\nFIRST ORDER has risen from\r\nthe ashes of the Empire\r\nand will not rest until\r\nSkywalker, the last Jedi,\r\nhas been destroyed.\r\n \r\nWith the support of the\r\nREPUBLIC, General Leia Organa\r\nleads a brave RESISTANCE.\r\nShe is desperate to find her\r\nbrother Luke and gain his\r\nhelp in restoring peace and\r\njustice to the galaxy.\r\n \r\nLeia has sent her most daring\r\npilot on a secret mission\r\nto Jakku, where an old ally\r\nhas discovered a clue to\r\nLuke's whereabouts....",
//   "director": "J. J. Abrams",
//   "producer": "Kathleen Kennedy, J. J. Abrams, Bryan Burk",
//   "release_date": "2015-12-11",
//   "characters": [
//       "https://swapi.py4e.com/api/people/1/",
//       "https://swapi.py4e.com/api/people/3/",
//       "https://swapi.py4e.com/api/people/5/",
//       "https://swapi.py4e.com/api/people/13/",
//       "https://swapi.py4e.com/api/people/14/",
//       "https://swapi.py4e.com/api/people/27/",
//       "https://swapi.py4e.com/api/people/84/",
//       "https://swapi.py4e.com/api/people/85/",
//       "https://swapi.py4e.com/api/people/86/",
//       "https://swapi.py4e.com/api/people/87/",
//       "https://swapi.py4e.com/api/people/88/"
//   ],
//   "planets": [
//       "https://swapi.py4e.com/api/planets/61/"
//   ],
//   "starships": [
//       "https://swapi.py4e.com/api/starships/10/",
//       "https://swapi.py4e.com/api/starships/77/"
//   ],
//   "vehicles": [],
//   "species": [
//       "https://swapi.py4e.com/api/species/1/",
//       "https://swapi.py4e.com/api/species/2/",
//       "https://swapi.py4e.com/api/species/3/"
//   ],
//   "created": "2015-04-17T06:51:30.504780Z",
//   "edited": "2015-12-17T14:31:47.617768Z",
//   "url": "https://swapi.py4e.com/api/films/7/"
// }

export default data;
