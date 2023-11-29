import {configureStore} from "@reduxjs/toolkit"
import categoriesSlice from "./categoriesSlice"


// creating store 
const store  =  configureStore({
    reducer: {
        category : categoriesSlice
        // 
    }
})


export default store