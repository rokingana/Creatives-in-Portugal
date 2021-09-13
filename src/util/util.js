import { nest } from "d3-collection";

// Get Attributes for Labels (on Scatterplott)
export const attributes = [
  { value: "years_experience", label: "Years of Experience (years)" },
  { value: "salary_media", label: "Month Salary (€)" },
  { value: "value_hour", label: "Value Hour (€)" },
];

export const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

// Nest data Category by District and counts enteries on each
export const getGroupedDistrict = (data) =>
  nest()
    .key((d) => d.location_dt + "|" + d.coordinates)
    .key((d) => d.category)
    .rollup((leaves) => leaves.length)
    .entries(data);

// Map nested data into a convient object format before passing to Bubblemap
export const bubleMapFiltered = (nestedData) => {
  return nestedData.map((item) => {
    const district = item["key"].split("|")[0];
    const coords = item["key"].split("|")[1];
    const categories = item["values"].map((cat) => [cat.key, cat.value]);
    return {
      district: district,
      coordinates: coords
        .split(" ")
        .map((d) => +d)
        .reverse(),
      categories: categories,
    };
  });
};

export const totalResponsesDistrict = (d) => {
  let total = 0;
  for (let i = 0; i < d.length; i++) {
    total = +d[i][1];
  }
  return total;
};
