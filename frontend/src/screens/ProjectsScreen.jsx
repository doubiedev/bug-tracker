import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProjectsQuery } from '../slices/projectsApiSlice';

const ProjectsScreen = () => {
    const dispatch = useDispatch();

    const { projects, loading, error } = useSelector((state) => state.projects);

    const {refetch} = useFetchProjectsQuery();

    useEffect(() => {
        refetch(); // Refetch projects when component loads
    }, [dispatch, refetch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Projects</h3>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsScreen;
