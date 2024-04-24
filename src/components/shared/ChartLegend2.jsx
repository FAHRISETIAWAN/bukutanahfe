import React from "react";

const ChartLegend2 = ({ legends }) => {
  return (
    <div className="mt-4 text-sm text-gray-600">
      <h6 className="text-lg text-gray-900 font-semibold">Details</h6>
      {legends.map((legend) => (
        <div className="flex items-center mt-3" key={legend.title}>
          <span
            className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}
          ></span>
          <span>{legend.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend2;
