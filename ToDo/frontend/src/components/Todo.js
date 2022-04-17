import React from "react";
import {Link} from "react-router-dom";

const ToDoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project.name}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td>{todo.user.username}</td>
            <td>{todo.is_active ? <p>True</p>: <p>False</p>}</td>
            <td><button type='button' onClick={()=>deleteTodo(todo.id)}>Not active</button></td>
        </tr>
    )
}

const ToDoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table className="table">
                <th>ID</th>
                <th>PROJECT NAME</th>
                <th>TEXT</th>
                <th>CREATED</th>
                <th>UPDATED</th>
                <th>USER</th>
                <th>ACTIVE</th>
                <th></th>
                {todos.map((todo) => <ToDoItem todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default ToDoList