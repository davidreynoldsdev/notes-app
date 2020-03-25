import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotesPage } from './Notes/Components/NotesPage/NotesPage';
import { NewNotePage } from './Notes/Components/NewNotePage/NewNotePage';
import { EditNotePage } from './Notes/Components/EditNotePage/EditNotePage'
import { AppHeading } from './Common/Components/AppHeading'
import { Public } from './Common/Components/Public'
import { useAuth0 } from './contexts/auth0-context';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Container fluid={true} className="p-3">
      <Router>
        <AppHeading />
        <Switch>
          { isAuthenticated && 
            <>
              <Route path={"/"} exact={true} component={NotesPage} />
              <Route path={"/notes/new"} component={NewNotePage} />
              <Route path={"/notes/edit/:id"} component={EditNotePage} />
            </>
          } : <Route component={Public} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
