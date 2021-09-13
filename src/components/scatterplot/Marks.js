export const Marks = ({
  items,
  xValue,
  xScale,
  yValue,
  yScale,
  colorValue,
  colorScale,
  circleRadius,
}) =>
  items.map((d, i) => (
    <circle
      key={i}
      r={circleRadius}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={!yValue(d) || !xValue(d) ? "#E5E2E0" : colorScale(colorValue(d))}
      className="mark"
    ></circle>
  ));
