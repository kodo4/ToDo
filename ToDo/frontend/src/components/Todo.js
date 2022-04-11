import React from "react";

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project.name}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td>{todo.user.username}</td>
            <td>{todo.is_active}</td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table className="table">
            <th>ID</th>
            <th>PROJECT NAME</th>
            <th>TEXT</th>
            <th>CREATED</th>
            <th>UPDATED</th>
            <th>USER</th>
            <th>ACTIVE</th>
            {todos.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}

export default ToDoList