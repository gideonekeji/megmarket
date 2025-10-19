import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  document: File | null;
  image: File | null;
}

const initialState: FileState = {
  document: null,
  image: null,
};

const MessageSliceFileAndDoc = createSlice({
  name: "MessageSliceFileAndDoc",
  initialState,
  reducers: {
    setDocument(state, action: PayloadAction<File | null>) {
      // If an image is already set, clear it before setting the document
      if (state.image !== null) {
        state.image = null;
      }
      state.document = action.payload;
    },
    setImage(state, action: PayloadAction<File | null>) {
      // If a document is already set, clear it before setting the image
      if (state.document !== null) {
        state.document = null;
      }
      state.image = action.payload;
    },
  },
});

export const { setDocument, setImage } = MessageSliceFileAndDoc.actions;

export default MessageSliceFileAndDoc.reducer;
