import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import customFetch from "../../utils/axios"

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if (search) {
      url = url + `&search=${search}`
    }
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error")
    }
  }
)

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/stats", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      console.log(resp.data)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload
      state.page = 1
      state[name] = value
    },
    clearFilter: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, action) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.isLoading = false
      state.jobs = action.payload.jobs
      state.numOfPages = action.payload.numOfPages
      state.totalJobs = action.payload.totalJobs
    })
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload)
    })
    builder.addCase(showStats.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(showStats.fulfilled, (state, action) => {
      state.isLoading = false
      state.stats = action.defaultStats
      state.monthlyApplications = action.payload.monthlyApplications
    })
    builder.addCase(showStats.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload)
    })
  },
})

export const {
  hideLoading,
  showLoading,
  clearFilter,
  handleChange,
  changePage,
} = allJobsSlice.actions
export default allJobsSlice.reducer
