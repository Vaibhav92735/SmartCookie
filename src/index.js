import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './styles.css'; // Import the global styles

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <div className="container">
        <header className="header">
          <nav>
            <a href="#login">Login</a>
            <a href="#home">Home</a>
            <a href="#app">Map</a>
            <a href="#colleges">Colleges</a>
          </nav>
        </header>
        <main className="main-content">
          <Login />
        </main>
      </div>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
