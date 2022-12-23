import { createSlice } from "@reduxjs/toolkit";
import { SPELL } from "constants/index";
const initialState = {
  spell: {
    stage: SPELL,
    data: {},
  },
};
export const sliceKey = "room";

export const spellSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
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
