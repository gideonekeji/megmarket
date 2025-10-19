import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Translation {
  setting_id: number;
  key: string;
  Translation: string;
}

interface LanguageState {
  language: string;
  language_alignment: string;
  translations: Translation[];
}

const initialState: LanguageState = {
  language: "Hindi",
  language_alignment: "ltr",
  translations: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageState>) {
      return action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
