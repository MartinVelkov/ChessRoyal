import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const pData1 = [1800, 1850, 2000, 1900, 2050, 1920, 2100];
const pData2 = [100, 250, 300, 130, 250, 190, 210];
const pData3 = [180, 150, 200, 190, 260, 320, 160];
const pData4 = [180, 150, 200, 190, 230, 120, 900];
const xLabels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function Stats() {
  return (
    <div>
         <LineChart
         width={600}
         height={300}
         series={[
        { data: pData1 }
        ]}
         xAxis={[{ scaleType: 'point', data: xLabels }]}
         yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
         rightAxis="rightAxisId"
         /> 


          <LineChart
         width={600}
         height={300}
         series={[
        { data: pData2 }
        ]}
         xAxis={[{ scaleType: 'point', data: xLabels }]}
         yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
         rightAxis="rightAxisId"
         />  


          <LineChart
         width={600}
         height={300}
         series={[
        { data: pData3 }
        ]}
         xAxis={[{ scaleType: 'point', data: xLabels }]}
         yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
         rightAxis="rightAxisId"
         />  


          <LineChart
         width={600}
         height={300}
         series={[
        { data: pData4 }
        ]}
         xAxis={[{ scaleType: 'point', data: xLabels }]}
         yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
         rightAxis="rightAxisId"
         />     
    </div>
   
  );
}