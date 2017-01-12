import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactComponent from './ReactComponent';

class Main extends React.Component {
  render() {
    return (
      
        <MuiThemeProvider>
    <ReactComponent />
  </MuiThemeProvider>
     
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);