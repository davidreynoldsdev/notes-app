import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth0 } from "./utils/hooks";
import Login from "./Common/Components/Login/Login"

import { NotesPage } from './Notes/Components/NotesPage/NotesPage';
import { NewNotePage } from './Notes/Components/NewNotePage/NewNotePage';

function App() {

  const { isAuthenticated, loading } = useAuth0();
  
  if (loading === undefined && isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid={true} className="p-3">
      <Router>
        <div>{isAuthenticated ? 
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Notes</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Notes</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
            <Switch>
              <Route exact path="/">
                <NotesPage />
              </Route>
              <Route path="/notes/new">
                <NewNotePage />
              </Route>
            </Switch>
          </div>
        : <Login />}</div>
      </Router>
    </Container>
  );
}

export default App;
