import React from "react";
import { useSelector } from "react-redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function HeaderDropMenu({ setOpenDropDown, setTaskModelOpen }) {
  const categories = useSelector((state) => state.categories);


  return (
    <div
      className="bg-[#030404] shadow-md shadow-[#364e7ela] w-full py-4 rounded-xl"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setState(false);
      }}
    >
      <div className="   shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="text-gray-600 font-semibold mx-4 mb-8 ">
          {" "}
          All Task {categories?.length}
        </h3>
        <div>
          {categories.map((ele, index) => {
            console.log(ele.isActive);
            return (
              <div
                className={`flex  space-x-2  px-5 py-5 ${
                  ele.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
                }`}
                key={index}
              >
                <AssignmentIcon className="text-white" />
                <p className="text-lg font- bold text-white">{ele.name}</p>
              </div>
            );
          })}
          <div className="flex  cursor-pointer justify-center space-x-4 md:ml-4 text-[#6357c7] py-4 px-5 mt-6 
           hover:bg-transparent hover:border shadow-md bg-slate-900 w-[50%] rounded-md  " 
           onClick={()=>{setTaskModelOpen(true) }}>
            <AddCircleOutlineIcon className="text-white" />
            <p className="text-2xl font-bold text-gray-500 -mt-2"> 
              Create New Task
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropMenu;
