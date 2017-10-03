import React, { Component } from 'react';

import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

import authRequired from '../components/Authentication';
import AuthContainer from './Auth';
import RecipeListContainer from './RecipeList';
import RecipeFormContainer from './RecipeForm';


class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <Route path='/' exact component={AuthContainer} />
            <Route path='/recipe/' exact component={authRequired(RecipeListContainer)} />
            <Route path='/recipe/add/' exact component={authRequired(RecipeFormContainer)} />
            <Route path='/recipe/:id/edit' exact component={authRequired(RecipeFormContainer)} />
          </div>
      </Router>
    );
  }
}


export default App;
