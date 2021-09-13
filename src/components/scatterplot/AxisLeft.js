export const AxisLeft = ({ yScale, innerWidth, tickOffset }) =>
  yScale.ticks().map((tickValue, i) => (
    <g
      key={i}
      transform={`translate(0, ${yScale(tickValue)})`}
      className="tick leftAxis"
    >
      <line x2={innerWidth} />
      <text style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
        {tickValue}
      </text>
    </g>
  ));
