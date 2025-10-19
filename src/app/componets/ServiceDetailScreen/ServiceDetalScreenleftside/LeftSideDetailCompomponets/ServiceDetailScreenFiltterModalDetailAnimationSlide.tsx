import { useAppSelector } from "@/app/hooks/hooks";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

function ServiceDetailScreenFiltterModalDetailAnimationSlide() {
  const cardData = useAppSelector((state) => state.cards.cards);
  const store_images = cardData[0]?.store_images || [];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === store_images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [current, store_images.length]);

  return (
    <div className="w-full flex gap-4 overflow-hidden">
      {/* Left: All images as thumbnails */}
      <div className="w-[20%] h-64 overflow-y-auto flex flex-col gap-2 pr-2">
        {store_images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-full  h-[8rem]  object-cover cursor-pointer rounded-md border-2 
              ${current === index ? "border-light-button-base" : "border-transparent"}
              transition-all duration-300`}
          />
        ))}
      </div>

      {/* Right: Main slider */}
      <div className="w-[80%] relative">
        <AnimatePresence mode="popLayout">
          {store_images.length > 0 && (
            <motion.img
              key={store_images[current]}
              src={store_images[current]}
              alt="Main"
              className="w-full h-64 object-contain rounded-lg"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Dot Navigation */}
        {store_images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {store_images.map((_, index) => (
              <span
                key={index}
                onClick={() => handleDotClick(index)}
                className={`cursor-pointer ${
                  index === current
                    ? "bg-light-button-base h-2 w-10 rounded-3xl"
                    : "bg-[#D9D9D9] h-2 w-2 rounded-full"
                } transition-all duration-300`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailScreenFiltterModalDetailAnimationSlide;
