import React, {Component} from 'react';
import MainContainer from './mainContainer';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

import style from './app.scss';

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <div className={style.appRoot}>
          <div><h1>WebGL</h1></div>
          <MainContainer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
