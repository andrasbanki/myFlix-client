import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row, Col }from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      userUpdate: false,
    };
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    let token = localStorage.getItem('token');
    axios.get(`https://andrasbanki-myflixapp.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const FavoritMovies = this.props.movies.filter(item => {
          return response.data.FavoritMovies.includes(item._id);
        })
        this.setState({
          user: response.data,
          FavoritMovies: FavoritMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  handleUpdate = (e) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    e.preventDefault();
    axios.put(`https://andrasbanki-myflixapp.herokuapp.com/users/${user}`, {  
      Username: this.state.user.Username,
      Password: this.state.user.Password,
      Email: this.state.user.Email,
      Birthday: this.state.user.Birthday
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response.data);
      this.setState({ 
        userUpdate: false,      
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  userDelete = (e) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    e.preventDefault();
    axios.delete(`https://andrasbanki-myflixapp.herokuapp.com/users/${this.state.user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response.data);
      alert(this.state.user.Username + ' has been deleted!');
      this.props.signOutUser();
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {

    const { user, userUpdate, FavoritMovies } = this.state;

    if (!userUpdate) {
    return (
      <>
      { user && <div>
      <div>
        <div>
          <h4>Username: </h4>
          <span>{user.Username}</span>

          <h4>Email: </h4>
          <span>{user.Email}</span>

          <h4>Birthday: </h4>
          <span>{user.Birthday}</span>

        </div>
        <Button variant="outline-secondary" onClick={() => this.setState({ userUpdate : true })}>Update and delete my profile</Button>
        <Link to={'/'}>
          <Button variant="outline-secondary">Return to homepage</Button>
        </Link>
      </div> 
      <Row>
        {FavoritMovies.map(m => (<Col md={4} key={m._id}>
          <MovieCard movie={m} showRemoveBtn={true} showAddBtn={false}/>
        </Col>))}
      </Row>
      </div>
      }
      </> 
    )
    }
    else {
      return (
        <Form>
          <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={user.Username} onChange={e => this.setState({ user: {
            ...this.state.user,
            Username: e.target.value
          }})} />
          </Form.Group>

          <Form.Group controlId="formPassword">
          <Form.Label>password:</Form.Label>
            <Form.Control type="text" onChange={e => this.setState({ user: {
            ...this.state.user,
            Password: e.target.value
          }})} />
          </Form.Group>
          
          <Form.Group controlId="formEmail">
          
           <Form.Label>email:</Form.Label> 
            <Form.Control type="text" value={user.Email} onChange={e => this.setState({ user: {
            ...this.state.user,
            Email: e.target.value
          }})} />
         
          </Form.Group>
          <Form.Group controlId="formBirthDate">
         
           <Form.Label>birthdate:</Form.Label> 
            <Form.Control type="text" value={user.Birthday} onChange={e => this.setState({ user: {
            ...this.state.user,
            Birthday: e.target.value
          }})} />
          
          </Form.Group>
            <Button variant="outline-secondary" type="submit" onClick={this.handleUpdate}>Update my profile</Button>
            <Button variant="outline-secondary" type="submit" onClick={this.userDelete}>Delete User Profile</Button>
        </Form>
      );
    }
  }
}