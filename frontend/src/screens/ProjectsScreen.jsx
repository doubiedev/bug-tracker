import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProjectsQuery } from '../slices/projectsApiSlice';
import { useNavigate } from "react-router-dom";

const ProjectsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { projects, loading, error } = useSelector((state) => state.projects);

    const { refetch } = useFetchProjectsQuery();

    useEffect(() => {
        refetch(); // Refetch projects when component loads
    }, [dispatch, refetch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Projects</h3>
                <button className="btn btn-primary" onClick={() => navigate("/projects/create")}>
                    + Create New Project
                </button>
            </div>
                <ul>
                    {projects.map((project) => (
                        <li key={project._id}>{project.name}</li>
                    ))}
                </ul>
        </div>
    );
};

export default ProjectsScreen;
