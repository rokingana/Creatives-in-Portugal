import "./App.css";
import { useData } from "./util/useData";
import { useMap } from "./util/useMap";
import { getGroupedDistrict, bubleMapFiltered } from "./util/util";
import Scatterplot from "./components/scatterplot/Scatterplot";
import BubbleMap from "./components/bubblemap/Bubblemap";

// Global
const width = 850;
const height = 400;
const margin = { top: 22, right: 200, bottom: 22 + 50, left: 110 };

const circleRadius = 5;
const tickOffset = 12;
const tickSpacing = 22;
const fadeOpacity = 0.5;

const App = () => {
  const data = useData();
  const geoData = useMap();

  if (!data || !geoData) {
    return <pre>Loading ...</pre>;
  }
  //console.log(data);

  // nest categories by district
  const filteredCategoryByDistrict = getGroupedDistrict(data);
  const bubbleMapData = bubleMapFiltered(filteredCategoryByDistrict);
  //console.log(bubbleMapData);

  return (
    <>
      <div className="chartHeader">
        <h1>Creative Work in Portugal</h1>
      </div>
      <BubbleMap
        width={width}
        height={height}
        geoData={geoData}
        margin={margin}
        data={data}
        filteredData={bubbleMapData}
      />
      <Scatterplot
        data={data}
        width={width}
        height={height}
        margin={margin}
        circleRadius={circleRadius}
        tickOffset={tickOffset}
        tickSpacing={tickSpacing}
        fadeOpacity={fadeOpacity}
      />

      <div className="chartFooter">
        <p>
          This inquery was conducted by{" "}
          <a href="https://www.luscofia.com/" target="_blank" rel="noreferrer">
            Sofia Rocha e Silva
          </a>{" "}
          from 26 November 2020 to 26 January 2021.{" "}
        </p>
        <p>691 out of 729 responses were used in this graphics</p>
      </div>
    </>
  );
};

export default App;
