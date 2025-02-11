import React, { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString()); // 獲取當前時間
    };

    updateTime(); // 初始化時間
    const intervalId = setInterval(updateTime, 1000); // 每秒更新時間

    return () => clearInterval(intervalId); // 組件卸載時清除計時器
  }, []);

  return (
    <div className='flex flex-col items-center justify-center bg-gray-50'>
  <div className='bg-white shadow-md rounded-lg p-6'>
    <div className='text-2xl font-bold text-gray-800 mb-2'>當前時間:</div>
    <div className='text-xl text-blue-600'>{time}</div>
  </div>
</div>
  );
};

export default RealTimeClock;