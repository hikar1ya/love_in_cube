import React from 'react';
import './App.css';
import Content from './components/Content';
import AppBar from './components/AppBar';

class App extends React.Component {
  render() {
    return <>
      <AppBar />
      <Content />
    </>;
  }
}

export default App;
