import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import customFetch from "../../utils/axios"
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage"

const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch("auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue("Unauthorize! Logging Out...")
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.user = null
      state.isSideBarOpen = false
      removeUserFromLocalStorage()
      if (action.payload) {
        toast.success(action.payload)
      }
    },
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user } = action?.payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Hello There ${user?.name}`)
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload)
    })
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { user } = action?.payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Welcome Back ${user?.name}`)
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload)
    })
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user } = action?.payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success("User Updated!")
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload)
    })
  },
})

export const { toggleSideBar, logoutUser } = userSlice.actions
export default userSlice.reducer
