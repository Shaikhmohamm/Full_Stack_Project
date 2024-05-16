import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the search slice
const initialstate = {
    searchinput: [],
}

// Define a Redux slice named 'search' with initial state and a reducer function
const search = createSlice({
    name: 'search',
    initialState: initialstate,
    reducers: {
        // Reducer function to set search input data in state
        setsearchinput: (state, action) => {
            state.searchinput = action.payload
        },
    }
})

// Export the action creator generated by the search slice
export const { setsearchinput } = search.actions

// Export the reducer function generated by the search slice
export default search.reducer
