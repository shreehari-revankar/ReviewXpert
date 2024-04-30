import { useNavigate } from "react-router-dom";
import rightArrowSvg from "/svg/arrow-right.svg";

export default function CompleteProfile() {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-5">
        <div className="mx-auto py-5 w-1/2 text-center bg-white rounded shadow-sm">
          <h1 className="py-5 text-lg">
            Complete your profile to proceed futher
          </h1>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-[#fd7603] hover:bg-[#fd7803e8] text-white align-center rounded-md cursor-pointer"
          >
            <span>Profile</span>{" "}
            <img
              className="inline-block"
              src={rightArrowSvg}
              alt="arrow-right"
            />
          </button>
        </div>
      </div>
    </>
  );
}
