import CategoryDropdwonListing from "./CategoryDropdwonListing";
import SubCategoryListingDropdwon from "./SubCategoryListingDropdwon";
import ListingLocation from "./ListingLocation";

const LocationCategorySubCategoryDropdwon: React.FC = () => {
  return (
    <div className="w-full relative">
      <div className="w-full flex flex-col relative gap-5 h-fit  ">
        <ListingLocation />

        <CategoryDropdwonListing />

        <SubCategoryListingDropdwon />
      </div>
    </div>
  );
};

export default LocationCategorySubCategoryDropdwon;
