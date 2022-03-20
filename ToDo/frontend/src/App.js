import React from "react";
import logo from './logo.svg';
import './App.css';
import './Style.css';
import UsersList from "./components/Users";
import ProjectList from "./components/Project";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ToDoList from "./components/Todo";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница не найдена</h1>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': []
    }
  }

  componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                        }
                    )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                    this.setState(
                        {
                            'todos': todos
                        }
                    )
            }).catch(error => console.log(error))

  }

  render () {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <div className="Menu">
                    <Menu/>
                </div>
                <div className="content">
                    <div>
                      <Switch>
                          <Route exact path='/' component={() =><UsersList users={this.state.users}/> } />
                          <Route exact path='/project' component={() =><ProjectList projects={this.state.projects} />}/>
                          <Route exact path='/todo' component={() =><ToDoList todos={this.state.todos} />} />
                          <Route component={NotFound404} />
                      </Switch>

                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </BrowserRouter>


        </div>

    )
  }
}

export default App;
