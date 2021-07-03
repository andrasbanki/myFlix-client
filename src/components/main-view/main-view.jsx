import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view.jsx/profile-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { UpdateProfileView } from '../profile-view.jsx/updateProfile-view';

export class MainView extends React.Component {

  constructor() {
    super();
// Initial state is set to null
    this.state = {
      movies: [],
      genres: [],
      directors: [],
      selectedMovie: null,
      user: null,
      userData: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
      if (accessToken !==null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        this.getGenres(accessToken);
        this.getDirectors(accessToken);
        this.getUsers(accessToken);
      }
  }

  toggleCreationForm = () => {
    this.setState({
      showLoginForm: !this.state.showLoginForm
    })
  }

/*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
    this.getUsers(authDatam.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onUpdate(user){
    this.setState({
      user})
  }

  onRegisterIn(user){
    this.setState({
      user
    })
  }

  getMovies(token) {
    axios.get('https://andrasbanki-myflixapp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getGenres(token) {
    axios.get('https://andrasbanki-myflixapp.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      // Assign the result to the state
      this.setState({
        genres: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getDirectors(token) {
    axios.get('https://andrasbanki-myflixapp.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      // Assign the result to the state
      this.setState({
        directors: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

 getUsers(token) {
    axios.get('https://andrasbanki-myflixapp.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      // Assign the result to the state
      this.setState({
        userData: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onBackClick() {
    this.setState({
      setSelectedMovie: null
    });
  }

  render() {
    const { movies, user, userData, updateUser, genres, directors } = this.state;

    return (
      <Router>
        <Button onClick={() => this.onLoggedOut()}>Logout</Button>
        <Link to ={'/directors'}>
        <Button variant="link">Directors</Button>
      </Link>
      <Link to={'/genres'}>
        <Button variant="link">Genres</Button>
      </Link>
      <Link to={'/users'}>
        <Button variant="link">Users</Button>
      </Link>

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegisterIn={user=> this.onRegisterIn(user)}/> 
            </Col>
          }} />

          <Route exact path="/users" render={() => {
            console.log(userData)
            return userData.map(m => (
              <Col md={3} key={m._id}>
                <ProfileView userData={m} />
              </Col>
            ))
          }}/> 

          {/* <Route path="/movies/:Username" render={({ match, history }) => {
            if (!user) return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <ProfileView user={users.find(m => m.Username === match.params.Username)} onBackClick={() => history.goBack()} />
            </Col>
          }} /> */}

          <Route path="/users/:Username" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col>
                <UpdateProfileView onUpdate={user => this.onUpdate(user)}/>
              </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres" render={() => {
            console.log(genres)
            return genres.map(m => (
              <Col md={3} key={m._id}>
                <GenreView genres={m} />
              </Col>
            ))
          }}/>  

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genres={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors" render={() => {
            console.log(directors)
            return directors.map(m => (
              <Col md={3} key={m._id}>
                <DirectorView director={m} />
              </Col>
            ))
          }}/> 

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={directors.find(m => m.directors.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

export default MainView