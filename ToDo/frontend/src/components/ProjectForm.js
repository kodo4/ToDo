import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', repo: '', users: props.users[0]?.id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo, this.state.users)
        // console.log([+(this.state.users)])
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                        onChange={(event)=> this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="repo">Repo</label>
                    <input type="text" className="form-control" name="repo" value={this.state.repo}
                        onChange={(event)=> this.handleChange(event)}/>
                </div>

                <div>
                    <label for="users">Users</label>
                    <select name="users" className='form-control'
                            onChange={(event)=> this.handleChange(event)}>
                        {this.props.users.map((item)=> <option value={item.id}>{item.first_name}</option>)}
                    </select>
                </div>

                {/*<div className="form-group">*/}
                {/*    <label for="users">Users</label>*/}
                {/*    <input type="text" className="form-control" name="users" value={this.state.users}*/}
                {/*        onChange={(event)=> this.handleChange(event)}/>*/}
                {/*</div>*/}

                <input type="submit" className="btn btn-primary" value="Save" />

            </form>
        );
    }
}

export default ProjectForm