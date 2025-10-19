"use client";
import { useRouter } from "next/navigation";
import NewCardDesingHome from "./NewCardDesingHome";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import Cardbtn from "./Cardbtn";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";

function Services() {
  const router = useRouter();
  const { data, isLoading, refetch } = useHomeScreenApi();
  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[1].status == 0) {
    return null;
  }





  return (
    <div className="w-full flex  ">
      <div className="w-[90%] 2xl:w-[68%] mx-auto h-auto overflow-hidden">
        <div className="w-full grid grid-cols-2   md:grid-cols-4 xl:flex   md:justify-center items-center gap-6">
          {data?.categories.slice(0, 7).map((category, index) => (
            <NewCardDesingHome
              key={index}
              category_image={category.category_image}
              title={category.category_name}
              total={category.subcategory_count}
              subCategoryId={category.category_id}
            />
          ))}
          {data?.categories.length > 7 && <Cardbtn />}
        </div>
      </div>
    </div>


  );
}

export default Services;
