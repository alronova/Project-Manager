import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-4 my-4">
        <h2 className="text-xl font-bold text-indigo-600">{project.title}</h2>
        <p className="text-gray-700 mt-2">{project.description}</p>

        <div className="mt-4">
          <p>
            <strong>Deliverables:</strong> {project.deliverables}
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href={project.github_link}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repo Link
            </a>
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-lg">Milestones</h3>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <p className="font-medium">{project[`m${i}_title`]}</p>
              <p className="text-sm text-gray-600">{project[`m${i}`]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
