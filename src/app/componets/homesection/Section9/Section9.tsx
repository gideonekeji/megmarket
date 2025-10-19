import React from "react";
import SameTypeCard from "./SameTypeCard";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
import Heading from "../../Heading/Heading";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Section9() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[8].status === 0) return null;

  return (
    <div className=" h-auto overflow-hidden w-[90%] mx-auto  2xl:w-[68%]">
      <div className="mx-auto flex flex-col py-[1.3rem] gap-y-[2.7rem] w-full">
        {/* Heading */}
        <div className="w-full">
          <Heading
            title={data?.subscriptions?.[0]?.title}
            highlightedTitle={data?.subscriptions?.[0]?.subtext}
          />
        </div>

        {/* Slider for all screen sizes */}
        <div className="w-full 2xl:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1} // default for mobile
            spaceBetween={20}
            className="w-full"
            breakpoints={{
              640: { slidesPerView: 1 },    // mobile
              768: { slidesPerView: 2 },    // tablets
              1024: { slidesPerView: 3 },   // laptops
            }}
          >
            <SwiperSlide><SameTypeCard /></SwiperSlide>
            <SwiperSlide><Card2 /></SwiperSlide>
            <SwiperSlide><Card3 /></SwiperSlide>
            <SwiperSlide><Card4 /></SwiperSlide>
          </Swiper>

        </div>

        <div className="hidden 2xl:grid  mt-7  grid-cols-4 gap-6 ">
          <SameTypeCard />
          <Card2 />
          <Card3 />
          <Card4 />
        </div>
      </div>
    </div>
  );
}

export default Section9;
