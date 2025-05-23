import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [myProjects, setMyProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMyProjects();
    getAssignedProjects();
  }, []);

  const getMyProjects = async () => {
    const res = await api.get("/api/projects/my-projects/");
    setMyProjects(res.data);
  };

  const getAssignedProjects = async () => {
    const res = await api.get("/api/projects/assigned-projects/");
    setAssignedProjects(res.data);
  };

  const deleteProject = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        {myProjects.length > 0 ? (
          myProjects.map((proj) => <ProjectCard key={proj.id} project={proj} />)
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}

        <h1 className="text-2xl font-bold mt-8 mb-4">Assigned Projects</h1>
        {assignedProjects.length > 0 ? (
          assignedProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))
        ) : (
          <p className="text-gray-500">No assigned projects found.</p>
        )}
      </div>
      <div className="mt-6 mb-5 flex items-center justify-center">
        <p className="text-gray-700 text-lg">
          Want to build something awesome?{" "}
          <Link
            to="/new-project"
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-200"
          >
            Create a New Project
          </Link>
          🧩
        </p>
      </div>
    </div>
  );
};

export default Home;
