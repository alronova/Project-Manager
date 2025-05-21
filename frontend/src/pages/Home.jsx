import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    // useEffect(() => {
    //     getProjects();
    // }, []);

    const getProjects = () => {
        api
            .get("/api/projects/")
            .then((res) => res.data)
            .then((data) => {
                setProjects(data);
                console.log(data);
            })
            .catch((err) => alert(err));
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

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
  return (
    <div>
      <div>
        My Projects
      </div>
      <div>
        Assigned Projects
      </div>
      <div>
        Create a <Link to="/new-project"
                    className="text-blue-500 hover:text-blue-600 transition">
                  New Project
                </Link>
      </div>
    </div>
  )
}

export default Home
