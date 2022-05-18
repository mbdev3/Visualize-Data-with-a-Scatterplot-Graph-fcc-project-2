import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { useData } from "./useData";
import { AxisBottom } from "./axisBottom";
import { AxisLeft } from "./axisLeft";
import { Marks } from "./Marks";
import { Legend } from "./legend";
import {
  csv,
  scaleLinear,
  max,
  min,
  format,
  extent,
  scaleTime,
  timeFormat,
  bin,
  timeMonths,
  sum,
  tip,
  tipOffsetScale,
  commaFormat,
  monthFormat,
  precisionPrefix,
} from "d3";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 20,
  bottom: 150,
  right: 30,
  left: 110,
};

const App = () => {
  const data = useData();
  if (!data) {
    return <pre>loading..</pre>;
  }
  console.log(data);
  const xValue = (d) => d["Year"];
  const xAxisLabel = "Date";

  const doping = (d) => d["Doping"];

  const yAxisLabel = "Time in Minutes";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xScale = scaleLinear()
    .domain([min(data, xValue), max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  const xAxisTickFormat = timeFormat("%Y");
  const yAxisTickFormat = timeFormat("%M %S");
  const toolTimeFormat = timeFormat(" %Y %B");

  const timeFormatting = (m) => {
    let minute = m.substr(0, 2);
    let second = m.substr(3);
    let date = new Date();
    date.setMinutes(minute);
    date.setSeconds(second);

    // yAxisTickFormat(date)
    return date;
  };
  const yValue = (d) => timeFormatting(d["Time"]);
  const yScale = scaleLinear().domain(extent(data, yValue)).range([0, innerHeight]).nice();

  const onMouseEnter = (e) => {
    // console.log(xScale(xValue(e)),yScale(yValue(e)));
    tooldiv
      .style("visibility", "visible")
      .html(
        () =>
          `${e["Name"]}: ${e["Nationality"]}</br>Year:${e["Year"]}, Time:${e["Time"]}
          </br>
          ${e["Doping"]}
          `
      )
      .style("left", xScale(xValue(e)) + "px")
      .style("top", yScale(yValue(e)) + "px")
      .style("transition", "all 0.3s ease")
      .attr("data-year", e["Year"]);
  };
  const onMouseOut = (e) => {
    tooldiv.style("visibility", "hidden");
  };
  return (
    <>
      <div id="title">
        <h1>Doping in Professional Bicycle Racing</h1>
        <p>35 Fastest times up Alpe d'Huez</p>
      </div>
      <div className="copyright">
        Made by
        <a href="https://thembdev.com">
          <img src={"https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg"} alt="mbdev" />
        </a>
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g id="x-axis">
            <AxisBottom innerHeight={innerHeight} xScale={xScale} tickFormat={xAxisTickFormat} />
          </g>
          <g id="y-axis">
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          </g>

          <text className="label" textAnchor="middle" x={innerWidth / 2} y={height - margin.bottom / 1.3}>
            {xAxisLabel}
          </text>
          <text
            className="label"
            textAnchor="middle"
            transform={`translate(${-margin.left / 1.5},${innerHeight / 2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
            tooltip={(d) => d}
            timeFormatting={timeFormatting}
            onMouseEnter={(e) => onMouseEnter(e)}
            onMouseOut={(e) => onMouseOut(e)}
            doping={doping}
          />
          <g transform={`translate(${innerWidth / 1.5},${100})`} opacity={0.75}>
            <Legend />
          </g>
        </g>
      </svg>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
