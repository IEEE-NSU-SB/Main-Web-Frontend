import RegisterDetails from "./RegisterDetails";
import BannerDetails from "./BannerDetails";

const TopSection = () => {
  return (
    <div className="grid grid-cols-1">
      <div>
        <BannerDetails />
      </div>
      <div className="bg-white md:block hidden">
        <RegisterDetails />
      </div>
    </div>
  );
};

export default TopSection;
