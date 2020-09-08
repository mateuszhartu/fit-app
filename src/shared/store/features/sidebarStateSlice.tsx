import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isSidebarOpened: boolean;
}

interface SetSidebarPayload {
  isSidebarOpened: boolean;
}

export const initialState: SidebarState = {
  isSidebarOpened: false,
};

const sidebarStateSlice = createSlice({
  name: 'sidebarState',
  initialState,
  reducers: {
    setSidebarState: (state, action: PayloadAction<SetSidebarPayload>) => {
      state.isSidebarOpened = action.payload.isSidebarOpened;
    },
  },
});

export const { setSidebarState } = sidebarStateSlice.actions;

export default sidebarStateSlice.reducer;
