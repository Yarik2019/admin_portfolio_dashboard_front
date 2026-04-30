import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./home/slice";
import { aboutReducer } from "./about/slice";
import { socialReducer } from "./social/slice";
import { experienceReducer } from "./experience/slice";
import { portfolioReducer } from "./portfolio/slice";
import { userReducer } from "./user/slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
    about: aboutReducer,
    social: socialReducer,
    experience: experienceReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
