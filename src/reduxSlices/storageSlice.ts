import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  id: string;
  name: string;
  url: string;
}

interface FileState {
  files: File[];
}

const initialState: FileState = {
  files: [],
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    deleteFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
  },
});

export const { setFiles, addFile, deleteFile } = fileSlice.actions;

export default fileSlice.reducer;
