import { createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, getTask, getTasks, updateTask } from './tasksThunks';

const initialState = {
    tasks: [],
    task: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = action.payload.data;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.task = action.payload.data;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks.push(action.payload.data);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = state.tasks.map((task) =>
                    task._id === action.payload.data._id ? action.payload.data : task
                );
                state.task = action.payload.data;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
                state.task = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = tasksSlice.actions;
export default tasksSlice.reducer;