import React from "react";
import RingLoader from "react-spinners/RingLoader";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <RingLoader color="#961ab8" size={100} />
    </div>
  );
};

export default Spinner;
