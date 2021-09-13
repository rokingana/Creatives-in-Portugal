import { useState, useEffect } from "react";
import { csv } from "d3";

const newCsv =
  "https://gist.githubusercontent.com/rokingana/5e2e17ebad29bc73d306adf99ce871db/raw/2021_remuneracao_criativos_PT";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      // lng lat extract
      d.coords = d.coordinates
        .split(" ")
        .map((d) => +d)
        .reverse();
      d.salary_media = +d.salary_media;
      d.years_experience = +d.years_experience;
      d.value_hour = +d.value_hour;
      d.ID = +d.ID;
      return d;
    };

    csv(newCsv, row).then(setData);
  }, []);
  return data;
};
