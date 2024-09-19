import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    userList: [
      {
        id: 1,
        name: "John Doe",
        email: "hlll",
      },
    ],
  },
  reducers: {
    createUser(state, action) {
      state.userList.push(action.payload);
    },
    deleteUser(state, action) {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload?.id
      );
    },
    updateUser(state, action) {
      const { id, name, email } = action.payload;
      const user = state.userList.find((user) => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    },
  },
});

export const { createUser, deleteUser, updateUser } = userListSlice.actions;

export default userListSlice.reducer;
