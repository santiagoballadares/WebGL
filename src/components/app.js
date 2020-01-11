import React, {Component} from 'react';
import MainContainer from './mainContainer';

import style from './app.scss';

class App extends Component {
  render () {
    return (
      <div className={style.appRoot}>
        <div><h1>WebGL</h1></div>
        <MainContainer />
      </div>
    );
  }
}

export default App;
