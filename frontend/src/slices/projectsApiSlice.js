import { apiSlice } from "./apiSlice";
import { setProjects, setSelectedProject, setLoading, setError } from "./projectsSlice";

const PROJECTS_URL = '/api/projects';

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProjects: builder.query({
            query: () => `${PROJECTS_URL}`,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true)); // Start loading
                    const { data } = await queryFulfilled;
                    dispatch(setProjects(data)); // Store projects in Redux
                    dispatch(setLoading(false));
                } catch (err) {
                    dispatch(setError(err?.error || 'Failed to fetch projects'));
                    dispatch(setLoading(false));
                }
            },
            providesTags: ['Project'],
        }),
        fetchProjectById: builder.query({
            query: (id) => `${PROJECTS_URL}/${id}`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setSelectedProject(data));
                    dispatch(setLoading(false));
                } catch (err) {
                    dispatch(setError(err?.error || 'Failed to fetch project'));
                    dispatch(setLoading(false));
                }
            },
            providesTags: (result, error, id) => [{ type: 'Project', id }],
        }),
    }),
})

export const { useFetchProjectsQuery, useFetchProjectByIdQuery } = projectsApiSlice;
