import { useEffect } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "../slices/projectsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectsScreen = () => {
    const { data, error, isLoading, refetch } = useGetAllProjectsQuery();
    const [deleteProject] = useDeleteProjectMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const truncateText = (text, wordLimit = 10) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    const handleEdit = (id) => {
        navigate(`/projects/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteProject(id).unwrap();
                toast.success("Project deleted successfully!");
                refetch(); // Refresh project list
            } catch (err) {
                toast.error(err?.data?.message || "Error deleting project");
            }
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Projects</h2>
            <Button variant="primary" onClick={() => navigate("/projects/create")}>
                Create New Project
            </Button>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error?.data?.message || "Error loading projects"}</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.projects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.name}</td>
                                <td>{truncateText(project.description)}</td>
                                <td>{project.createdBy?.name || "Unknown"}</td>
                                <td>
                                    <Button variant="secondary" size="sm" onClick={() => handleEdit(project._id)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(project._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProjectsScreen;

