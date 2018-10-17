//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//JSON file and navigation
import { Nav } from './components/Nav';
import categories from './categories.json';
import SubNav from './components/subNav';
import FlexContainer from './components/flexContainer';
// import API from './utils/API';
//Routes
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPage from './pages/EditPage';
import Content from './pages/Content';
import NoMatch from './pages/NoMatch';
// import * as routes from './constants/routes';
import AccountPage from './pages/Account';
import MainCategoryPage from './pages/MainCategoryPage';
import Profile from './pages/Profile';

import authTest from './pages/AUTH-TEST';

// Auth Helper
import withAuthentication from './components/AuthUserSession/withAuthentication';
import ModalConductor from './components/Modals/ModalConductor'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: categories,
      currentModal: '',
    };
  };

  openModal = (event, modalName) => {
    event.preventDefault()
    this.setState({ currentModal: modalName })
  }

  closeModal = () => this.setState({ currentModal: '' })

  render() {
    return (
      <Router>
        <div>
          <Nav openModal={this.openModal} />
          <FlexContainer>
            {this.state.categories.map(category => (
              <SubNav
                id={category.id}
                key={category.id}
                href={category.href}
                name={category.name}
              />
            ))}
          </FlexContainer>
          <ModalConductor
            currentModal={this.state.currentModal}
            closeModal={this.closeModal}
          />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/categories/:categoryName' component={MainCategoryPage} />
            <Route exact path='/categories/:categoryName/posts/new' component={CreatePost} />
            <Route exact path='/posts/:id' component={Content} />
            <Route exact path='/posts/:id/edit' component={EditPage} />
            <Route exact path='/account' component={AccountPage} />
            <Route exact path='/users/:id' component={Profile} />
            <Route exact path='/(authtest|postman)' component={authTest} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default withAuthentication(App);
