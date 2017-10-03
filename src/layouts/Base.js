import React from 'react';
import { Route, Link } from 'react-router-dom';

const ListItemLink = ({to, children}) => (
  <Route path={to} children={({match}) => (
    <li role="presentation" className={match ? 'active' : ''}>
      <Link to={to}>{children}</Link>
    </li>
  )} />
)

function NavBar(props){
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Batch Maker</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <ListItemLink to="/">Home</ListItemLink>
            <ListItemLink to="/recipe/">My Recipes</ListItemLink>

            {/*<li className="active"><a href="/">Home</a></li>
            <li><a href="/recipe/">My Recipes</a></li>*/}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="/auth/">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


function BaseLayout(props){
  return (
    <div className="container">
      <NavBar />
      {props.children}
    </div>
  )
}

export default BaseLayout;
