import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../slices/projectsApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateProjectScreen = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth); // Get user info
    const [createProject, { isLoading, error }] = useCreateProjectMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createProject({
                name,
                description,
                createdBy: userInfo._id,
            }).unwrap();
            toast.success("Project created successfully!");
            navigate("/projects");
        } catch (err) {
            toast.error(err?.data?.message || "Error creating project");
        }
    };

    return (
        <div className="container">
            <h2>Create New Project</h2>
            {error && <p className="text-danger">{error.data?.message || "Error creating project"}</p>}
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Project"}
                </button>
            </form>
        </div>
    );
};

export default CreateProjectScreen;

