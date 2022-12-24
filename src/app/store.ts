import { combineReducers, configureStore } from "@reduxjs/toolkit";

// With the Redux Persist library, developers can save the Redux store in persistent storage,
// for example, the local storage.
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

// redux toolkit query
import { setupListeners } from "@reduxjs/toolkit/query";
import type { Action } from "@reduxjs/toolkit";

import spellReducer, { sliceKey as spellKey } from "./features/room/roomSlice";
import service from "./services";

const appReducer = combineReducers({
  [spellKey]: spellReducer,
  [service.spellApi.reducerPath]: service.spellApi.reducer,
  [service.wishListApi.reducerPath]: service.wishListApi.reducer,
});

const rootReducer = (state: any, action: Action) => {
  // check for action type and clear data storage after logout
  // but spell list does not have login logout features
  // so, this feature is added for future purpose
  if (action.type === "auth/logout") {
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

// configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(service.spellApi.middleware)
      .concat(service.wishListApi.middleware),
});

setupListeners(store.dispatch);
