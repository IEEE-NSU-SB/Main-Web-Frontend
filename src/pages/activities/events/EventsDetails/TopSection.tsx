import RegisterDetails from "./RegisterDetails";
import BannerDetails from "./BannerDetails";

const TopSection = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[67%_33%]">
        <div>
          <BannerDetails />
        </div>
        <div>
          <RegisterDetails />
        </div>
      </div>
    </>
  );
};

export default TopSection;
