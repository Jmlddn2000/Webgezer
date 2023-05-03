import { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/canvas.css"

export default function Headmap() {
  const heatmapRef = useRef(null);
  const [datas, isDAtas] = useState([]);
  const inputElement = document.getElementById("json-file");
  const lists = []

  const height = window.innerHeight
  const width = window.innerWidth

  // console.log("height=" + height + " width=" + width)

  function handleFiles(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      // Do something with the JSON data
      // console.log(jsonData.map((list) => isDAtas(list)));
      isDAtas(jsonData);
    };

    reader.readAsText(file);
  }


var rangeStart = 500;  // Rentang nilai x dimulai dari 500
var rangeEnd = 600;    // Rentang nilai x berakhir di 600
var rangeStep = 20;    // Rentang nilai x berubah setiap 20

var rangeCounts = {};


// Loop melalui setiap objek pada array
for (var i = 0; i < datas.length; i++) {
  var obj = datas[i];
  var x = obj.x;
  
  // Cari range yang sesuai dengan nilai x
  var range = Math.floor((x - rangeStart) / rangeStep) * rangeStep + rangeStart;
  
  // Jika range belum pernah ditemukan sebelumnya, inisialisasi dengan 0
  if (rangeCounts[range] === undefined) {
    rangeCounts[range] = 0;
  }
  
  // Tambahkan 1 pada kemunculan nilai x pada range yang sesuai
  rangeCounts[range]++;
}

// Tampilkan hasil pengelompokan dan jumlah kemunculan nilai x pada setiap rentang
for (var range = rangeStart; range <= rangeEnd; range += rangeStep) {
  var count = rangeCounts[range] || 0;
  console.log("Nilai x antara " + range + " dan " + (range + rangeStep) + " ditemukan sebanyak " + count + " kali.");
}


  useEffect(() => {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector(".App"),
    });
    // now generate some random data
    var points = [];
    var max = 0;
    var width = window.innerWidth;
    var height = window.innerHeight;;
    var len = 10;

    if(datas != null) {
      points.push(datas);
      // console.log("ini x", Math.ceil(datas.x),"ini y", Math.ceil(datas.y))
    }else{
      console.log("masukkan kordinat")
    }
 
    while (len--) {
      // var val = Math.floor(Math.random() * 100);
      max = Math.max(max, 30);
      var point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: 30,
      };
      points.push(point);
    }
    // heatmap data format
    var data = {
      max: max,
      data: points,
    };

    // console.log(data);

    // console.log(data);
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  });

  return (
    <div>
      <div>
        <input type="file" onChange={handleFiles} />
      </div>

      <div className="App" style={{height: height, width}}>
        <h1>Headmap</h1>
      </div>
    </div>
  );
}