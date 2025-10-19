// components/SubCategorySerachBox.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import search from "../../../../../public/assets/Image/search-normal.png";
import { InputAdornment, TextField } from "@mui/material";
import { setSearchTerm } from "@/app/storeApp/Slice/category/SearchInputBoxSice";
import { useAppSelector } from "@/app/hooks/hooks";

const SubCategorySerachBox: React.FC = () => {
  const dispatch = useDispatch(); // Use typed dispatch
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setSearchTerm(value)); // Dispatch the value to the Redux store
  };

  const serachvalues = useAppSelector(
    (state) => state.searchInputBox
  )

  console.log(" my serach box " ,serachvalues)

  return (
    <div className="w-full relative">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Listing Search"
        value={searchValue} // Controlled input value
        onChange={handleSearchChange} // Handle the input change
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className="bg-transparent w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center">
                <Image
                  src={search}
                  alt="Search Icon"
                  className="h-[1rem] w-[1rem] object-cover"
                />
              </div>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingLeft: "1rem",
            backgroundColor: "white",
            borderRadius: "8px",
            borderColor: "#B4B4B4",
            "&:focus-within": {
              borderColor: "#B5843F66",
              boxShadow: "0 0 0 1px #B5843F66",
            },
          },
          "& .MuiInputBase-input": {
            color: "#000000",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      />
    </div>
  );
};

export default SubCategorySerachBox;
