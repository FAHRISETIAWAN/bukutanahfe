import React from "react";

const ChartCard = ({ title, title2, children }) => {
  return (
    <div>
      <p className="mb-4 font-medium text-gray-500">{title}</p>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs ">
      <p className="mb-4 font-medium text-gray-500">{title2}</p>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
