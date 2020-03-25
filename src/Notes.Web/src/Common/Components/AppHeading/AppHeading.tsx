import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth0 } from '../../../contexts/auth0-context';
import { Link } from "react-router-dom";
import './AppHeading.scss';

export const AppHeading: React.FC = () => {
    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              { isAuthenticated && 
                  <>
                    <Nav.Link as={Link} to="/">Notes</Nav.Link>
                  </>
              }
            </Nav>
            <Nav className="justify-content-between">
              { !isLoading && !user && (
                  <>
                    <Button variant="dark" onClick={loginWithRedirect}>Sign In</Button>
                  </>
              )}
              { !isLoading && user && (
                  <>
                      <div>
                          <label className="mr-2">{user.name}</label>
                          <Button variant="dark" onClick={() => logout({ returnTo: window.location.origin })}>Sign Out</Button>
                      </div>
                  </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
};

