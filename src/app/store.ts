import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { Action } from "@reduxjs/toolkit";

import spellReducer, { sliceKey as spellKey } from "./features/room/roomSlice";
import service from "./services";

// import authReducer, { sliceKey as authKey } from "./features/auth/authSlice";

const appReducer = combineReducers({
  [spellKey]: spellReducer,
  [service.nepApi.reducerPath]: service.nepApi.reducer,
  [service.wishListApi.reducerPath]: service.wishListApi.reducer,
});

const rootReducer = (state: any, action: Action) => {
  // console.log(state);
  if (action.type === "auth/logout") {
    // check for action type
    Object.keys(state).forEach((key) => {
      storage.removeItem(`persist:${key}`);
    });
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(service.nepApi.middleware)
      .concat(service.wishListApi.middleware),
});

setupListeners(store.dispatch);
