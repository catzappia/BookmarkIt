
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import '../../styles/login.css';
import { Link } from 'react-router-dom';


import Auth from '../../utils/auth';
import type { UserLogin } from '../../models/UserLogin';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState<UserLogin>({ username: '', email: '', password: '', savedBooks: [],  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const {data} = await login({
        variables: {...userFormData, }, 
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true); // setShowAlert will 
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
        savedBooks: [],
        // savedGroups: []
    });
  };

  return (
    <>
    <div className="login-main">
      <div className="login-container">
        <h2>Welcome Back!</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>


        <Form.Group className='login-form'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='booklover13@gmail.com'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='iheartbooks9'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button className="signin-btn"
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      <p className="new-user">New User? <Link to="/SignUp">Create an Account</Link></p>
    </Form>
    </div>
    </div>
    </>
  );
};

export default LoginForm;
