import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useDispatch, useSelector } from "react-redux";
import categoriesSlice from "../redux/categoriesSlice";


function AddEditActivityModal({
  type,
  setOpenAddEditActivity,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) =>
    state.categories.find((category) => category.isActive)
  );
  const columns = activeCategory.columns;
  const col = columns.find((col, index) => index === prevColIndex);

  const [title, settitle] = useState("");
  const [isValid, setisValid] = useState(true);
  const [description, setDescription] = useState("");
  const [status, setStaus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState();

  const [subtasks, setsubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  // adding sub task
  const handleAddSubTask = () => {
    setsubtasks((state) => [...state, { name: "", task: [], id: uuidv4() }]);
  };

  //onchange status

  const onChangeStatus = (e) => {
    setStaus(e.target.value);
    setNewColIndex(e.target.selectIndex);
  };



  // submiting the data to state
  const onSubmit = (type) => {
    if (type === "add") {
      //dispatching
      dispatch(
        categoriesSlice.actions.addactivity({
           title,
           description,
            subtasks,
            status,
            newColIndex
           })
      )} else {
      dispatch(categoriesSlice.actions.editactivity({ 
        title,
        description,
         subtasks,
         status,
         taskIndex,
         prevColIndex,
         newColIndex
       }));
    }
  };

  // deleting the items
  const onDelete = (id) => {
    setsubtasks((prevState) => {
      return prevState.filter((ele) => ele.id !== id);
    });
  };

  const onChange = (id, newValue) => {
    setsubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((e) => e.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  // validating text
  const validated = () => {
    setisValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let index = 0; index < subtasks.length; index++) {
      if (!subtasks[index].title.trim()) {
        return false;
      }
    }

    setisValid(true);
    return true;
  };

  return (
    <div
      className="py-6 px-6 pb-40 absolute
     overflow-y-scroll left-0 right-0 bottom-0
      top-0 bg-[#000000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        setOpenAddEditActivity(false);
      }}
    >
      {/* model section  */}
      <div
        className="scrollbar-hide overflow-y-scroll
       max-h-[95h] my-auto bg-gray-900 text-white
        font-bold shadow-md shdaow-[#364e7ela] max-w-md mx-auto w-full px-8 py-8 rounded-xl "
      >
        <h3 className="text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Activity
        </h3>
        {/* {Task Name } */}

        <div className="mt-8 flex flex-col space-y-1">
          <label>Activity Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="bg-transparent flex-grow px-4 py-2
            rounded-md text-sm border mt-2  outline-none focus:outline-[#735fc7]"
            placeholder="e.g  components Design"
          />
        </div>
        {/* description  */}
        <div className="mt-8 flex flex-col space-y-1">
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent flex-grow px-4
            rounded-md text-sm border  min-h-[200px] outline-none focus:outline-[#735fc7]"
            placeholder="e.g  login/register component full functionality with JSON data formated developemt .... "
          />
        </div>
        {/* subtasks section  */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm text-gray-500 ">Sub Activity</label>

          {subtasks.map((ele, index) => {
            return (
              <div className="flex items-center w-full " key={index}>
                <input
                  type="text"
                  value={ele.title}
                  className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border mb-1  outline-none  focus:outline-[#735fc7]"
                  placeholder="e.g Make A data base schema"
                  onChange={(e) => {
                    onChange(ele.id, e.target.value);
                  }}
                />
                <CloseSharpIcon
                  className="cursor-pointer m-4"
                  onClick={() => {
                    onDelete(ele.id);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          className="w-full items-center hover:opacity-75
       text-black bg-white mt-2 py-2 rounded-full "
          onClick={handleAddSubTask}
        >
          + Add New Activity
        </button>
        <div className="mt-8 flex flex-col spay-3 ">
          <label className="text-sm text-gray-400 ">Current Status</label>
          <select
            className="select-status flex flex-grow px-4
           py-2 rounded-md text-sm bg-transparent 
          focus:border-0 border border-gray-300
           focus:outline-[#835fc7] outline-none"
            value={status}
            onChange={(e) => onChangeStatus(e)}
          >
            {columns.map((ele, index) => (
              <option
                value={ele.name}
                key={index}
                className="bg-teal-950 text-white"
              >
                {ele.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full items-center hover:opacity-75
       text-white  bg-blue-950 mt-3 py-2 rounded-full "
          onClick={() => {
            const isValid = validated();
            if (isValid === true) {
              onSubmit(type);
              console.log("created");
             setOpenAddEditActivity(false)

            }
          }}
        >
          {type === "add" ? "Create New Activity" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default AddEditActivityModal;
