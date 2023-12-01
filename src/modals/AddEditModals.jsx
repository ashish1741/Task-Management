import React, { useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useDispatch } from "react-redux";
import categoriesSlice from "../redux/categoriesSlice";

function AddEditModals({ setTaskModelOpen, type }) {
  const dispatch = useDispatch();

  // generating random id
  const generateId = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [name, setName] = useState("");
  const [isValid, setisValid] = useState(true);
  const [newColumns, setnewColumns] = useState([
    { name: "Todo", task: [], id: generateId() },
    { name: "Doing", task: [], id: generateId() },
    { name: "Done", task: [], id: generateId() },
    
  ]);

  //
  const onChange = (id, newValue) => {
    setnewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  // deleting the items
  const onDelete = (id) => {
    setnewColumns((prevState) => {
      return prevState.filter((ele) => ele.id !== id);
    });
  };

  // adding new columns logic

  const handleAddColumn = () => {
    setnewColumns((state) => [
      ...state,
      { name: "", task: [], id: generateId() },
    ]);
  };

  //validated
  const validated = () => {
    setisValid(false);
    if (!name.trim()) {
      return false;
    }


    for (let index = 0; index < newColumns.length; index++) {
      if (!newColumns[index].name.trim()) {
        return false;
      }
    }

    setisValid(true);
    return true;
  };

  // submiting the data to state
  const onSubmit = (type) => {
    setTaskModelOpen(false);
    if (type === "add") {
      //dispatching
      dispatch(categoriesSlice.actions.addTask({name,newColumns}));
    } else {
      dispatch(categoriesSlice.actions.editTask({name,newColumns}));
    }
  };

  return (
    <div
      className="fixed scrollbar-hide  right-0 left-0
     top-0 bottom-0 px-2 py-4 overflow-scroll 
     z-50 justify-center items-center flex 
     bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        {
          setTaskModelOpen(true);
        }
      }}
    >
      {/* model section  */}

      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-gray-900 text-white font-bold shadow-md shadow-[#364e7e] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"}
          Task
        </h3>
        {/* Task Name  */}

        <div className="mt-8 flex fex-col justify-around space-y-3">
          <label className=" text-sm text-gray-500">Task Name</label>
          <input
            type="text"
            className="bg-transparent px-4
            py-2 rounded-md text-sm border 
             border-gray-600 focus:outline-[#635fc7]
              outline-1 ring-0"
            placeholder="e.g web design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="task-name-input"
          />
        </div>
        {/* {Task Columns} */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm text-gray-500">Task Columns</label>
          {newColumns.map((ele, index) => (
            <div className="flex items-center space-x-3 w-full">
              <input
                type="text"
                className="bg-transparent flex-grow px-4 py-2
                   rounded-md text-sm border mt-2  outline-none focus:outline-[#735fc7]"
                value={ele.name}
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
          ))}
        </div>
        <button
          className="w-full items-center hover:opacity-75
       text-black bg-white mt-2 py-2 rounded-full "
          onClick={handleAddColumn}
        >
          + Add New Column
        </button>
        <button
          className="w-full items-center hover:opacity-75
       text-white  bg-blue-950 mt-2 py-2 rounded-full "
          onClick={() => {
            const isValid = validated();
            if (isValid === true) {
              onSubmit(type);
            }
          }}
        >
          {type === "add" ? "Create New Task" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default AddEditModals;
