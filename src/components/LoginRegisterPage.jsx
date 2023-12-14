import React, {useRef} from 'react'
import axios from '../axios';
import { Form, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'



const LoginRegisterPage = (props) => {

  const userName = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
      event.preventDefault();

      let token = () => {
        return new Promise(function(resolve, reject) {
          axios.get('/sanctum/csrf-cookie')
          .then(response => {
            resolve(response);
          });
        });
      };
      
      console.log(token.data);
      await axios.post('/api/login', {
        name: userName.current.value,
        password: password.current.value
      }).then(response =>{
        return response.data.message;
      }).catch(err =>{
        console.log(err);
      });



  }

  return (
    <div className="loginForm">
        <h2>Login</h2>
        <Form className="login" onSubmit={handleSubmit}>
            <FormGroup  className="formgroup username">
                <FormLabel>Benutzername</FormLabel>
                <FormControl ref={userName} name="name" type="text"></FormControl>
            </FormGroup>
            <FormGroup className="formgroup userpassword">
                <FormLabel>Passwort</FormLabel>
                <FormControl ref={password} name="password" placeholder="Passwort" type="password"></FormControl>
            </FormGroup>
            <Button type="submit">Einloggen</Button>
        </Form>
    </div>
  )
}

export default LoginRegisterPage