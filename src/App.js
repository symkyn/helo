import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router';

import Nav from './component/Nav/Nav';
import routes from './route';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
        {(this.props.location.pathname !== '/') ? (<Nav />) : null}
        { routes }
      </div>
    );
  }
}

export default withRouter(App);
