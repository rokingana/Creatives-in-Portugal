import { scaleSqrt, max, scaleOrdinal } from "d3";

const maxRadius = 50;
const opacity = 0.6;

export const Marks = ({ ID, cx, cy, categories, totalResponses }) => {
  //console.log(categories);

  const sizeValue = (d) => d[1]; // d = each district[categories] ; valor por categoria

  const sizeScale = scaleSqrt()
    .domain([0, max(categories, sizeValue)])
    .range([0, maxRadius]);

  const colorValue = (d) => d[0]; //

  const colorScale = scaleOrdinal()
    .domain(categories.map(colorValue))
    .range(["#03dac5", "#bb86fc", "#d8a011"]);

  return categories.map((d, i) => (
    <circle
      key={i}
      r={sizeScale((sizeValue(d) * totalResponses) / 100)} // using total answers per district calculate perscentage
      cx={cx}
      cy={cy}
      fill={colorScale(colorValue(d))}
      opacity={opacity}
      className="mark"
    ></circle>
  ));
};
