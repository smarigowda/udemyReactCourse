import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <BrowserRouter baseneme="/my-app"> */}
        {/* <BrowserRouter baseneme="/"> */}
        <BrowserRouter>
          <Blog />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
