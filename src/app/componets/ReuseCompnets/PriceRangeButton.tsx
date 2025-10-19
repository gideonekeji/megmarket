'use client';

import React from 'react';

interface PriceRangeButtonProps {
    priceRange: string;
    isDarkMode?: boolean;
    onClick?: () => void;
}

const PriceRangeButton: React.FC<PriceRangeButtonProps> = ({
    priceRange,
}) => {
    return (

        <div
            className={`w-full border-2 border-light-button-base px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer `}
        >
            <button className="text-light-button-base font-medium font-poppins group-hover:text-white z-10 relative text-B2">
                {priceRange}
            </button>
            <div className="absolute top-0 left-0 w-full h-full  bg-light-button-base transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
};

export default PriceRangeButton;
