import React from "react";
import { ChevronLeft } from "lucide-react";

type BackArrowBtnPropsT = {
  handleBack: () => void;
};

const BackArrowBtn: React.FC<BackArrowBtnPropsT> = ({ handleBack }) => {
  return (
    <div
      className="h-10 w-10 rounded-full bg-gray-100 absolute top-4 left-4 flex justify-center items-center cursor-pointer hover:bg-slate-200 text-black hover:text-theme"
      onClick={handleBack}
    >
      <ChevronLeft strokeWidth={3} className="mr-0.5" />
    </div>
  );
};

export default BackArrowBtn;
