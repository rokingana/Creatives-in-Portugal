import { geoPath, geoMercator, sum } from "d3";
import { Marks } from "./Marks";

const width = 850;
const height = 850;

const BubbleMap = ({ geoData: { districts, interiors }, filteredData }) => {
  const projection = geoMercator().fitSize(
    [width - 50, height - 100],
    districts
  );
  const path = geoPath(projection);

  console.log(filteredData);

  return (
    <div className="graphic">
      <svg width={width} height={height}>
        <g className="district">
          {districts.features.map((feature, index) => (
            <path key={index} d={path(feature)} />
          ))}
          <path d={path(interiors)} className="interiors" />

          {filteredData.map((d) => {
            const [x, y] = projection(d.coordinates); // d = each district

            // extract total of responses per district
            const arrTotal = [];
            for (let j = 0; j < d.categories.length; j++) {
              arrTotal.push(d.categories[j][1]);
            }
            const totalResponses = sum(arrTotal);

            return (
              <g>
                {/* <text>{d.district}</text>
                <text>{totalResponses}</text> */}
                <Marks
                  ID={d.ID}
                  cx={x}
                  cy={y}
                  categories={d.categories}
                  totalResponses={totalResponses}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default BubbleMap;
