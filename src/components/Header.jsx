import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HeaderDropMenu from "./HeaderDropMenu";
import AddEditModals from "../modals/addEditModals";
import { useDispatch, useSelector } from "react-redux";
import AddEditActivity from "../modals/AddEditActivityModal";
import AddEditActivityModal from "../modals/AddEditActivityModal";

function Header({setTaskModelOpen, taskModelOpen}) {
  const dispatch = useDispatch()
  const [openAddEditActivity, setOpenAddEditActivity] = useState(false)
  const [state, setState] = useState(false);
  const [type, setType] = useState("add")

  const tasks = useSelector((state) => state.categories);
  const task =  tasks.find(task => task.isActive)


  return (
    <div className="w-full p-2   bg-slate-900 shadow-lg border-blue-300 ">
      <div className="flex my-2 mx-3 justify-between space-x-2 md:space-x-4">
        <div className="p-2 mx-2 flex justify-between ">
          <span className="text-xl font-[800] text-gray-200 font-serif md:text-4xl ">
            MeroKam
          </span>
          <div>
            <span className="text-xl font-[800] text-white mx-10 font-mono truncate md:ml-20 md:text-2xl ">
              {task.name}


             {/* {task.name} */}
            </span>
            {state ? (
              <ArrowDropUpIcon
                className="w-3 ml-2 cursor-pointer  md:hidden text-white "
                onClick={() => setState(!state)}
              />
            ) : (
              <ArrowDropDownIcon
                className="w-3 ml-2 cursor-pointer  md:hidden text-white "
                onClick={() => setState(true)}

              />
            )}
          </div>
        </div>
        <div className="mx-3 flex justify-evenly space-x-4 items-center md:space-x-6">
            <button className="button hidden md:block">+ Add New Task</button>
            <button className="button  py-1 px-3 md:hidden" onClick={() => { setOpenAddEditActivity((state)=> !state)}}>+</button>
          <MoreVertIcon className="text-white my-3 mx-3 text-2xl cursor-pointer" />
        </div>
      </div>

      
      {/* // ArrowDropDown menu for small screen */}

      {

        state && <HeaderDropMenu  setTaskModelOpen = {setTaskModelOpen} setState = {setState} />

      }
      {
        taskModelOpen &&  <AddEditModals type={type} setTaskModelOpen = {setTaskModelOpen} />
      }
      {
        openAddEditActivity && <AddEditActivityModal type="add" setOpenAddEditActivity={setOpenAddEditActivity} />
      }
    </div>
  );
}

export default Header;
