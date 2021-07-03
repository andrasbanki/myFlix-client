import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function UpdateProfileView(props) {

  const [username, setUsername] = useState ('user.username');
  const [password, setPassword] = useState ('');
  const [email, setEmail] = useState ('user.email');
  const [birthday, setBirthday] = useState ('user.birthday');

  const [usernameError, setUsernameError] = useState ({});
  const [passwordError, setPasswordError] = useState ({});
  const [emailError, setEmailError] = useState ({});

  const updateUser = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      axios.post('https://andrasbanki-myflixapp.herokuapp.com/users/:Username', {
        username: username,
        password: password,
        email: email,
        birthday: birthday
      })
      .then(response => {
        const data=response.data;
        console.log(data);
        window.open('/', '_self'); 
      })
      .catch(e => {
        console.log('error updating user')
      });
      console.log(username,password,email,birthday);
      props.onUpdate(username);
    };
  }
  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailError.invalidEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  }

  const deleteUser = e => {
    e.preventDefault();
    axios.delete('https://andrasbanki-myflixapp.herokuapp.com/users/${user}', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
      alert('Your account has been deleted');
      localStorage.clear();
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error deleting the user');
    });
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        < Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          {Object.keys(usernameError).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {usernameError[key]}
              </div>
            );
          })}
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          {Object.keys(passwordError).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {passwordError[key]}
              </div>
            );
          })}
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          {Object.keys(emailError).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {emailError[key]}
              </div>);
          })}
          <Form.Group controlId="date">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Button variant="outline-secondary" type="submit" onClick={updateUser}>Update Profile</Button>
          <Button variant="outline-secondary" type="submit" onClick={deleteUser}>Delete Profile</Button>
          <Link to ={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Form>
  )      
 }