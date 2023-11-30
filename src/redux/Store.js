import {configureStore} from "@reduxjs/toolkit"
import categoriesSlice from "./categoriesSlice"




// creating store 
const store  =  configureStore({
    reducer: {
        categories : categoriesSlice.reducer
        // 
    }
})


export default store