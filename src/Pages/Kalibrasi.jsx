import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Kalibrasi.css'
import $ from 'jquery';
import Swal from 'sweetalert2';
import Canvas from './Canvas.jsx';
// import withReactContent from 'sweetalert2-react-content'


export default function Kalibrasi( getCanvas) {

  //====================================================== Kalibrasi File
    var PointCalibrate = 0;
    var CalibrationPoints={};
    // const MySwal = withReactContent(Swal)
    
    /**
     * Clear the canvas and the calibration button.
     */
    function ClearCanvas(){
      $(".Calibration").hide();
      var canvas = document.getElementById("plotting_canvas");
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
    
    /**
     * Show the instruction of using calibration at the start up screen.
     */
    function PopUpInstruction(){
      ClearCanvas();
      Swal.fire({
        title:"Calibration",
        text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
        buttons:{
          cancel: false,
          confirm: true
        }
      }).then(isConfirm => {
        ShowCalibrationPoint();
      });
    
    }
    /**
      * Show the help instructions right at the start.
      */
    function helpModalShow() {
        $('#helpModal').modal('show');
    }
    
    /**
     * Load this function when the index page starts.
    * This function listens for button clicks on the html page
    * checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
    */
    $(document).ready(function(){
      ClearCanvas();
      helpModalShow();
         $(".Calibration").click(function(){ // click event on the calibration buttons
    
          var id = $(this).attr('id');
    
          if (!CalibrationPoints[id]){ // initialises if not done
            CalibrationPoints[id]=0;
          }
          CalibrationPoints[id]++; // increments values
    
          if (CalibrationPoints[id]==5){ //only turn to yellow after 5 clicks
            $(this).css('background-color','yellow');
            $(this).prop('disabled', true); //disables the button
            PointCalibrate++;
          }else if (CalibrationPoints[id]<5){
            //Gradually increase the opacity of calibration points when click to give some indication to user.
            var opacity = 0.2*CalibrationPoints[id]+0.2;
            $(this).css('opacity',opacity);
          }
    
          //Show the middle calibration point after all other points have been clicked.
          if (PointCalibrate == 8){
            $("#Pt5").show();
          }
    
          if (PointCalibrate >= 9){ // last point is calibrated
                //using jquery to grab every element in Calibration class and hide them except the middle point.
                $(".Calibration").hide();
                $("#Pt5").show();
    
                // clears the canvas
                var canvas = document.getElementById("plotting_canvas");
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    
                // notification for the measurement process
                Swal.fire({
                  title: "Calculating measurement",
                  text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
                  closeOnEsc: false,
                  allowOutsideClick: false,
                  closeModal: true
                }).then( isConfirm => {
    
                    // makes the variables true for 5 seconds & plots the points
                    $(document).ready(function(){
    
                      store_points_variable(); // start storing the prediction points
    
                      sleep(5000).then(() => {
                          const webgazer = window.webgazer
                          stop_storing_points_variable(); // stop storing the prediction points
                          var past50 = webgazer.getStoredPoints(); // retrieve the stored points
                          var precision_measurement = calculatePrecision(past50);
                          var accuracyLabel = "<a>Accuracy | "+precision_measurement+"%</a>";
                          document.getElementById("Accuracy").innerHTML = accuracyLabel; // Show the accuracy in the nav bar.
                          Swal.fire({
                            title: "Your accuracy measure is " + precision_measurement + "%",
                            allowOutsideClick: false,
                            buttons: {
                              cancel: "Recalibrate",
                              confirm: true,
                            }
                          }).then(isConfirm => {
                              if (isConfirm){
                                //clear the calibration & hide the last middle button
                                ClearCanvas();
                              } else {
                                //use restart function to restart the calibration
                                document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
                                webgazer.clearData();
                                ClearCalibration();
                                ClearCanvas();
                                ShowCalibrationPoint();
                              }
                          });
                      });
                    });
                });
              }
        });
    });
    
    /**
     * Show the Calibration Points
     */
    function ShowCalibrationPoint() {
      $(".Calibration").show();
      $("#Pt5").hide(); // initially hides the middle button
    }
    
    /**
    * This function clears the calibration buttons memory
    */
    function ClearCalibration(){
      // Clear data from WebGazer
    
      $(".Calibration").css('background-color','red');
      $(".Calibration").css('opacity',0.2);
      $(".Calibration").prop('disabled',false);
    
      CalibrationPoints = {};
      PointCalibrate = 0;
    }
    
    // sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    //==================================================== presision calculate file

    function calculatePrecision(past50Array) {
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();
    
      // Retrieve the last 50 gaze prediction points
      var x50 = past50Array[0];
      var y50 = past50Array[1];
    
      // Calculate the position of the point the user is staring at
      var staringPointX = windowWidth / 2;
      var staringPointY = windowHeight / 2;
    
      var precisionPercentages = new Array(50);
      calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
      var precision = calculateAverage(precisionPercentages);
    
      // Return the precision measurement as a rounded percentage
      return Math.round(precision);
    };

    function calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY) {
      for (let x = 0; x < 50; x++) {
        // Calculate distance between each prediction and staring point
        var xDiff = staringPointX - x50[x];
        var yDiff = staringPointY - y50[x];
        var distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    
        // Calculate precision percentage
        var halfWindowHeight = windowHeight / 2;
        var precision = 0;
        if (distance <= halfWindowHeight && distance > -1) {
          precision = 100 - (distance / halfWindowHeight * 100);
        } else if (distance > halfWindowHeight) {
          precision = 0;
        } else if (distance > -1) {
          precision = 100;
        }
    
        // Store the precision
        precisionPercentages[x] = precision;
      }
    }

      /*
  * Calculates the average of all precision percentages calculated
  */
  function calculateAverage(precisionPercentages) {
    var precision = 0;
    for (let x = 0; x < 50; x++) {
      precision += precisionPercentages[x];
    }
    precision = precision / 50;
    return precision;
  }

  // =============================== presision store point =============================
      /*
    * Sets store_points to true, so all the occuring prediction
    * points are stored
    */
    const webgazer = window.webgazer
    function store_points_variable(){
      webgazer.params.storingPoints = true;
    }

    /*
    * Sets store_points to false, so prediction points aren't
    * stored any more
    */
    function stop_storing_points_variable(){
      webgazer.params.storingPoints = false;
    }


  return (
    <div>
      <div>
<canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>
  
<nav id="webgazerNavbar" className="navbar navbar-default navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      {/* <!-- The hamburger menu button --> */}
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar">Menu</span>
      </button>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        {/* <!-- Accuracy --> */}
        <li id="Accuracy"><a>Not yet Calibrated</a></li>
        <li><a onclick="Restart()" href="#">Recalibrate</a></li>
        <li><a onclick="webgazer.applyKalmanFilter(!webgazer.params.applyKalmanFilter)" href="#">Toggle Kalman Filter</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><button className="helpBtn" data-toggle="modal" data-target="#helpModal"><a data-toggle="modal"><span className="glyphicon glyphicon-cog"></span> Help</a></button></li>
        </ul>
      </div>
    </div>
  </nav>
{/* <!-- Calibration points --> */}
<div className="calibrationDiv">
    <input type="button" className="Calibration" id="Pt1"></input>
    <input type="button" className="Calibration" id="Pt2"></input>
    <input type="button" className="Calibration" id="Pt3"></input>
    <input type="button" className="Calibration" id="Pt4"></input>
    <input type="button" className="Calibration" id="Pt5"></input>
    <input type="button" className="Calibration" id="Pt6"></input>
    <input type="button" className="Calibration" id="Pt7"></input>
    <input type="button" className="Calibration" id="Pt8"></input>
    <input type="button" className="Calibration" id="Pt9"></input>
  </div>
  
  {/* <!-- Modal --> */}
  <div id="helpModal" className="modal fade" role="dialog">
    <div className="modal-dialog">
      
      {/* <!-- Modal content--> */}
      <div className="modal-content">
        <div className="modal-body">
          <img src="media/example/calibration.png" width="100%" height="100%" alt="webgazer demo instructions"></img>
        </div>
        <div className="modal-footer">
          <button id="closeBtn" type="button" className="btn btn-default" data-dismiss="modal">Close & load saved model </button>
          <button type="button" id='start_calibration' className="btn btn-primary" data-dismiss="modal" onclick="Restart()">Calibrate</button>
        </div>
      </div>

  </div>
</div>

{/* <!-- Latest compiled JavaScript --> */}
{/* <script src="./js/resize_canvas.js"></script>
<script src="./node_modules/bootstrap/dist/js/bootstrap.min.js"></script> */}
</div>
    </div>
  )
}