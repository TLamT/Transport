"use clinet"

import { useState, useEffect } from "react";
import { fetchBusStopData } from "../fetchFunction";

 const ShowingStopsAndTime=({choosedRoute})=> {
  const [busStopData, setBusStopData] = useState({})
  
  
  const handleRefresh = async () => {
    const data = await fetchBusStopData(
      choosedRoute.route,
      choosedRoute.bound === "I" ? "inbound" : "outbound",
      choosedRoute.service_type
    );
    setBusStopData(data); // 更新狀態以刷新數據
  };
  
  useEffect(()=>{
    const fetch = async ()=>{
      const data= await fetchBusStopData(
        choosedRoute.route,
        choosedRoute.bound==="I"? "inbound": "outbound",
        choosedRoute.service_type
      )
      setBusStopData(data)
    }
    fetch()
  },[choosedRoute.route])
  
  if(!choosedRoute.route) return null;

  return (
    <div className="flex flex-col gap-4 mt-4 text-2xl items-center">
  <div className="font-bold text-3xl">
    {`${choosedRoute.route} - ${choosedRoute.orig_tc} → ${choosedRoute.dest_tc}`}
  </div>
  <div className="w-full bg-white rounded-lg shadow-md p-4">
    {busStopData.map((item, index) => {
      return (
        <div className="border-b border-gray-300 py-3 last:border-0" key={index}>
          <div className="flex justify-between">
            <span>{`${index + 1}. ${item[0]?.name || "Unknown Stop"}`}</span>
            <span className="font-semibold">{!item[0]?.time ? "" : item[0].time}</span>
          </div>
          <div className="text-sm text-gray-600">{item[0]?.trips || ""}</div>

          {item[1] ? (
            <div className="flex justify-between mt-2">
              <span>{!item[1]?.time ? "" : item[1].time}</span>
              <span className="text-sm text-gray-600">{item[1]?.trips || ""}</span>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <span></span>
              <span className="text-sm text-gray-600"></span>
            </div>
          )}

          {item[2] ? (
            <div className="flex justify-between mt-2">
              <span>{!item[2]?.time ? "" : item[2].time}</span>
              <span className="text-sm text-gray-600">{item[2]?.trips || ""}</span>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <span></span>
              <span className="text-sm text-gray-600"></span>
            </div>
          )}
        </div>
      );
    })}
  </div>
  <button 
        onClick={handleRefresh} 
        className="opacity-40 hover:opacity-100 fixed bottom-5 left-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="Refresh data"
      >
        刷新
      </button>
</div>
  )
}

export default ShowingStopsAndTime