import React from "react";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.users.join(", ")}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table className="table">
            <th>
                Username
            </th>
            <th>
                Name
            </th>
            <th>
                Repo
            </th>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList