import { configureStore } from '@reduxjs/toolkit'
import AppReducer from '../reducer/app';

import UserReducer from "../reducer/user";


export default configureStore({
    reducer: {
        app: AppReducer,
        user: UserReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})