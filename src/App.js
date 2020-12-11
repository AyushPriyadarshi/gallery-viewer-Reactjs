import React from 'react';
import { Router, Route } from "react-router-dom";
import HomePage from './components/Homepage';
import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap'
import { createBrowserHistory as createHistory } from 'history';
import ImageSearchPage from './components/ImageSearchPage';
import './App.css';
import  styled  from 'styled-components';

const history = createHistory();

const H1 = styled.h1`
    font-family:'Pacifico',cursive;
`;

function App() {

  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="primary" expand="lg" variant="dark" >
          <Navbar.Brand href="/"><H1>Gallery</H1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Image Search" className="mr-sm-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={HomePage} />
      </Router>
    </div>
  );
}

export default App;
