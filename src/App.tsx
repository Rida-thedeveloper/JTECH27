import { useState } from 'react'
import Intro from './components/Intro/Intro'
import Homepage from './components/Homepage/Homepage'
import './styles/homepage.css'

export default function App() {
  const [entered, setEntered] = useState(false)
  return <>
    {!entered && <Intro onComplete={() => setEntered(true)} />}
    {entered && <Homepage />}
  </>
}
