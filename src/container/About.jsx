import React,{createRef,useRef} from 'react'
import { FaLayerGroup,FaAccusoft, FaFile } from "react-icons/fa";
import ReactToPdf from "react-to-pdf";
import jsPDF from 'jspdf';

import html2canvas from "html2canvas";
function About() {
//   const ref = createRef();
// const options = {
//     orientation: 'portrait',
//     unit: "in",
//     format: [0, 0]
// };
// var pdf = new jsPDF("portrait", "mm", "a4");
// pdf.scaleFactor = 2;
// pdf.addImage(canvas.toDataURL("../assets/images/brands/brand1.png"), 0, 0, 210, 297);
const inputRef = useRef(null);

    return (
        <div>
{/*           
          <ReactToPdf targetRef={ref} filename="reciept.pdf" width={"100%"} height={"100%"} options={options} scale={0.8}>
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
    </ReactToPdf> */}
          {/* <button onClick={printDocument}>save</button> */}

           <section className="text-center about" >
      <h1>About US</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200" >
            <span><FaLayerGroup/></span>

            <h2>Fast</h2>
            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </div>
          <br/>
          <div className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200">
          <span><FaAccusoft/></span>
            <h2>Secure </h2>
            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
          </div>
          <br/>
          <div className="clearfix visible-md-block visible-sm-block"></div>
          <div className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200">
          <span><FaFile/></span>
            <h2>Policies </h2>
            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </div>
          
        </div>
        
      </div>
    </section>  
        </div>
    )
}

export default About
