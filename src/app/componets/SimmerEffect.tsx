import React from "react";

interface ShimmerEffectProps {
  viewType: "grid" | "list";
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ viewType }) => {
  if (viewType === "list") {
    return (
      <div className="w-full h-[10rem] flex items-center gap-4 p-4 rounded-lg animate-pulse bg-white shadow-sm">
        <div className="w-24 h-24 bg-gray-200 rounded" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="w-1/2 h-4 bg-gray-200 rounded" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
          <div className="w-1/4 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="w-full h-[27.4rem] lg:h-[30rem] rounded-lg border border-gray-200 shadow-sm p-4 animate-pulse bg-white">
      <div className="h-40 bg-gray-200 rounded-md mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-full" />
    </div>
  );
};

export default ShimmerEffect;
