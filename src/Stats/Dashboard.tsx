import * as React from "react";
import "../Stats/dashboard.css";
import { LineChart, PieChart } from "@mui/x-charts";

const pData1 = [1800, 1850, 2000, 1900, 2050, 1920, 2100];
const pData2 = [100, 250, 300, 130, 250, 190, 210];
const pData3 = [180, 150, 200, 190, 260, 320, 160];
const pData4 = [180, 150, 200, 190, 230, 120, 900];

let dataForPie0 =  0;
let dataForPie1 = 0;
let dataForPie2 = 0;
let dataForPie3 = 0;



  for (let i = 0; i < 7; i++) {
    dataForPie0 += Number((pData1[i] / 7).toFixed(1));
    dataForPie1 += Number((pData2[i] / 7).toFixed(1));
    dataForPie2 += Number((pData3[i] / 7).toFixed(1));
    dataForPie3 += Number((pData4[i] / 7).toFixed(1));
  }
const xLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Stats() {
  return (
    <div id="page">
      <div className="LineChart">
        <LineChart
        width={550}
        height={300}
        series={[{ data: pData1 }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
        rightAxis="rightAxisId"
      />

      <LineChart
        width={550}
        height={300}
        series={[{ data: pData2 }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
      />          
      </div>
     <div className="LineChart">
      <LineChart
        width={550}
        height={300}
        series={[{ data: pData3 }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
      />

      <LineChart
        width={550}
        height={300}
        series={[{ data: pData4 }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
      />
    </div>

    <div>
    <PieChart
  series={[
    {
      data: [
        { id: 0, value: dataForPie0, label: 'Bullet' },
        { id: 1, value: dataForPie1, label: 'Blitz' },
        { id: 2, value: dataForPie2, label: 'Rapid' },
        { id: 3, value: dataForPie3, label: 'Classic' }
      ],
    },
  ]}
  width={600}
  height={500}
/>
    </div>
     </div>

      
  );
}
