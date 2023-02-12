import { useEffect } from 'react';
import './App.css';
import Canvas from './Pages/Canvas';
import Kalibrasi from './Pages/Kalibrasi';

function App() {

  useEffect(() => {
    const webgazer = window.webgazer
    webgazer.setGazeListener((data,clock) => {
    //  console.log(data)   
    }).begin()
 })

  return (
    <div>
      <h1>Anjas</h1>
      <Kalibrasi />
    </div>
  );
}

export default App;
