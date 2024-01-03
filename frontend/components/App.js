import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPeople = 'http://localhost:9009/api/people';
const urlPlanets = 'http://localhost:9009/api/planets';

function App() {
  // ❗ Create state to hold the data from the API
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    const urls = [urlPeople, urlPlanets];

    Promise.all(urls.map(url => axios.get(url)))
      .then(responses => {
        const combinedData = responses.map(response => response.data);
        console.log(combinedData);
        let rawPeople = combinedData[0]
        let rawPlanets = combinedData[1]
        const cleanedData = rawPeople.map(person => {
          const rawHomeworld = rawPlanets.filter(planet => planet.id === person.homeworld)[0];
          return { ...person, homeworld: rawHomeworld};
        })
        console.log(cleanedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
