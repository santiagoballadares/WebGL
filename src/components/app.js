import React, {Component} from 'react';
import LessonBoard from './lessonBoard';

import style from '../styles/app.scss';

class App extends Component {
  render () {
    return (
      <div className={style.app}>
        <div><h1>WebGL</h1></div>
        <LessonBoard />
      </div>
    );
  }
}

export default App;
