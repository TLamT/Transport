"use client";

import { useState } from "react";

export const ChoosingRoute = ({ Search, setChosenRoute, allLineData }) => {
  const [choosedLine, setChoosedLine] = useState(null);
  const [isOpen, setIsOpen] = useState({});

  const openDescription = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!Search) return null;

  const searchRoute = allLineData.filter(item =>
    item.route.includes(Search)
  );

  const handleOnClick = (route, index) => {
    setChosenRoute(route);
    setChoosedLine(index);
  };

  return (
    <div className="flex justify-center gap-2 mt-10 flex-col">
  {searchRoute.length === 0 ? (
    <div className="text-lg text-red-500 text-center">請輸入正確車站</div>
  ) : (
    <>
      <div
        onClick={() => openDescription("objective")}
        className="text-sm cursor-pointer flex justify-center hover:text-blue-500 transition-colors duration-300"
      >
        {isOpen.objective ? "{...}" : "收"}
      </div>
      {!isOpen.objective && searchRoute.map((item, index) => {
        const isSelected = choosedLine === index;
        return (
          <div
            key={index}
            className={`cursor-pointer p-4 rounded-lg transition-colors duration-300 
              transform hover:scale-105 
              ${isSelected ? 'bg-blue-500 text-white' : 'bg-white-200 hover:bg-gray-300'} 
              text-xl shadow-md`}
            onClick={() => { handleOnClick(item, index); }}
          >
            {`${item.route} - ${item.orig_tc} → ${item.dest_tc}`}
          </div>
        );
      })}
    </>
  )}
</div>
  );
};