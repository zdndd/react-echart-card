import React, { useState, Component } from "react";
import "./echartcont.css";
import * as echarts from "echarts/core";

class EchartCont extends Component {
  componentDidMount() {
    console.log(document.getElementById("main"));
    var myChart = echarts.init(document.getElementById("main"));
  }
  render() {
    return (
      <div className="wrap">
        <div id="main">111</div>
      </div>
    );
  }
}

export default EchartCont;
