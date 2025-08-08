import { useEffect } from "react";

const Ieee = () => {

  useEffect(() => {
    document.title = "About - IEEE";
  }, []);

  return (
    <div className="p-10">
      <p>
        Ador jotne page the banabi
      </p>
    </div>
  );
};

export default Ieee;
