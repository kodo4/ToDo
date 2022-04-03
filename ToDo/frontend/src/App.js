import React from "react";
import './App.css';
import './Style.css';
import UsersList from "./components/Users";
import ProjectList from "./components/Project";
import LoginForm from "./components/Auth";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ToDoList from "./components/Todo";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie";


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
          'todos': [],
          'token': ''
    }
  }

  set_token(token) {
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token}, ()=> this.load_data())
  }

  is_authenticated() {
      return this.state.token !== ''
  }

  logout() {
      this.set_token('')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token': token}, ()=> this.load_data())
  }

  get_token(username, password) {
      axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
          .then(response => {
              this.set_token(response.data['token'])
          }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
      let headers = {
          'Content-Type': 'application/json'
      }
      if (this.is_authenticated())
      {
          headers['Authorization'] = 'Token ' + this.state.token
      }
      return headers
  }

  load_data() {
      const headers = this.get_headers()
      axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
        }).catch(error => {
          console.log(error)
          this.setState({'users': []})

      })
      axios.get('http://127.0.0.1:8000/api/project/', {headers})
        .then(response => {
            const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
        }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
      })
      axios.get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(response => {
            const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
        }).catch(error => {
            console.log(error)
            this.setState({'todos': []})
      })
  }

  componentDidMount() {
      this.get_token_from_storage()
  }

    render () {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <div className="Menu">
                    <Menu is_authenticated={this.is_authenticated()} logout={() => this.logout()}/>
                </div>
                <div className="content">
                    <div>
                      <Switch>
                          <Route exact path='/' component={() =><UsersList users={this.state.users}/> } />
                          <Route exact path='/project' component={() =><ProjectList projects={this.state.projects} />}/>
                          <Route exact path='/todo' component={() =><ToDoList todos={this.state.todos} />} />
                          <Route exact path='/login' component={() => <LoginForm
                                get_token={(username, password) => this.get_token(username, password)} />} />
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
