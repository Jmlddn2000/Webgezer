import {useState, useEffect, useRef} from 'react'
import Kalibrasi from './Kalibrasi';


export default function Canvas() {
    // const [canvas, setCanvas] = useState()
    
    //=============================== Canvasss file
    // function resize() {
    //     var canvas = document.getElementById('plotting_canvas');
    //     var context = canvas.getContext('2d');
    //     context.clearRect(0, 0, canvas.width, canvas.height)
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // };
    // window.addEventListener('resize', resize, false);
    const canvasRef = useRef(null)

    useEffect(() => {
      // console.log("x")
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      //Our first draw
      context.fillStyle = ('green')
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    },)
      
  return (
    <div>
    <canvas ref={canvasRef} id="plotting_canvas" width="1000" height="500" ></canvas>
    <h1>Jamal ganteng</h1>
      {/* <Kalibrasi canvasRef = {canvasRef} /> */}
    </div>
  )
}
