import React,{useContext} from 'react'
import noteContext from '../Context/noteContext'

function About() {
  const a=useContext(noteContext);
  return (
    <div>
      <h1>About {a.name } from { a.class}</h1>
    </div>
  )
}

export default About
