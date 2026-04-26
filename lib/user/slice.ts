import {createSlice, isAnyOf} from "@reduxjs/toolkit";

import { signIn, signUp, logOut, getUserData } from "./operation";


const initialState = {
    isLoggedIn: false,
    users: [],
    user: {
        email: '',
        name: '',
    },
    token: null,
    isRefreshing: false,
    isAuthInitialized: false,
    error: false,
    loading: false,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserData.fulfilled, (state, action) =>{
            state.isLoggedIn = true;
            state.user = action.payload;
            state.isRefreshing = false;
            state.isAuthInitialized = true; 
        }).addCase(getUserData.rejected, (state)=> {
            state.isLoggedIn = false;
            state.user = null;
            state.isAuthInitialized = true;
        }).addCase(signIn.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        }).addCase(signUp.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        }).addCase(logOut.fulfilled, () => initialState)
        .addMatcher(isAnyOf(getUserData.pending, signIn.pending, signUp.pending, logOut.pending), (state) => {
            state.isRefreshing = true;
            state.loading = true;
            state.error = false;
        }).addMatcher(isAnyOf(getUserData.fulfilled, signIn.fulfilled, signUp.fulfilled, logOut.fulfilled), (state) => {
            state.isRefreshing = false;
            state.loading = false; 
            state.error = false;
        }).addMatcher(isAnyOf(getUserData.rejected, signIn.rejected, signUp.rejected, logOut.rejected), (state) => {
            state.isRefreshing = false;
            state.loading = false;
            state.error = true;
        });
    }
})

export const userReducer = userSlice.reducer;