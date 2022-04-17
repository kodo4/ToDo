import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
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
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}



const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
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
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to="/project/create">Create</Link>
        </div>

    )
}

export default ProjectList