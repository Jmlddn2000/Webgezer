import {useState} from 'react'
import Kalibrasi from './Kalibrasi';


export default function Canvas() {
    const [canvas, setCanvas] = useState()
    
    //=============================== Canvasss file
    function resize() {
        var canvas = document.getElementById('plotting_canvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, false);
      
  return (
    <div>
    <canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>
      <Kalibrasi getCanvas = {canvas} />
    </div>
  )
}
