"use client";
import { useState, useEffect } from "react";
import LineBtn from "./components/LineBTN";
import line from "./components/data/data";
import Station from "./components/data/Station";
import RealTimeClock from "./components/data/RealTimeClock";
import Link from "next/link";

const api = "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php";

const App = () => {
  const lineArr = Object.keys(line);
  const [active, setActive] = useState(null);
  const [upline, setUpline] = useState([]);
  const [downline, setDownline] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (active) {
      fetchMTRData(active);
      const intervalId = setInterval(() => {
        fetchMTRData(active);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [active]);

  async function fetchMTRData(lineCode) {
    let stationArr = line[lineCode].sta;
    let upArr = [];
    let downArr = [];

    await Promise.all(
      stationArr.map(async (station) => {
        try {
          const url = `${api}?line=${lineCode}&sta=${station.code}`;
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
          }

          const result = await res.json();
          const stationInfo = result.data[`${lineCode}-${station.code}`];

          if (stationInfo.UP) {
            upArr.push({
              name: station.name,
              Info: stationInfo.UP[0],
            });
          }
          if (stationInfo.DOWN) {
            downArr.push({
              name: station.name,
              Info: stationInfo.DOWN[0],
            });
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      })
    );

    setUpline(upArr);
    setDownline(downArr);
    setLastUpdated(new Date().toLocaleTimeString());
  }

  function handleOnClick(lineCode) {
    setActive(lineCode);
  }

  return (
    <div>
      <div className="flex justify-center gap-2 text-xl space-x-20 text-blue-600">
        <Link className="hover:underline hover:text-red-600" href="/">首頁</Link>
        <Link className="mb-4 hover:underline hover:text-red-600" href="./KMB">KMB</Link>
      </div>
      <section className="flex justify-center gap-2 flex-wrap">
        {lineArr.map((lineCode) => (
          <LineBtn 
            key={lineCode}
            text={line[lineCode].text}
            bgColor={line[lineCode].color}
            onLineBTNClick={() => handleOnClick(lineCode)}
            active={active === lineCode}
          />
        ))}
      </section>
      <RealTimeClock />
      {lastUpdated && (
        <div className="text-center mt-4">
          <div>最後更新時間: {lastUpdated}</div>
        </div>
      )}
      <Station upline={upline} downline={downline} />
    </div>
  );
};

export default App;