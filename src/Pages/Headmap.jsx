import { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Headmap() {
  const heatmapRef = useRef(null);
  const [data, isDAta] = useState();
  const inputElement = document.getElementById("json-file");

  function handleFiles(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      // Do something with the JSON data
      console.log(jsonData.map((list) => isDAta(list)));
    };

    reader.readAsText(file);
  }

  console.log(data)

  useEffect(() => {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector(".App"),
    });
    // now generate some random data
    var points = [];
    var max = 0;
    var width = 540;
    var height = 400;
    var len = 10;

    while (len--) {
      var val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val,
      };
      points.push(point);
    }
    // heatmap data format
    var data = {
      max: max,
      data: points,
    };

    console.log(data);

    // console.log(data);
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  },[data]);

  return (
    <div>
      <div>
        <input type="file" onChange={handleFiles} />
      </div>

      <div className="App">
        {/* <canvas
          ref={heatmapRef}
          // height={1000}
          id="canvasID"
          className="canvas"
          // className="position-absolute"
        ></canvas> */}
        <h1>Headmap</h1>
      </div>
    </div>
  );
}
