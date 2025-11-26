import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices/loginSlice";
import { dprSlice } from "./slices/dprSlice";
import { expenseSlice } from "./slices/expenseSlice";

export const store  = configureStore({
    reducer:{
         [loginSlice.reducerPath]: loginSlice.reducer,
         [dprSlice.reducerPath]: dprSlice.reducer,
         [expenseSlice.reducerPath]: expenseSlice.reducer,
    },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginSlice.middleware, dprSlice.middleware, expenseSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;