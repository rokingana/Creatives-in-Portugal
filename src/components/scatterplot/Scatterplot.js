import "react-dropdown/style.css";
import React, { useState } from "react";
import { scaleLinear, extent, scaleOrdinal } from "d3";
import Dropdown from "react-dropdown";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { getLabel, attributes } from "../../util/util";
import { ColorLegend } from "../ColorLegend";

const xAxisLableOffset = 50;
const yAxisLableOffset = 82;

const Scatterplot = ({
  width,
  height,
  margin,
  data,
  circleRadius,
  tickOffset,
  tickSpacing,
  fadeOpacity,
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const initXAttr = "years_experience";
  const [xAttr, setXAttr] = useState(initXAttr);

  const initYAttr = "salary_media";
  const [yAttr, setYAttr] = useState(initYAttr);

  const [hoverValue, setHoverValue] = useState(null);

  // X Axis - years_experience
  const xValue = (d) => d[xAttr];
  const xAxisLable = getLabel(xAttr);
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  // Y Axis - salary_media
  const yValue = (d) => d[yAttr];

  const yAxisLable = getLabel(yAttr);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  // Color Legend - category
  const colorLegendLabel = "Categories";
  const colorAttr = "category";
  const colorValue = (d) => d[colorAttr];

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#03dac5", "#bb86fc", "#d8a011"]);

  const filterData = data.filter((d) => hoverValue === colorValue(d));

  return (
    <div className="graphic">
      <div className="chartDropdown">
        <span className="dropdown-label">X Axis</span>
        <Dropdown
          options={attributes}
          value={xAttr}
          onChange={({ value }) => setXAttr(value)}
        />
        <span className="dropdown-label">Y Axis</span>
        <Dropdown
          options={attributes}
          value={yAttr}
          onChange={({ value }) => setYAttr(value)}
        />
      </div>
      <svg width={width} height={height} className="chart">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={tickOffset}
          />
          <text
            className="axis-lable"
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + xAxisLableOffset}
          >
            {xAxisLable}
          </text>
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickOffset={tickOffset}
          />
          <text
            className="axis-lable"
            textAnchor="middle"
            transform={`translate(${-yAxisLableOffset}, ${
              innerHeight / 2
            }) rotate(90) `}
          >
            {yAxisLable}
          </text>
          <g opacity={hoverValue ? fadeOpacity : 0.6}>
            <Marks
              items={data}
              xValue={xValue}
              xScale={xScale}
              yValue={yValue}
              yScale={yScale}
              colorValue={colorValue}
              colorScale={colorScale}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            items={filterData}
            xValue={xValue}
            xScale={xScale}
            yValue={yValue}
            yScale={yScale}
            colorValue={colorValue}
            colorScale={colorScale}
            circleRadius={circleRadius}
          />
        </g>
        <g transform={`translate(${innerWidth + 150}, 60)`}>
          <text className="axis-lable" dy={-22} x={-8}>
            {colorLegendLabel}
          </text>
          <ColorLegend
            colorScale={colorScale}
            circleRadius={circleRadius}
            hoverValue={hoverValue}
            onHover={setHoverValue}
            tickSpacing={tickSpacing}
            tickOffset={tickOffset}
            fadeOpacity={fadeOpacity}
          />
        </g>
      </svg>
    </div>
  );
};

export default Scatterplot;
