import React, {Component} from 'react';
import User from '../models/user';


function authRequired(ComposedComponent){
  class Authentication extends Component{
    componentWillMount(){
      !User.current() ? this.props.history.push('/') : null;
    }

    render(){
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authentication;
}

export default authRequired;
