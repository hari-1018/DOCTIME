import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";


export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      const response = await axiosInstance.get("/dashboard/users");
      const nonAdminUsers = response.data.data.users.filter(user => user.role !== "admin");
      return nonAdminUsers;
    } catch (error) {
      toast.error("Failed to fetch users");
      return error.response.data;
    }
  }
);

export const blockUser = createAsyncThunk(
  "user/blockUser",
  async (userId) => {
    try {
      const response = await axiosInstance.patch(endpoints.ADMIN.BLOCK_USER(userId),  { isBlocked: true } );
      toast.success(`${response.data.data.user.username} is blocked`);
      return response.data.data.user;
    } catch (error) {
      console.error("Failed to block user:", error.response ? error.response.data : error); 
      toast.error("Failed to block user");
      return error.response.data;
    }
  }
);

export const unblockUser = createAsyncThunk(
  "user/unblockUser",
  async (userId) => {
    try {
      const response = await axiosInstance.patch(endpoints.ADMIN.UNBLOCK_USER(userId), { isBlocked: false });
      toast.success(`${response.data.data.user.username} is unblocked`);
      return response.data.data.user;
    } catch (error) {
      toast.error("Failed to unblock user");
      return error.response.data;
    }
  }
);

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: JSON.parse(localStorage.getItem('user'))|| null,
  users: [],
  role: localStorage.getItem('role') || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignIn: (state, action) => {
      const {user,token} = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.role = user.role;
      localStorage.setItem('token', token); 
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('patientId', user.id);
      localStorage.setItem('role', user.role); 
    },
    SignOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem('user'); 
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Block User
      .addCase(blockUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })

      // Unblock User
      .addCase(unblockUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      });
  },
});


export const { SignIn, SignOut } = userSlice.actions;
export default userSlice.reducer;