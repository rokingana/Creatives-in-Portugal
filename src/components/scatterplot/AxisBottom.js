export const AxisBottom = ({ xScale, innerHeight, tickOffset }) =>
  xScale.ticks().map((tickValue, i) => (
    <g
      key={i}
      transform={`translate(${xScale(tickValue)}, 0)`}
      className="tick"
    >
      <line y2={innerHeight} />
      <text
        style={{ textAnchor: "middle" }}
        y={innerHeight + tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
