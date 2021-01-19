import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:4000/repos'

const reposAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at)
})

const initialState = reposAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentRepo: {}
})

export const fetchRepos = createAsyncThunk('repos/fetchRepos', async () => {
  const response = await axios.get(url)
  return response.data
})

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRepos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchRepos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      reposAdapter.upsertMany(state, action.payload)
    },
    [fetchRepos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default reposSlice.reducer

export const {
  selectAll: selectAllRepos,
  selectById: selectRepoById,
  selectIds: selectRepoIds
} = reposAdapter.getSelectors(state => state.repos)

export const selectCurrentRepo = createSelector([
  selectAllRepos,
  state => {
    return state
  }
])
