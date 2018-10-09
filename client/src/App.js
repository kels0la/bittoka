//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//JSON file and navigation
import Nav from './components/Nav';
import categories from './categories.json';
import SubNav from './components/subNav';
import FlexContainer from './components/flexContainer';
import draftTest from './components/draftTest';
//Routes
import Home from './pages/Home';
import Listoka from './pages/Listoka';
import CreatePost from './pages/CreatePost';
import Content from './pages/Content';
import BitcoinStories from './pages/BitcoinStories';
import Stories from './pages/Stories';
import Gist from './pages/Gist';
import Join from './pages/Join';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import * as routes from './constants/routes';
import AccountPage from './pages/Account';

import authTest from './pages/AUTH-TEST'

// Auth Helper
import withAuthentication from './components/AuthUserSession/withAuthentication'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {categories: categories};
  }
  
  render(){
    console.log('state: ', this.state)
    return(
      <Router>
        <div>
          <Nav />
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
          <Switch>
            <Route exact path={routes.LANDING} component={Home} />
            <Route exact path={routes.HOME} component={Home} />
            <Route exact path={routes.LISTOKA} component={Listoka} />
            <Route exact path={routes.STORIES} component={Stories} />
            <Route exact path={routes.BITCOIN_STORY} component={BitcoinStories} />
            <Route exact path={routes.LOGIN} component={Login} />
            <Route exact path={routes.JOIN} component={Join} />
            <Route exact path={routes.GIST} component={Gist} />
            <Route exact path={routes.CREATEPOST} component={CreatePost} />
            <Route exact path={routes.CONTENT} component={Content} />
            {/* Need user account page to test auth */}
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path='/drafttest' component={draftTest} />
            <Route exact path='/authtest' component={authTest} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default withAuthentication(App);
