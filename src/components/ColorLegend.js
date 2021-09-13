export const ColorLegend = ({
  circleRadius,
  colorScale,
  hoverValue,
  onHover,
  tickSpacing,
  tickOffset,
  fadeOpacity,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      className="tick"
      key={i}
      transform={`translate(0, ${i * tickSpacing})`}
      onMouseEnter={() => onHover(domainValue)}
      onMouseOut={() => onHover(null)}
      opacity={hoverValue && domainValue !== hoverValue ? fadeOpacity : 1}
    >
      <circle r={circleRadius} fill={colorScale(domainValue)} />
      <text x={tickOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
