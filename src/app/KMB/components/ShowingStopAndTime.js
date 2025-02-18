"use client";

import { useState, useEffect } from "react";
import { fetchBusStopData } from "../fetchFunction";

const ShowingStopsAndTime = ({ choosedRoute }) => {
  const [busStopData, setBusStopData] = useState([]);

  const handleRefresh = async () => {
    const data = await fetchBusStopData(
      choosedRoute.route,
      choosedRoute.bound === "I" ? "inbound" : "outbound",
      choosedRoute.service_type
    );
    setBusStopData(data);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchBusStopData(
        choosedRoute.route,
        choosedRoute.bound === "I" ? "inbound" : "outbound",
        choosedRoute.service_type
      );
      setBusStopData(data);
    };
    fetch();
  }, [choosedRoute.route]);

  if (!choosedRoute.route) return null;

  return (
    <div className="flex flex-col gap-4 mt-4 text-2xl items-center">
      <div className="font-bold text-3xl text-gray-800 shadow-md p-4 rounded-lg bg-gray-100 animate__animated animate__fadeIn">
        {`${choosedRoute.route} - ${choosedRoute.orig_tc} → ${choosedRoute.dest_tc}`}
      </div>
      <div className="w-full bg-white rounded-lg shadow-lg p-6">
        {busStopData.map((item, index) => (
          <div className="border-b border-gray-300 py-4 last:border-0 transition-transform duration-300 hover:scale-105" key={index}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">{`${index + 1}. ${item[0]?.name || "Unknown Stop"}`}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold text-blue-600">{item[0]?.time || "N/A"}</span>
              <span className="text-sm text-gray-500">{item[0]?.trips || ""}</span>
            </div>

            {item[1] && (
              <div className="flex justify-between mt-2">
                <span className="text-blue-600">{item[1]?.time || "N/A"}</span>
                <span className="text-sm text-gray-500">{item[1]?.trips || ""}</span>
              </div>
            )}

            {item[2] && (
              <div className="flex justify-between mt-2">
                <span className="text-blue-600">{item[2]?.time || "N/A"}</span>
                <span className="text-sm text-gray-500">{item[2]?.trips || ""}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button 
        onClick={handleRefresh} 
        className="opacity-90 hover:opacity-100 fixed bottom-5 left-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 animate__animated animate__pulse"
        aria-label="Refresh data"
      >
        刷新
      </button>
    </div>
  );
}

export default ShowingStopsAndTime;