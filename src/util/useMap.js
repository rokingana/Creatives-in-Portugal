import { useState, useEffect } from "react";
import { json } from "d3";
import { mesh, feature } from "topojson-client";

const jsonContinent =
  "https://gist.githubusercontent.com/rokingana/c55ab0bbbc92c1d16aba84242628dd0b/raw/portugal-districts.json";
/* const jsonMadeira =
  "https://gist.githubusercontent.com/rokingana/c55ab0bbbc92c1d16aba84242628dd0b/raw/portugal_districts_madeira_topo.json";
const jsonAzores =
  "https://gist.githubusercontent.com/rokingana/c55ab0bbbc92c1d16aba84242628dd0b/raw/portugal_districts_azores_topo.json"; */

export const useMap = () => {
  const [data, setData] = useState(null);

  //console.log(data);

  useEffect(() => {
    json(jsonContinent).then((topoJsonData) => {
      // converting TopoJson to Geojson using feature func
      // to do that we need to extract the data we need from objects
      //console.log(topoJsonData.objects);

      const { portugal_districts } = topoJsonData.objects;

      setData({
        districts: feature(topoJsonData, portugal_districts),
        interiors: mesh(topoJsonData, portugal_districts, (a, b) => a !== b),
      });
    });
  }, []);

  return data;
};
