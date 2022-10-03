import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";

const store = configureStore({
  reducer: {
    pokemonReducer: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
