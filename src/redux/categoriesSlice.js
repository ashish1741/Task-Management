import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json"


  const categoriesSlice = createSlice({
    name: "categories",
    initialState: data.categories,
    reducers:{
    addTask: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const task = {
        name: payload.name,
        isActive,
        columns: [],
      };
      task.columns = payload.newColumns;
      state.push(task);
    },
    editTask: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      task.name = payload.name;
      task.columns = payload.newColumns;
    },
    deleteTask: (state) => {
      const task = state.find((task) => task.isActive);
      state.splice(state.indexOf(task), 1);
    },
    settaskActive: (state, action) => {
      state.map((task, index) => {
        index === action.payload.index
          ? (task.isActive = true)
          : (task.isActive = false);
        return task;
      });
    },
    addactivity: (state, action) => {
      const { title, description, subtasks, status, newColIndex } = action.payload;

      const activity = { title, description, subtasks, status };

      const activeCategory = state.find((category) => category.isActive);

      if (activeCategory) {
        const column = activeCategory.columns.find((col, index) => index === newColIndex);

        if (column) {
          if (!column.tasks) {
            column.tasks = [];
          }
          column.tasks.push(activity);
        } else {
          console.error(`Column at index ${newColIndex} not found.`);
        }
      } else {
        console.error("Active category not found.");
      }
    },
    editactivity: (state, action) => {
      const {
        title,
        status,
        description,
        subactivitys,
        prevColIndex,
        newColIndex,
        activityIndex,
      } = action.payload;
      const task = state.find((task) => task.isActive);
      const column = task.columns.find((col, index) => index === prevColIndex);
      const activity = column.activitys.find((activity, index) => index === activityIndex);
      activity.title = title;
      activity.status = status;
      activity.description = description;
      activity.subactivitys = subactivitys;
      if (prevColIndex === newColIndex) return;
      column.activitys = column.activitys.filter((activity, index) => index !== activityIndex);
      const newCol = task.columns.find((col, index) => index === newColIndex);
      newCol.activitys.push(activity);
    },
    dragactivity: (state, action) => {
      const { colIndex, prevColIndex, activityIndex } = action.payload;
      const task = state.find((task) => task.isActive);
      const prevCol = task.columns.find((col, i) => i === prevColIndex);
      const activity = prevCol.activitys.splice(activityIndex, 1)[0];
      task.columns.find((col, i) => i === colIndex).activitys.push(activity);
    },
    setSubactivityCompleted: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      const col = task.columns.find((col, i) => i === payload.colIndex);
      const activity = col.activitys.find((activity, i) => i === payload.activityIndex);
      const subactivity = activity.subactivitys.find((subactivity, i) => i === payload.index);
      subactivity.isCompleted = !subactivity.isCompleted;
    },
    setactivityStatus: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      const columns = task.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const activity = col.activitys.find((activity, i) => i === payload.activityIndex);
      activity.status = payload.status;
      col.activitys = col.activitys.filter((activity, i) => i !== payload.activityIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.activitys.push(activity);
    },
    deleteactivity: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      const col = task.columns.find((col, i) => i === payload.colIndex);
      col.activitys = col.activitys.filter((activity, i) => i !== payload.activityIndex);
    },
  },

    

})


export default categoriesSlice