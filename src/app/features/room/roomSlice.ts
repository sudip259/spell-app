import { createSlice } from "@reduxjs/toolkit";
import { SPELL } from "constants/index";

// initial state
const initialState = {
  spell: {
    stage: SPELL,
    data: {},
  },
};
//sliceKey which is needed to be configured into redux store
export const sliceKey = "room";

// spell slice
export const spellSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    // spellStage reducer
    spellStage: (state, { payload }) => {
      try {
        state.spell.stage = payload.stage;
        state.spell.data = payload.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export const { spellStage } = spellSlice.actions;

export default spellSlice.reducer;
