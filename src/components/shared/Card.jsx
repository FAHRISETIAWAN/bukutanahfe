import React from "react";

const Card = ({ children }) => {
  return (
    <div>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs ">
        {children}
      </div>
    </div>
  );
};

export default Card;
