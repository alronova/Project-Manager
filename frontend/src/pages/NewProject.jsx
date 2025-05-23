import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import api from "../api";

const NewProject = () => {

  useEffect(() => {
    const fetchUsers = async () => {
    const res = await api.get("/api/projects/assignees/");
    const users = res.data;
    console.log(res.data);

    const options = users.map((user) => ({
      value: user.username,
      label: `${user.username} (${user.fullName})`,
    }));

    setUserOptions(options);
    };

    fetchUsers();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github_link, setGithub_Link] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [deadline, setDeadline] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [assign_to, setAssign_To] = useState({});
  const [m1_title, setM1_Title] = useState("");
  const [m1, setM1] = useState("");
  const [m2_title, setM2_Title] = useState("");
  const [m2, setM2] = useState("");
  const [m3_title, setM3_Title] = useState("");
  const [m3, setM3] = useState("");
  const [m4_title, setM4_Title] = useState("");
  const [m4, setM4] = useState("");
  const [m5_title, setM5_Title] = useState("");
  const [m5, setM5] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assigned_to = assign_to.value;
    const user_data = await api.get("/api/user/");
    // console.log(user_data);
    const assigned_by = user_data.data[0].username;
    // console.log(assigned_by);
    api.post("/api/projects/", {
        title,
        description,
        github_link,
        deliverables,
        deadline,
        assigned_by,
        assigned_to,
        m1_title,
        m1,
        m2_title,
        m2,
        m3_title,
        m3,
        m4_title,
        m4,
        m5_title,
        m5,
      })
      .then((res) => {
        if (res.status === 201) {
          handleSuccess("Project Created!");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          handleError("Project Creation Failed!");
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white p-8 my-5 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Project Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Project Title
            </label>
            <input
              type="text"
              name="title"
              autoFocus
              value={title}
              placeholder="Give a name to your project..."
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Project Description
            </label>
            <input
              type="text"
              name="description"
              autoFocus
              value={description}
              placeholder="Describe your Project..."
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="github_link"
              className="block text-sm font-medium text-gray-700"
            >
              GitHub Link
            </label>
            <input
              type="url"
              name="github_link"
              value={github_link}
              placeholder="Enter your GitHub Link..."
              onChange={(e) => setGithub_Link(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="deliverables"
              className="block text-sm font-medium text-gray-700"
            >
              Project Deliverables
            </label>
            <input
              type="text"
              name="deliverables"
              value={deliverables}
              placeholder="Enter your Deliverables..."
              onChange={(e) => setDeliverables(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Project Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={deadline}
              placeholder="Enter the Project Deadline..."
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="assigned_to"
              className="block text-sm font-medium text-gray-700"
            >
              Assign this Project to:
            </label>
            <Select
              options={userOptions}
              value={assign_to}
              onChange={setAssign_To}
              placeholder="Choose whom to assign..."
            />
          </div>
          <div>
            <label
              htmlFor="m1_title"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 1 Title
            </label>
            <input
              type="text"
              name="m1_title"
              value={m1_title}
              placeholder="Enter Milestone 1 Title..."
              onChange={(e) => setM1_Title(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m1"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 1 Description
            </label>
            <input
              type="text"
              name="m1"
              value={m1}
              placeholder="Enter Milestone 1 Description..."
              onChange={(e) => setM1(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m2_title"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 2 Title
            </label>
            <input
              type="text"
              name="m2_title"
              value={m2_title}
              placeholder="Enter Milestone 2 Title..."
              onChange={(e) => setM2_Title(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m2"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 2 Description
            </label>
            <input
              type="text"
              name="m2"
              value={m2}
              placeholder="Enter Milestone 2 Description..."
              onChange={(e) => setM2(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m3_title"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 3 Title
            </label>
            <input
              type="text"
              name="m3_title"
              value={m3_title}
              placeholder="Enter Milestone 3 Title..."
              onChange={(e) => setM3_Title(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m3"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 3 Description
            </label>
            <input
              type="text"
              name="m3"
              value={m3}
              placeholder="Enter Milestone 3 Description..."
              onChange={(e) => setM3(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m4_title"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 4 Title
            </label>
            <input
              type="text"
              name="m4_title"
              value={m4_title}
              placeholder="Enter Milestone 4 Title..."
              onChange={(e) => setM4_Title(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m4"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 4 Description
            </label>
            <input
              type="text"
              name="m4"
              value={m4}
              placeholder="Enter Milestone 4 Description..."
              onChange={(e) => setM4(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m5_title"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 5 Title
            </label>
            <input
              type="text"
              name="m5_title"
              value={m5_title}
              placeholder="Enter Milestone 5 Title..."
              onChange={(e) => setM5_Title(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="m5"
              className="block text-sm font-medium text-gray-700"
            >
              Milestone 5 Description
            </label>
            <input
              type="text"
              name="m5"
              value={m5}
              placeholder="Enter Milestone 5 Description..."
              onChange={(e) => setM5(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            Create Project
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default NewProject;
