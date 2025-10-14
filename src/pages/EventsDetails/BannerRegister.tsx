import RegisterDetails from "./RegisterDetails";
import BannerDetails from "./BannerDetails";

const BannerRegister = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[67%_33%] ">
      <div>
        <BannerDetails />
      </div>
      <div className="bg-white">
        <RegisterDetails />
      </div>
    </div>
  );
};

export default BannerRegister;
