import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json"


const initialState = {
    categories: data.categories,
  };



  const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers:{

    }
})


export default categoriesSlice