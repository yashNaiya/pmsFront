import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    [{ label: 'Date', type: 'date' }, "Complete", "Working", "On Hold", "Error"],
    [{ v: new Date(2023, 2, 28) }, 10, 12, 5, 2],
    [{ v: new Date(2023, 2, 29) }, 12, 15, 5, 3],
    [{ v: new Date(2023, 2, 30) }, 12, 15, 5, 3],
    [{ v: new Date(2023, 2, 31) }, 12, 15, 5, 3],
    [{ v: new Date(2023, 3, 1) }, 12, 15, 5, 3],
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
