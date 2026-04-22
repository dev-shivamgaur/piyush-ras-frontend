import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice"
import uploadReducer from "./upload.slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        upload: uploadReducer,
    }
})

store.subscribe(() => {
    const state= store.getState();

    if (state?.auth?.userData) {
        localStorage.setItem("user", JSON.stringify(state?.auth?.userData))
    } else {
        localStorage.removeItem("user");
    }
})

export default store;