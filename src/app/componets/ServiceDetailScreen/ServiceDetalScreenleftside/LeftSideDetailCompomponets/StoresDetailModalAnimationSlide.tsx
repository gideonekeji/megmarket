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

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? store_images.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={store_images[current]}
          src={store_images[current]}
          alt="Store"
          className="w-full h-64 object-cover rounded-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 cursor-pointer transform -translate-x-1/2 flex space-x-2">
        {store_images.map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer ${
              index === current
                ? "bg-[#226FE4] h-2 w-10 rounded-3xl"
                : "rounded-full h-2 w-2 bg-[#D9D9D9] transition-all duration-300"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceDetailScreenFiltterModalDetailAnimationSlide;
