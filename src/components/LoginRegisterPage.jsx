import React, {useRef} from 'react'
import { Form, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'



const LoginRegisterPage = (props) => {

  const userName = useRef(null);
  const password = useRef(null);

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log({
        userName: userName.current.value,
        password: password.current.value
      });

  }

  return (
    <div className="loginForm">
        <h2>Login</h2>
        <Form className="login" onSubmit={handleSubmit}>
            <FormGroup  className="formgroup username">
                <FormLabel>Benutzername</FormLabel>
                <FormControl ref={userName} name="userName" type="text"></FormControl>
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