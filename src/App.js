import { useEffect } from 'react';
import './App.css';
import Canvas from './Pages/Canvas';

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
      <Canvas />
    </div>
  );
}

export default App;
