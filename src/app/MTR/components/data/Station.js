import React from 'react';
import line from './data';

const Station = ({ upline, downline }) => {
  const stationArr = Object.values(line).flatMap(lineItem => lineItem.sta);
  
  return (
    <div className='w-full h-full flex gap-4'>
      <div className='flex flex-col justify-center gap-4 border-2 bg-gray-200 rounded-lg shadow-lg w-1/2 p-4'>
        {upline &&
          upline.map((sta, index) => {
            // 根據奇偶性選擇顏色
            const color = index % 2 === 0 ? 'bg-purple-200' : 'bg-red-300'; // 偶數行藍色，奇數行綠色

            return (
              <div className={`text-center border-2 border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 ${color}`} key={index}>
                {sta.Info?.time && (
                  <>
                    <div className='text-xl font-semibold text-blue-600'>
                      {sta?.name} → {stationArr.find(item => item.code === sta?.Info?.dest)?.name || sta?.Info?.dest}
                    </div>
                    <div className='text-gray-700'>
                      下班列車到站時間: {sta?.Info?.time.split(" ")[1].substring(0, 5)}
                    </div>
                    <div className='text-gray-600'>月台: {sta?.Info?.plat || 'N/A'}</div>
                  </>
                )}
              </div>
            );
          })}
      </div>

      <div className='flex flex-col justify-center gap-4 border-2 bg-gray-200 rounded-lg shadow-lg w-1/2 p-4'>
        {downline &&
          downline.map((sta, index) => {
            // 根據奇偶性選擇顏色
            const color = index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'; // 偶數行藍色，奇數行綠色

            return (
              <div className={`text-center border-2 border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 ${color}`} key={index}>
                {sta?.Info?.time && (
                  <>
                    <div className='text-xl font-semibold text-blue-600'>
                      {sta?.name} → {stationArr.find(item => item.code === sta?.Info?.dest)?.name || sta?.Info?.dest}
                    </div>
                    <div className='text-gray-700'>
                      下班列車到站時間: {sta?.Info?.time.split(" ")[1].substring(0, 5)}
                    </div>
                    <div className='text-gray-600'>月台: {sta?.Info?.plat || 'N/A'}</div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Station;