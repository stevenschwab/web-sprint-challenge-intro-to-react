import React, { useState } from 'react'

function Character(props) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [isRendering, setIsRendering] = useState(false);
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const toggle = () => {
    setIsRendering(!isRendering);
  }

  return (
    <div className='character-card' onClick={toggle}>
      {/* Use the same markup with the same attributes as in the mock */}
      <h3 className='character-name'>{props.name}</h3>
      {isRendering && <p><span className='character-planet'>Planet: {props.planet}</span></p>}
    </div>
  )
}

export default Character
