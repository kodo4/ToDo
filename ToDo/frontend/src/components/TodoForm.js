import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: props.project[0]?.id, text: '', user: props.user[0]?.id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.text, this.state.user)
        event.preventDefault()
    }

    render () {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="project_name">Project_name</label>
                    <select name="project" className="form-control"
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="text">Text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event)=> this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="users">Users</label>
                    <select name="user" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.user.map((item) => <option value={item.id}>{item.first_name}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        )
    }
}

export default TodoForm