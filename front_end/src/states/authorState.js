import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allAuthors: [],
    isAuthorsLoading: false,
    error: "api call has been rejected",
    currentPage: 1,
};

const getAllAuthorsFunc = createAsyncThunk(
    "allAuthors/getAllAuthors",
    async (input) => {
        
        try {
            const apiUrl = `${process.env.REACT_APP_SERVERBASE_URL}/authors`;
            const response = await fetch(!input?apiUrl:apiUrl+`?page=${input.toString()}`);
            const data = await response.json();
            return data.author
        } catch (error) {
            console.log(error);
        }
    }
);

const authorSlice = createSlice({
    name: "authorSlice",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            console.log("funziono");
        },
        setCurrentPage:(state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAuthorsFunc.fulfilled, (state, action)=>{
            state.isAuthorsLoading = false;
            state.allAuthors = action.payload
        });
        builder.addCase(getAllAuthorsFunc.pending, (state, action)=>{
            state.isAuthorsLoading = true;
        });
        builder.addCase(getAllAuthorsFunc.rejected, (state, action)=>{
            state.isAuthorsLoading = false;
            console.log(state.error);
        })
    }
});

export const {setIsLoading, setCurrentPage} = authorSlice.actions;
export default authorSlice.reducer;
export {getAllAuthorsFunc}