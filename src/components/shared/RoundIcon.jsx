import classNames from "classnames";
import React from "react";

const RoundIcon = ({
  icon: Icon,
  iconColorClass = "text-purple-600",
  bgColorClass = "bg-purple-100",
  className,
}) => {
  const baseStyle = "p-3 rounded-md";

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return (
    <div className={cls}>
      <Icon className="w-8 h-8" />
    </div>
  );
};

export default RoundIcon;
