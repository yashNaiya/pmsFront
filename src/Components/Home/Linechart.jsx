import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    [{ label: 'Date', type: 'date' }, "Complete", "Working", "On Hold", "Error"],
    [{ v: new Date(2023, 5, 10) }, 9, 21, 5, 2],
    [{ v: new Date(2023, 5, 11) }, 9, 14, 4, 3],
    [{ v: new Date(2023, 5, 12) }, 10, 17, 7, 2],
    [{ v: new Date(2023, 5, 13) }, 12, 20, 9, 3],
    [{ v: new Date(2023, 5, 14) }, 15, 15, 9, 4],
];

export const options = {
  chart: {
    title: "Task States",
    subtitle: "Completed, Error, Working and On Hold Tasks",
  },
  colors: ['#B6E2A1', '#FEBE8C', '#D9D9D9', '#FD8A8A'],
};

export function Linechart() {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
