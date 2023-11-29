import React from "react";
import {useSelector} from "react-redux"

function HeaderDropMenu({ setState }) {
    const  categories  = useSelector((state) => state.categories)
    console.log(categories);
  return (
    <div
      className="bg-[#2b2c37] shadow-md shadow-[#364e7ela] w-full py-4 rounded-xl"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
          
        }
        {setState(false);}
      }}
    >
      <h3 className="text-gray-600 font-semibold mx-4 mb-8">All Task</h3>
    </div>
  );
}

export default HeaderDropMenu;
