import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from './firebase';
import './Login.css';
import App from './App';
import Home from './Home';
import Colleges from './Colleges';
import ContactUs from './ContactUs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === 'help@smartcookie.in' && password === 'Smartcookie@2020') {
        setLoggedIn(true);
        console.log('Login successful');
      } else {
        console.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in with email and password', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      if (userEmail === 'help@smartcookie.in') {
        console.log('Google login successful', result.user);
        setLoggedIn(true);
      } else {
        console.error('Google login failed: Unauthorized email');
      }
    } catch (error) {
      console.error('Error logging in with Google', error.code, error.message);
    }
  };

  if (loggedIn) {
    return (
      <div>
        <Home />
        <App />
        <Colleges />
        <ContactUs />
      </div>
    );
  }

  return (
    <div className="login-container" id='login'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="google-login">
        <h2>Or</h2>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
};

export default Login;
