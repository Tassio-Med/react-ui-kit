import { useState } from 'react'
import './App.css'
import Dropdown from './Dropdown'

export default function App() {
  const [selected, setSelected] = useState("");
  return (
    <div>
      <Dropdown selected={selected} setSelected={setSelected}/>
    </div>
  )
}
