"use client";
import Link from "next/link";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Home() {
  const [now, setNow] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval); // 清理定時器
  }, []);

  const hour = moment().hour();
  let backgroundColor;
  if (hour >= 6 && hour < 12) {
    backgroundColor = 'bg-blue-100'; // 上午
  } else if (hour >= 12 && hour < 18) {
    backgroundColor = 'bg-yellow-200'; // 下午
  } else {
    backgroundColor = 'bg-gray-800 text-white'; // 晚上
  }

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${backgroundColor}`}>
      <div className="text-2xl text-dark mb-4 border-2 border-black rounded-lg p-4">{now}</div>
      <h1 className="text-4xl font-bold mb-6 text-black-800">歡迎來到交通應用</h1>
      <div className="flex gap-10 justify-center items-center w-full max-w-4xl">
        <Link
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          href="/MTR"
        >
          <img src="https://upload.wikimedia.org/wikipedia/en/b/b9/HK_MTR_logo.svg" alt="MTR" className="w-[10rem]"/>
        </Link>
        <Link
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          href="./KMB"
        >
          <img src="https://cdn.coupert.com/ccsimg/dcs/img_tools/dcs_img_6b623e19ba5f026e5a5da48c3191f7a5.webp" alt="KMB" className="w-[10rem] " />
        </Link>
      </div>
    </div>
  );
}