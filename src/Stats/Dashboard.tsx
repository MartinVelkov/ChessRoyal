import * as React from "react";
import "../Stats/dashboard.css";
import { LineChart, PieChart } from "@mui/x-charts";

// let Width = Number((window.screen.width / 3.49).toFixed(0));
// let Height = Number((window.screen.height / 3.49).toFixed(0));

let Height = 270
let Width = 530

const pData1 = [1300, 1250, 1000, 900, 1050, 920, 1100];
const pData2 = [1200, 950, 800, 930, 850, 990, 910];
const pData3 = [1180, 1050, 1200, 1190, 1260, 1320, 1160];
const pData4 = [1800, 1850, 2000, 1900, 2050, 1920, 2100];

let dataForPie0 = 0;
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
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
  "Събота",
  "Неделя",
];

export default function Stats() {
  return (
    <div>
      <div id="page">
        <div className="LineChart">
          <LineChart
            width={Width}
            height={Height}
            series={[{ data: pData1, label: "Булет", color: "#02B2AF" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          />

          <LineChart
            width={Width}
            height={Height}
            series={[{ data: pData2, label: "Блиц", color: "#2E96FF" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          />
        </div>

        <div className="LineChart">
          <LineChart
            width={Width}
            height={Height}
            series={[{ data: pData3, label: "Рапид", color: "#B800D8" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          />

          <LineChart
            width={Width}
            height={Height}
            series={[{ data: pData4, label: "Класически", color: "#60009B" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          />
        </div>

        <div className="Pie">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: dataForPie0, label: "Булет" },
                  { id: 1, value: dataForPie1, label: "Блиц" },
                  { id: 2, value: dataForPie2, label: "Рапид" },
                  { id: 3, value: dataForPie3, label: "Класически" },
                ],
              },
            ]}
            width={Width + 180}
            height={Width}
          />
        </div>
      </div>
    </div>
  );
}
