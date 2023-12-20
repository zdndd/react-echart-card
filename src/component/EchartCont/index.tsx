import React from "react";
import "./echartcont.css";
import ReactEcharts from "echarts-for-react";

import { dataSource } from "./data.js";

const EchartCont = ({ chartType }: { chartType: any }) => {
  const getOption = () => {
    let option = {
      legend: {},
      tooltip: {},
      dataset: {
        // 提供一份数据。
        source: dataSource,
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: chartType }, { type: chartType }, { type: chartType }],
    };
    return option;
  };

  return <ReactEcharts option={getOption()} />;
};

export default EchartCont;
