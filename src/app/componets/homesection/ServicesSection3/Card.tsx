import { useAppSelector } from "@/app/hooks/hooks";
import { Categorydata } from "@/app/types/Restypes";
import { TailSpin } from "react-loader-spinner";

interface CardProps extends Categorydata {
  isLoading: boolean;
}

const Card: React.FC<CardProps> = ({
  category_image,
  category_name,
  subcategories_count,
  onClick,
  isLoading,
}) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className="  w-full h-[195px] 3xl:h-[220px] flex flex-col gap-1 overflow-x-hidden justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      {/* Card Image Section */}
      <div
        className={`w-full  h-[147px] 3xl:h-[175px] flex justify-center items-center rounded-lg 
             `}
      >
        {isLoading ? (
          <TailSpin
            color={isDarkMode ? "#fff" : "#226FE4"}
            height={40}
            width={40}
          />
        ) : (
          <div
            className="w-[100%] h-[100%] bg-cover  rounded-lg"
            style={{
              backgroundImage: `url(${category_image})`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
      </div>

      {/* Card Content Section */}
      <div className="w-full h-[40px]   flex justify-center items-center text-center px-1">
        <p className=" text-T7  font-poppins  dark:text-dark-darkcolor line-clamp-2">
          {category_name}
        </p>
      </div>

    </div>
  );
};

export default Card;
