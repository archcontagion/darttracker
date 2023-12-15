import React, {useRef, useContext} from 'react'
import axios from '../axios';
import { Form, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { AppContext } from '../AppContext';
import Cookies from 'js-cookie';


const LoginRegisterPage = (props) => {
  const {setActiveView} = useContext(AppContext)
  const {setUser} = useAuth();
  const [error, setError] = React.useState(null);
  const userName = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
      event.preventDefault();

      const body = {
        name: userName.current.value,
        password: password.current.value,       
      };

      

      

      try {
        const resp = await axios.post('/api/login', body);
        if (resp.status === 200) {
          setUser(resp.data.user);
          setActiveView('page-1');
        }
      } catch (error) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        }
      }

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