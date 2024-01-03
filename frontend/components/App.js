import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPeople = 'http://localhost:9009/api/people';
const urlPlanets = 'http://localhost:9009/api/planets';

function App() {
  // ❗ Create state to hold the data from the API
  const [peopleWithPlanets, setPeopleWithPlanets] = useState([]);
  
  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    Promise.all([axios.get(urlPeople), axios.get(urlPlanets)])
      .then(([res1, res2]) => {
        const people = res1.data;
        const homeworlds = res2.data;

        const combinedData = people.map(person => {
          const homeworld = homeworlds.find(hw => hw.id === person.homeworld);
          return { ...person, homeworld };
        })
        setPeopleWithPlanets(combinedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {peopleWithPlanets.map(char => {
        return <Character key={char.id} name={char.name} planet={char.homeworld.name}/>
      })}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
