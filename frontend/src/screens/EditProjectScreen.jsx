import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProjectQuery, useUpdateProjectMutation } from "../slices/projectsApiSlice";
import { toast } from "react-toastify";

const EditProjectScreen = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    // Redux state
    const { userInfo } = useSelector((state) => state.auth);

    // Fetch project details
    const { data: project, isLoading, error } = useGetProjectQuery(projectId);
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Set initial values when project is loaded
    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description);
        }
    }, [project]);

    // Submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProject({
                id: projectId,
                name,
                description,
                updatedBy: userInfo._id, // Optional: Track who updated the project
            }).unwrap();
            toast.success("Project updated successfully!");
            navigate("/projects"); // Redirect after update
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update project");
        }
    };

    return (
        <div className="container">
            <h2>Edit Project</h2>
            {isLoading ? (
                <p>Loading project details...</p>
            ) : error ? (
                <p className="text-danger">{error?.data?.message || "Error loading project"}</p>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter project description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Project"}
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default EditProjectScreen;

