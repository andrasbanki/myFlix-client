import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

// #0
import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

/* 
#1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

import './main-view.scss';

import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view.jsx/profile-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

// #2 export keyword removed from here

class MainView extends React.Component {

  constructor() {
    super();
// Initial state is set to null
    this.state = {
      genres: [],
      directors: [],
      selectedMovie: null,
      user: null,
     // FavoritMovies: []
    };
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.onLoggedOut = this.onLoggedOut.bind(this);
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
      }
  }

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
  }

  onLoggedOut() {
    localStorage.clear();
    window.open('/', '_self')
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
      // #4
      this.props.setMovies(response.data);
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

  render() {

    // #5 movies is extracted from this.props rather than from the this.state
    let { movies, user } = this.props;
    const { genres, directors } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
            <Container>
              <Navbar bg="dark" variant="dark" fixed="top">
                { user ? (
                  <>
                  <Link to={'/'}>
                    <Button variant="link">Home</Button>
                  </Link>
                  <Link to={`/users/${user.user.Username}`}>
                    <Button variant="link">Profile</Button>
                  </Link>
                  <Link to ={'/directors'}>
                    <Button variant="link">Directors</Button>
                  </Link>
                  <Link to={'/genres'}>
                    <Button variant="link">Genres</Button>
                  </Link>
                  <Button onClick={() => this.onLoggedOut()}>Logout</Button>
                 </>
                  ) : ''}
              </Navbar >
          </Container>

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            // #6
            return <MoviesList movies={movies}/>;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegisterIn={user=> this.onRegisterIn(user)}/> 
            </Col>
          }} />

          <Route path="/users/:username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <ProfileView signOutUser={this.onLoggedOut} user={match.params.username} movies={movies} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres" render={() => {
            return genres.map(m => ( <Col md={3} key={m._id}>
              <GenreView genres={m} />
            </Col>
            ))
          }}/>  

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genres={genres.find(m => m._id === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors" render={() => {
            return directors.map(m => ( <Col md={3} key={m._id}>
              <DirectorView director={m} />
            </Col>
            ))
          }}/> 

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={directors.find(m => m.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

// #7 
let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  }
}

// #8
export default connect(mapStateToProps, { setMovies, setUser } ) (MainView);