import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        selectedProject: null,
        loading: false,
        error: null,
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload.projects;
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setProjects, setSelectedProject, setLoading, setError } = projectsSlice.actions;
export default projectsSlice.reducer;

