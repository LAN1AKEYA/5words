import './App.css'
import Grid from './components/Grid/Grid'
import Keyboard from './components/Keyboard/Keyboard'
import { KeyboardHandle } from './engine/Engine';

//KeyboardHandle();

document.addEventListener('keydown', (event) => KeyboardHandle("phisical", event.code))


export default function App() {
  return (
    <>
      <Grid width="3" height="3" gap="10" word="чай"/>
      <Keyboard />
    </>
  )
}